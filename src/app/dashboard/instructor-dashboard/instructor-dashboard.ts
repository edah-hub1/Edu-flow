import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from "../../shared/sidebar/sidebar";
import { Navbar } from '../../shared/navbar/navbar';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar, Navbar, RouterModule],
  templateUrl: './instructor-dashboard.html',
  styleUrls: ['./instructor-dashboard.css']
})
export class InstructorDashboard {
  instructorName = 'Edah Chepngetich';

  // Dummy data
  totalCourses = 12;
  enrolledStudents = 350;

  courses = [
    { title: 'Introduction to Angular', enrolled: 100 },
    { title: 'Spring Framework Essentials', enrolled: 80 },
    { title: 'Data Structures in Java', enrolled: 85 },
    { title: 'RESTful API Development', enrolled: 85 }
  ];

  notifications = [
    { message: 'New Enrollment', time: '5 min ago' },
    { message: 'Course Updated', time: '2 hours ago' },
    { message: 'New Assignment', time: '1 day ago' }
  ];
}
