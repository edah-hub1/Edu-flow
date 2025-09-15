import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '../enrollment.model';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enrollment-list.html',
})
export class EnrollmentList implements OnInit {
  enrollments$!: Observable<Enrollment[]>;
  loading = false;
  errorMessage = '';

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.enrollments$ = this.enrollmentService.getEnrollments();
    this.loading = false;
  }
}
