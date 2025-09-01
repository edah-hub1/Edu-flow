import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css']
})
export class CourseForm {
  course: Course = { id: 0, title: '', description: '', createdAt: new Date().toISOString() };
  isEdit = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.course = {
        id: +id,
        title: 'Loaded Course',
        description: 'This is a dummy course for editing.',
        createdAt: new Date().toISOString()
      };
    }
  }

  saveCourse() {
    if (this.isEdit) {
      console.log('Updating course:', this.course);
    } else {
      console.log('Creating new course:', this.course);
    }
    this.router.navigate(['/courses']);
  }
}
