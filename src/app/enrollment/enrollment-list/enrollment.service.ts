import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../enrollment.model';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = `${environment.apiUrl}/enrollments`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** ✅ Enroll logged-in user in a course (prefers numeric ID, falls back to UUID) */
  enrollInCourse(courseId: number): Observable<Enrollment> {
    const userId = this.authService.getUserId(); // <-- use numeric if available
    const userUuid = this.authService.getUuid();

    if (!userId && !userUuid) {
      return throwError(() => new Error('Cannot enroll. User is not logged in.'));
    }

    // backend prefers numeric userId
    const payload: any = {
      userId: userId || userUuid,
      courseId
    };

    console.log('Enrollment payload:', payload);
    return this.http.post<Enrollment>(this.apiUrl, payload);
  }

  /** ✅ Optional: Still allow direct enrollment via payload (Admin use) */
  enroll(payload: Enrollment): Observable<Enrollment> {
    console.log('Payload sent to enroll:', payload);
    return this.http.post<Enrollment>(this.apiUrl, payload);
  }

  /** ✅ Check if current user is enrolled in a course */
  isUserEnrolled(courseId: number): Observable<Enrollment | null> {
    const userId = this.authService.getUserId();
    const userUuid = this.authService.getUuid();

    if (!userId && !userUuid) {
      return throwError(() => new Error('User not logged in'));
    }

    const identifier = userId || userUuid;
    return this.http.get<Enrollment | null>(
      `${this.apiUrl}?userId=${identifier}&courseId=${courseId}`
    );
  }

  /** ✅ Get all enrollments */
  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  /** ✅ Get logged-in user's enrollments */
  getEnrollmentsByUser(): Observable<Enrollment[]> {
    const userId = this.authService.getUserId();
    const userUuid = this.authService.getUuid();

    if (!userId && !userUuid) {
      return throwError(() => new Error('User not logged in'));
    }

    const identifier = userId || userUuid;
    return this.http.get<Enrollment[]>(`${this.apiUrl}?userId=${identifier}`);
  }

  /** ✅ Drop / Cancel enrollment */
  dropEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
