import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, startWith, tap } from 'rxjs/operators';
import { Course } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetail {
  // Note the Course | null type
  course$!: Observable<Course | null>;
  loading = false;
  errorMessage = '';

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCourse(+id);
    } else {
      this.errorMessage = 'Invalid course ID';
    }
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.course$ = this.courseService.getCourse(id).pipe(
      tap(() => (this.loading = false)),
      // catchError(err => {
      //   console.error('Error loading course', err);
      //   this.errorMessage = 'Failed to load course details.';
      //   this.loading = false;
      //   return of(null); // ✅ now matches Course | null
      // }),
      startWith(null) // ✅ makes initial state valid
    );
  }
}
