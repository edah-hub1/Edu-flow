import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

  /** Prepare payload for backend to strip extra fields */
  private toPayload(course: Course): any {
    return {
      courseTitle: course.title,
      courseDescription: course.description
    };
  }

  // GET all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(res => res.map(item => this.normalizeCourse(item)))
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
    return this.http.post<any>(this.apiUrl, this.toPayload(course)).pipe(
      map(res => this.normalizeCourse(res))
    );
  }

  // PUT update course
  updateCourse(id: number, course: Course): Observable<Course> {
    const payload = {
      id,  // include id in payload for backend validation
      courseTitle: course.title,
      courseDescription: course.description
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload).pipe(
      map(res => this.normalizeCourse(res))
    );
  }


  // DELETE course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
