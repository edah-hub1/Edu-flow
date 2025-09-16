import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { DateCountPipe } from '../../date-count-pipe';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule, DateCountPipe],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseList {
  courses$!: Observable<Course[]>;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.errorMessage = '';

    this.courses$ = this.courseService.getCourses().pipe(
      map((data: any) => {
        if (Array.isArray(data)) {
          return data;
        } else if (data && typeof data === 'object' && data.hasOwnProperty('courses')) {
          return data.courses || [];
        } else if (data && typeof data === 'object' && data.hasOwnProperty('data')) {
          return data.data || [];
        } else {
          return data ? [data] : [];
        }
      }),
      catchError(err => {
        console.error('Error loading courses:', err);
        this.errorMessage = 'Failed to load courses. Please try again.';
        return of([]);
      }),
      startWith([]) // lets the UI render an initial value
    );

    // Simulate "loading complete" when observable emits
    this.courses$.subscribe(() => {
      this.loading = false;
    });
  }

  deleteCourse(id: number): void {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
      next: () => this.loadCourses(),
      error: (err:any) => {
        console.error('Delete failed:', err);
        this.errorMessage = 'Failed to delete the course. Please try again.';
      }
    });
  }

  trackByCourse(index: number, course: Course): any {
    return course.id;
  }
}
