import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseList {
  courses: Course[] = [
    { id: 1, title: 'Introduction to Angular', description: 'Learn Angular basics.', createdAt: '2025-09-01T10:30:45' },
    { id: 2, title: 'Spring Boot Essentials', description: 'Master Spring Boot with hands-on examples.', createdAt: '2025-09-01T11:12:20' },
    { id: 3, title: 'Data Structures in Java', description: 'Understand core data structures.', createdAt: '2025-09-01T12:00:00' }
  ];
}
