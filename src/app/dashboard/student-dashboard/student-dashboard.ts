import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayout } from "../dashboard-layout/dashboard-layout";
import { DateCountPipe } from '../../date-count-pipe';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardLayout, DateCountPipe],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard {
  studentName = 'John Doe';

  totalEnrolled = 5;
  completedCourses = 2;

  courses = [
    { title: 'Introduction to Angular', progress: 'Completed' },
    { title: 'Spring Framework Essentials', progress: 'In Progress' },
    { title: 'Data Structures in Java', progress: 'Not Started' },
    { title: 'RESTful API Development', progress: 'In Progress' },
    { title: 'Database Management Systems', progress: 'Completed' }
  ];

  notifications = [
    { message: 'New Assignment: REST API Project', time: '2 hours ago' },
    { message: 'Course Updated: Data Structures in Java', time: '1 day ago' },
    { message: 'Instructor Feedback Received', time: '3 days ago' }
  ];
}

