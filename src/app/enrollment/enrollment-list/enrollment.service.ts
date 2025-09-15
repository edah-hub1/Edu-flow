import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = `${environment.apiUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  // Create (Enroll user in a course)
  enroll(payload: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, payload);
  }

  // Get all enrollments
  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  // Get enrollments by user
  getEnrollmentsByUser(userId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Cancel / drop enrollment
  dropEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
