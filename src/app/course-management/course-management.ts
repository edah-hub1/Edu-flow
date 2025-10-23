import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Navbar } from '../shared/navbar/navbar';
// import { Footer } from '../footer/footer';
import { DashboardLayout } from '../dashboard/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-course-management',
  standalone: true, // ✅ Required for Angular standalone components
  imports: [CommonModule, HttpClientModule, DashboardLayout],
  templateUrl: './course-management.html',
  styleUrls: ['./course-management.css'] // ✅ correct property name (plural)
})
export class CourseManagement implements OnInit {
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.http.get<any[]>('http://localhost:8080/api/courses').subscribe({
      next: (res) => (this.courses = res),
      error: (err) => console.error('Error loading courses:', err)
    });
  }
}
