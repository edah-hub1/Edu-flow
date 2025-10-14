import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
  message: string;
  user: {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const EMAIL_KEY = 'auth_email';
const ROLE_KEY = 'auth_role';
const UUID_KEY = 'auth_uuid';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  /** Login */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, payload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(tap((res) => this.handleAuthResponse(res)));
  }

  /** Register */
  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  /** Logout */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(UUID_KEY);
    }
  }

  /** Check login */
  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem(ACCESS_KEY);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(ACCESS_KEY)
      : null;
  }

  getRefreshToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(REFRESH_KEY)
      : null;
  }

  getRole(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(ROLE_KEY)
      : null;
  }

  getEmail(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(EMAIL_KEY)
      : null;
  }

  getUuid(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(UUID_KEY)
      : null;
  }

  /** Save tokens + user info */
  private handleAuthResponse(res: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(ACCESS_KEY, res.accessToken);
      localStorage.setItem(REFRESH_KEY, res.refreshToken);
      localStorage.setItem(EMAIL_KEY, res.user.email);
      localStorage.setItem(ROLE_KEY, res.user.role);
      localStorage.setItem(UUID_KEY, res.user.uuid);
    }
  }
}
