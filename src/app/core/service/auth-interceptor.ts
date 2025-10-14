import { inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable, from } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

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
  const platformId = inject(PLATFORM_ID);

  // Skip login/register endpoints
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  // ✅ Only access localStorage on browser
  if (isPlatformBrowser(platformId)) {
    accessToken = localStorage.getItem('access_token');
    refreshToken = localStorage.getItem('refresh_token');
  }

  // Attach access token if available
  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (!refreshToken) {
          // No refresh token → force logout
          authService.logout();
          router.navigate(['/auth/login']);
          return throwError(() => error);
        }

        if (isRefreshing) {
          // Queue until refresh completes
          return new Observable<HttpEvent<unknown>>(observer => {
            subscribeTokenRefresh((newToken: string) => {
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              // ✅ Actually retry the HTTP request
              next(newReq).subscribe({
                next: (event) => observer.next(event),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
              });
            });
          });
        }

        // Start refresh
        isRefreshing = true;

        return http
          .post<any>(`${environment.apiUrl}/auth/refresh`, { refreshToken })
          .pipe(
            switchMap((res) => {
              isRefreshing = false;

              if (isPlatformBrowser(platformId)) {
                // Save new tokens
                localStorage.setItem('access_token', res.accessToken);
                localStorage.setItem('refresh_token', res.refreshToken);
              }

              notifyTokenRefreshed(res.accessToken);

              // Retry original request with new token
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.accessToken}` }
              });
              return next(newReq);
            }),
            catchError((err) => {
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
