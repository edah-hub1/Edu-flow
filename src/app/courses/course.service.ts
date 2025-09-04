import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;
  private http = inject(HttpClient);

  /** Normalize API response into the Course model */
  private normalizeCourse(data: any): Course {
    return {
      id: data.id,
      title: data.title ?? data.courseTitle ?? '',
      description: data.description ?? data.courseDescription ?? '',
      createdAt: data.createdAt ?? new Date().toISOString()
    };
  }

  /** Prepare payload for backend to strip extra fields*/
  private toPayload(course: Course): any {
    return {
      courseTitle: course.title,
      courseDescription: course.description
    };
  }

  // GET all courses
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(res => res.map(item => this.normalizeCourse(item)))
  //   );
  // }
  
  // GET all courses
  getCourses(): Observable<Course[]> {
    console.log('Fetching courses from:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(res => {
        console.log('Courses API Response:', res);
        return res.map(item => this.normalizeCourse(item));
      }),
      catchError(error => {
        console.error('Error fetching courses:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        return throwError(() => new Error('Failed to fetch courses. Please try again later.'));
      })
    );
  }

  // GET single course
  getCourse(id: number): Observable<Course> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => this.normalizeCourse(res))
    );
  }

  // POST create course
  createCourse(course: Course): Observable<Course> {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.apiUrl, this.toPayload(course)).pipe(
      map(res => this.normalizeCourse(res))
    );
  }

  // PUT update course
  updateCourse(id: number, course: Course): Observable<Course> {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.put<any>(`${this.apiUrl}/${id}`, this.toPayload(course)).pipe(
      map(res => this.normalizeCourse(res))
    );
  }

  // DELETE course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
