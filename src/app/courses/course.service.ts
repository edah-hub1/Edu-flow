import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;
  private http = inject(HttpClient);

  private normalizeCourse(data: any): Course {
    return {
      id: data.id,
      instructorId: data.instructorId ?? null,
      title: data.title ?? data.courseTitle ?? '',
      description: data.description ?? data.courseDescription ?? '',
      createdAt: data.createdAt ?? new Date().toISOString(),
    };
  }

  private toPayload(course: Course): any {
    return {
      title: course.title,
      description: course.description,
      instructorId: course.instructorId??1,
    };
  }

  /** Centralized error handler */
  private handleError(error: any): Observable<never> {
    console.error('API error occurred:', error);

    let message = 'An unexpected error occurred. Please try again later.';

    if (error.status === 0) {
      message = 'Cannot connect to the server. Please check your network.';
    } else if (error.status === 400) {
      message = 'Invalid request. Please check the form and try again.';
    } else if (error.status === 404) {
      message = 'Resource not found.';
    } else if (error.status === 500) {
      message = 'Server error occurred. Please try again later.';
    } else if (error.message) {
      message = error.message;
    }

    return throwError(() => new Error(message));
  }

  // GET all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res) => res.map((item) => this.normalizeCourse(item))),
      catchError(this.handleError.bind(this))
    );
  }

  // GET single course
  getCourse(id: number): Observable<Course> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((res) => this.normalizeCourse(res)),
      catchError(this.handleError.bind(this))
    );
  }

  // POST create course
  createCourse(course: Course): Observable<Course> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, this.toPayload(course), { headers }).pipe(
      map((res) => this.normalizeCourse(res)),
      catchError(this.handleError.bind(this))
    );
  }

  // PUT update course
  updateCourse(id: number, course: Course): Observable<Course> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${id}`, this.toPayload(course), { headers }).pipe(
      map((res) => this.normalizeCourse(res)),
      catchError(this.handleError.bind(this))
    );
  }

  // DELETE course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
