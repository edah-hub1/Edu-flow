import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css']
})
export class CourseForm implements OnInit {
  course: Course = { id: 0, title: '', description: '', createdAt: new Date().toISOString() };
  isEdit = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadCourse(+id);
    }
  }

  loadCourse(id: number): void {
    this.courseService.getCourse(id).subscribe({
      next: (data) => (this.course = data),
      error: (err) => console.error('Error loading course', err)
    });
  }

  saveCourse(): void {
    if (this.isEdit) {
      // On update exclude createdAt
      const payload = {
        title: this.course.title,
        description: this.course.description
      };
      this.courseService.updateCourse(this.course.id, payload as Course).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (err) => console.error('Update failed', err)
      });
    } else {
      // On create only send the required fields
      const payload = {
        title: this.course.title,
        description: this.course.description
      };
      this.courseService.createCourse(payload as Course).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (err) => console.error('Create failed', err)
      });
    }
  }
}
