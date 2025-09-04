import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  //  Login
  login(payload: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }).pipe(
    tap((res) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', res.token);
      }
    })
  );
}


  //  Register
  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  //  Logout
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  //  Check login
  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
  }

  //  Get stored JWT
  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }
}
