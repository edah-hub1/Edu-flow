import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { EnrollmentService } from '../../enrollment/enrollment-list/enrollment.service';
import { AuthService } from '../../auth/service/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetail {
  course$!: Observable<Course | null>;
  courseId!: number;
  loading = false;
  errorMessage = '';
  isEnrolled = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef); // ✅ Added

  /** ✅ Get logged-in user's UUID from auth service */
  get userId(): string | null {
    return this.authService.getUuid();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = +id;
      this.loadCourse(this.courseId);
      // Future: this.checkEnrollment();
    } else {
      this.errorMessage = 'Invalid course ID';
    }
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.course$ = this.courseService.getCourse(id).pipe(
      tap(() => (this.loading = false)),
      catchError(() => {
        this.errorMessage = 'Failed to load course.';
        this.loading = false;
        return of(null);
      })
    );
  }

  /** ✅ Enroll user to course */
  enrollNow(): void {
    if (!this.userId) {
      alert('Please log in to enroll.');
      return;
    }

    this.enrollmentService.enrollInCourse(this.courseId).subscribe({
      next: (res) => {
        console.log('Enrollment response:', res);
        this.isEnrolled = true;
        alert('✅ Successfully enrolled in this course!');
        this.cdr.markForCheck(); // ✅ Forces UI update
      },
      error: (err) => {
        if (err.status === 409) {
          this.isEnrolled = true;
          alert('⚠ You are already enrolled in this course.');
          this.cdr.markForCheck(); // ✅ Forces UI update
        } else {
          alert('Could not enroll. Please try again.');
        }
      }
    });
  }

  /** ✅ Navigate to course content/modules */
  goToCourse(): void {
    this.router.navigate(['/courses', this.courseId, 'modules']);
  }
}
