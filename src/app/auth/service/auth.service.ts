// import { Injectable, inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { isPlatformBrowser } from '@angular/common';
// import { jwtDecode } from 'jwt-decode';

// interface LoginRequest {
//   email: string;
//   password: string;
// }

// interface LoginResponse {
//   token: string;
//   message: string;
// }

// interface DecodedToken {
//   sub: string;  // email from JWT
//   iat: number;
//   exp: number;
// }

// const TOKEN_KEY = 'auth_token';
// const EMAIL_KEY = 'auth_email';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = `${environment.apiUrl}`;
//   private platformId = inject(PLATFORM_ID);

//   constructor(private http: HttpClient) {}

//   // Login
//   login(payload: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload, {
//       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//     }).pipe(
//       tap((res) => this.handleAuthResponse(res))
//     );
//   }

//   // Register → also auto-login
//   // register(payload: any): Observable<LoginResponse> {
//   //   return this.http.post<LoginResponse>(`${this.apiUrl}/users`, payload, {
//   //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   //   }).pipe(
//   //     tap((res) => this.handleAuthResponse(res))
//   //   );
//   // }
//     //  Register
//   register(payload: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/users`, payload, {
//       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//     });
//   }

  

//   // Logout
//   logout(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.removeItem(TOKEN_KEY);
//       localStorage.removeItem(EMAIL_KEY);
//     }
//   }

//   // Check if logged in (token must not be expired)
//   isLoggedIn(): boolean {
//     if (!isPlatformBrowser(this.platformId)) return false;

//     const token = localStorage.getItem(TOKEN_KEY);
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode<DecodedToken>(token);
//       const now = Math.floor(Date.now() / 1000);
//       return decoded.exp > now; // still valid
//     } catch {
//       return false;
//     }
//   }

//   // Get stored JWT
//   getToken(): string | null {
//     return isPlatformBrowser(this.platformId)
//       ? localStorage.getItem(TOKEN_KEY)
//       : null;
//   }

//   // Get logged-in email
//   getEmail(): string | null {
//     return isPlatformBrowser(this.platformId)
//       ? localStorage.getItem(EMAIL_KEY)
//       : null;
//   }

//   // Shared logic for login/register
//   private handleAuthResponse(res: LoginResponse): void {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem(TOKEN_KEY, res.token);

//       const decoded = jwtDecode<DecodedToken>(res.token);
//       localStorage.setItem(EMAIL_KEY, decoded.sub);
//     }
//   }
// }

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { UserService, User } from '../service/user.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
}

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

const TOKEN_KEY = 'auth_token';
const EMAIL_KEY = 'auth_email';
const ROLE_KEY = 'auth_role';
const USERID_KEY = 'auth_id';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient, private userService: UserService) {}
  login(payload: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }).pipe(
    tap((res) => this.handleAuthResponse(res)) //  store token + email
  );
}


  // login(payload: LoginRequest): Observable<User> {
  //   return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   }).pipe(
  //     switchMap((res) => {
  //       this.handleAuthResponse(res);

  //       // decode email
  //       const decoded = jwtDecode<DecodedToken>(res.token);
  //       const email = decoded.sub;

  //       // fetch full user profile
  //       return this.userService.getUserByEmail(email);
  //     }),
  //     tap((user) => {
  //       if (isPlatformBrowser(this.platformId) && user) {
  //         localStorage.setItem(ROLE_KEY, user.userRole);
  //         localStorage.setItem(USERID_KEY, user.id.toString());
  //       }
  //     })
  //   );
  // }

   //  Register
  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  

  // Logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EMAIL_KEY);
    }
  }

  // Check if logged in (token must not be expired)
  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now; // still valid
    } catch {
      return false;
    }
  }

  // Get stored JWT
  getToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(TOKEN_KEY)
      : null;
  }

  // Get logged-in email
  getEmail(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(EMAIL_KEY)
      : null;
  }

  // Shared logic for login/register
  // private handleAuthResponse(res: LoginResponse): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem(TOKEN_KEY, res.token);

  //     const decoded = jwtDecode<DecodedToken>(res.token);
  //     localStorage.setItem(EMAIL_KEY, decoded.sub);
  //   }
  // }


  getRole(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(ROLE_KEY)
      : null;
  }

  private handleAuthResponse(res: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_KEY, res.token);
      const decoded = jwtDecode<DecodedToken>(res.token);
      localStorage.setItem(EMAIL_KEY, decoded.sub);
    }
  }
}
