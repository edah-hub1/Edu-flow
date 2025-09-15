// src/app/landing/landing.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  rating?: number;
  thumbnailUrl?: string;
}

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-landing',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage implements OnInit {
  private apiUrl = `${environment.apiUrl}/courses`;
  courses: Course[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Course[]>('this.apiUrl').subscribe({
      next: (data) => {
        this.courses = data.slice(0, 3); //  show 3 popular courses
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load courses';
        this.loading = false;
      },
    });
  }

  goToCourses() {
    this.router.navigate(['/courses']);
  }

  goToCourseDetail(courseId: number) {
    this.router.navigate(['/courses', courseId]);
  }
}
