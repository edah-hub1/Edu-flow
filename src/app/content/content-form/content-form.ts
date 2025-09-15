import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../content.service';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './content-form.html',
  styleUrls: ['./content-form.css']
})
export class ContentForm implements OnInit {
  private fb = inject(FormBuilder).nonNullable;
  private contentService = inject(ContentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    type: ['PDF' as 'VIDEO' | 'PDF' | 'ARTICLE' | 'QUIZ', Validators.required],
    orderInModule: [1, Validators.required],
    resourceUrl: [''],
    articleContent: [''],
    durationMinutes: [null],
    quizId: [null],
    moduleId: [0, Validators.required],
    mandatory: [false]
  });

  errorMessage = '';
  isSubmitting = false;
  moduleId: any|string;

  ngOnInit(): void {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (!moduleId) {
      this.errorMessage = 'Invalid module id';
      return;
    }
    this.form.patchValue({ moduleId });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const raw = this.form.getRawValue();
    const payload: Content = {
      ...raw,
      type: raw.type as 'VIDEO' | 'PDF' | 'ARTICLE' | 'QUIZ',
      mandatory: raw.mandatory ?? false
    };

    this.contentService.createContent(payload).subscribe({
      next: () => {
        this.router.navigate(['/modules', payload.moduleId, 'contents']);
      },
      error: (err) => {
        console.error('Create content failed', err);
        this.errorMessage = err?.error?.message || 'Failed to create content';
        this.isSubmitting = false;
      },
      complete: () => (this.isSubmitting = false)
    });
  }
}
