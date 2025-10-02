import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router ,RouterLink} from '@angular/router';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { Observable, of, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,MatCard,MatProgressSpinner, RouterLink
  ],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css']
})
export class CourseForm implements OnInit {
  course$!: Observable<Course | null>;
  isEdit = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEdit = true;
          return this.courseService.getCourse(+id);
        }
        // Default new course
        return of({
          id: 0,
          title: '',
          description: '',
          createdAt: new Date().toISOString(),
          instructorId: 1 // to replace with logged-in user’s ID
        } as Course);
      })
    );
  }

  saveCourse(course: Course): void {
    
    const payload: Course = {
      ...course,
      instructorId: course.instructorId ?? 1
    };

    if (this.isEdit) {
      this.courseService.updateCourse(payload.id, payload).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.courseService.createCourse(payload).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (err) => console.error('Create failed', err)
      });
    }
  }
}
