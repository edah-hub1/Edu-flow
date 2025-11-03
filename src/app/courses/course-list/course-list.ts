import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { DateCountPipe } from '../../date-count-pipe';
import { DashboardLayout } from '../../dashboard/dashboard-layout/dashboard-layout';

interface CourseState {
  loading: boolean;
  errorMessage: string;
  courses: Course[];
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule, DateCountPipe, DashboardLayout],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseList {
  private courseService = inject(CourseService);

  // ✅ Reactive, type-safe state
  state$: Observable<CourseState> = this.courseService.getCourses().pipe(
    map((data: any) => {
      const courses = Array.isArray(data)
        ? data
        : data?.courses || data?.data || (data ? [data] : []);
      return { loading: false, errorMessage: '', courses };
    }),
    startWith({ loading: true, errorMessage: '', courses: [] }),
    catchError(err => {
      console.error('Error loading courses:', err);
      let message = 'Failed to load courses. Please try again.';

      if (err.status === 0) message = 'Cannot connect to server.';
      else if (err.status === 401) message = 'Unauthorized. Please log in again.';
      else if (err.status === 403) message = 'Access denied.';
      else if (err.status >= 500) message = 'Server error. Try later.';

      return of({ loading: false, errorMessage: message, courses: [] });
    })
  );

  deleteCourse(id: number): void {
    if (!confirm('Are you sure you want to delete this course?')) return;

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        // refresh 
        this.state$ = this.courseService.getCourses().pipe(
          map(courses => ({ loading: false, errorMessage: '', courses })),
          startWith({ loading: true, errorMessage: '', courses: [] }),
          catchError(err =>
            of({
              loading: false,
              errorMessage: 'Failed to refresh after delete.',
              courses: []
            })
          )
        );
      },
      error: (err: any) => {
        console.error('Delete failed:', err);
        alert('Failed to delete course. Please try again.');
      }
    });
  }

  trackByCourse(index: number, course: Course): number {
    return course.id;
  }
}
