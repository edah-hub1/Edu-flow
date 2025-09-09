// src/app/modules/module-form/module-form.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ModuleService } from '../module.service';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './module-form.html',
  styleUrls: ['./module-form.css']
})
export class ModuleForm implements OnInit {
  private fb = inject(FormBuilder).nonNullable; // NonNullableFormBuilder
  private moduleService = inject(ModuleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    order: 1,
    courseId: 0
  });

  errorMessage = '';
  isSubmitting = false;

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    if (!courseId) {
      this.errorMessage = 'Invalid course id';
      return;
    }

    // set courseId immediately
    this.form.patchValue({ courseId });

    // fetch existing modules to determine next order
    this.moduleService.getModulesByCourse(courseId).subscribe({
      next: (modules) => {
        const lastOrder = modules.length ? Math.max(...modules.map(m => m.order)) : 0;
        this.form.patchValue({ order: lastOrder + 1 });
      },
      error: (err) => {
        console.error('Failed to load modules for order auto-increment', err);
        // leave order as default 1 if fetch fails
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    const raw = this.form.getRawValue();
    const payload: Module = {
      title: raw.title,
      description: raw.description,
      order: raw.order,
      courseId: Number(raw.courseId)
    };

    this.moduleService.createModule(payload).subscribe({
      next: () => {
        // navigate back to modules list for this course (reloads list)
        this.router.navigate(['/courses', payload.courseId, 'modules']);
      },
      error: (err) => {
        console.error('Create module failed', err);
        this.errorMessage = err?.error?.message || 'Failed to create module. Try again.';
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
