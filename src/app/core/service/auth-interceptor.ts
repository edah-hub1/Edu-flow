import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable, of, from } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { environment } from '../../../environments/environment';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function notifyTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);

  // Skip login/register
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          authService.logout();
          router.navigate(['/auth/login']);
          return throwError(() => error);
        }

        if (isRefreshing) {
          // queue retry until refresh finishes
          return new Observable<HttpEvent<unknown>>(observer => {
            subscribeTokenRefresh((newToken: string) => {
              observer.next(
                req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` }
                }) as unknown as HttpEvent<unknown>
              );
              observer.complete();
            });
          });
        }

        isRefreshing = true;

        return http.post<any>(`${environment.apiUrl}/auth/refresh`, { refreshToken }).pipe(
          switchMap((res) => {
            isRefreshing = false;

            // Save new tokens
            localStorage.setItem('access_token', res.accessToken);
            localStorage.setItem('refresh_token', res.refreshToken);

            notifyTokenRefreshed(res.accessToken);

            // Retry original request with new token
            return next(
              req.clone({
                setHeaders: { Authorization: `Bearer ${res.accessToken}` }
              })
            );
          }),
          catchError(err => {
            isRefreshing = false;
            authService.logout();
            router.navigate(['/auth/login']);
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
