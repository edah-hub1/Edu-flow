import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule], // datepipe
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetail {
  course: Course | null = null;

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.course = {
        id: +id,
        title: 'Introduction to Angular',
        description: 'This is a dummy course description.',
        createdAt: new Date().toISOString()
      };
    }
  }
}
