import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../service/enrollment.service';
import { Enrollment } from '../enrollment.model';
import { Observable } from 'rxjs';
import { DashboardLayout } from '../../dashboard/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule,DashboardLayout],
  templateUrl: './enrollment-list.html',
  styleUrls: ['./enrollment-list.css']
})
export class EnrollmentList {
  enrollments$!: Observable<Enrollment[]>;
  errorMessage = '';
  loading = true;

  private enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    this.enrollments$ = this.enrollmentService.getEnrollments();
    this.loading = false;
  }

  trackByEnrollment(index: number, enrollment: Enrollment) {
    return enrollment.id;
  }
}
