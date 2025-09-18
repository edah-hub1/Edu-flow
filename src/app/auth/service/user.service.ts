import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
  createdAt: string;
}
const USERID_KEY = 'auth_id';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  // Fetch user by email
  // getUserByEmail(email: string): Observable<User | null> {
  //   return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  // }

  
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }


  // Update user
  updateUser(userId: number, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
