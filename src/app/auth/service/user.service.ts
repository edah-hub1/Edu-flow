import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id?: number;            // backend may still return numeric id
  uuid: string;           // unique identifier (string UUID)
  firstName: string;
  lastName: string;
  uniqueId?: string;
  email: string;
  phone?: string | null;
  dob?: string | null;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

//  match AuthService
const USER_UUID_KEY = 'auth_uuid';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = `${environment.apiUrl}/users`;

  /** Get current logged-in user profile (using stored UUID) */
  getMyProfile(): Observable<User> {
    if (isPlatformBrowser(this.platformId)) {
      const userUuid = localStorage.getItem(USER_UUID_KEY);
      if (userUuid) {
        return this.getUserByUuid(userUuid);
      }
    }
    throw new Error('User UUID not found in local storage');
  }

  /** Fetch user by UUID */
  getUserByUuid(uuid: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${uuid}`);
  }

  /** Fetch user by email */
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  /** Update user (uuid-based endpoint) */
  updateUser(uuid: string, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${uuid}`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  /** Clear tokens + user info */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem(USER_UUID_KEY);   
      localStorage.removeItem('auth_email');
      localStorage.removeItem('auth_role');
    }
  }
}
