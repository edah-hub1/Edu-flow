// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { CourseService } from '../course.service';
// import { Course } from '../course.model';

// @Component({
//   selector: 'app-course-list',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './course-list.html',
//   styleUrls: ['./course-list.css']
// })
// export class CourseList implements OnInit {
//   courses: Course[] = [];
 

//   constructor(private courseService: CourseService) {}

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses(): void {
//     this.courseService.getCourses().subscribe({
//       next: (data) => (this.courses = data),
//       error: (err) => console.error('Error loading courses', err)
//     });
//   }

//   deleteCourse(id: number): void {
//     this.courseService.deleteCourse(id).subscribe({
//       next: () => (this.courses = this.courses.filter(c => c.id !== id)),
//       error: (err) => console.error('Delete failed', err)
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../course.service';
import { Course } from '../course.model';


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Attempting to load courses...');
    
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log('Received courses data:', data);
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading courses:', {
          error: err,
          status: err?.status,
          message: err?.message,
          errorDetails: err?.error
        });
        this.errorMessage = 'Failed to load courses. Please check the console for details.';
        this.isLoading = false;
      }
    });

   
  }

  deleteCourse(id: number): void {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.errorMessage = 'Failed to delete the course. Please try again.';
      }
    });
  }
}
