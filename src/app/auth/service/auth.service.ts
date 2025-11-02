import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

/** -----------------------------
 * Interfaces
 * ----------------------------- */
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
    id?: number; // optional numeric ID
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

/** -----------------------------
 * LocalStorage keys
 * ----------------------------- */
const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const EMAIL_KEY = 'auth_email';
const ROLE_KEY = 'auth_role';
const UUID_KEY = 'user_uuid';
const ID_KEY = 'user_id';
const NAME_KEY = 'auth_name';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  // ──────────────────────────────────────────────
  // 🔐 AUTH ACTIONS
  // ──────────────────────────────────────────────

  /** Login */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, payload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => {
          this.handleAuthResponse(res);
          // ✅ Save numeric ID if backend provides it
          if (res.user?.id) {
            localStorage.setItem(ID_KEY, res.user.id.toString());
          }
        })
      );
  }

  /** Register */
  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  /** Logout */
  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    [
      ACCESS_KEY,
      REFRESH_KEY,
      EMAIL_KEY,
      ROLE_KEY,
      UUID_KEY,
      ID_KEY,
      NAME_KEY,
    ].forEach((key) => localStorage.removeItem(key));
  }

  // ──────────────────────────────────────────────
  // 🧭 STATE HELPERS
  // ──────────────────────────────────────────────

  /** Check login */
  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId)
      ? !!localStorage.getItem(ACCESS_KEY)
      : false;
  }

  /** Access token */
  getToken(): string | null {
    return this.getLocal(ACCESS_KEY);
  }

  /** Refresh token */
  getRefreshToken(): string | null {
    return this.getLocal(REFRESH_KEY);
  }

  /** User role */
  getRole(): string | null {
    return this.getLocal(ROLE_KEY);
  }

  /** User email */
  getEmail(): string | null {
    return this.getLocal(EMAIL_KEY);
  }

  /** ✅ Numeric user ID (preferred) */
  getUserId(): number | null {
    const id = this.getLocal(ID_KEY);
    return id ? Number(id) : null;
  }

  /** ✅ Fallback to UUID */
  getUuid(): string | null {
    return this.getLocal(UUID_KEY);
  }

  /** Utility: safely read localStorage */
  private getLocal(key: string): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(key)
      : null;
  }

  // ──────────────────────────────────────────────
  // 💾 TOKEN + USER SAVE HELPERS
  // ──────────────────────────────────────────────

  /** Handle login response */
  private handleAuthResponse(res: LoginResponse): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(ACCESS_KEY, res.accessToken);
    localStorage.setItem(REFRESH_KEY, res.refreshToken);
    localStorage.setItem(EMAIL_KEY, res.user.email);
    localStorage.setItem(ROLE_KEY, res.user.role);
    localStorage.setItem(UUID_KEY, res.user.uuid);
    localStorage.setItem(
      NAME_KEY,
      `${res.user.firstName} ${res.user.lastName}`
    );
  }

  /** ✅ Save user data (for registration or profile endpoints) */
  saveUserData(user: any): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (user.id) localStorage.setItem(ID_KEY, user.id.toString());
    if (user.uuid) localStorage.setItem(UUID_KEY, user.uuid);
    if (user.email) localStorage.setItem(EMAIL_KEY, user.email);
    if (user.role) localStorage.setItem(ROLE_KEY, user.role);
    if (user.firstName && user.lastName)
      localStorage.setItem(NAME_KEY, `${user.firstName} ${user.lastName}`);
  }
}
