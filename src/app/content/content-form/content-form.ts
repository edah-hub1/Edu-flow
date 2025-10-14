import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ContentService } from '../content.service';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './content-form.html',
  styleUrls: ['./content-form.css']
})
export class ContentForm implements OnInit {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    type: ['VIDEO', Validators.required],
    resourceUrl: [''],
    articleContent: [''],
    durationMinutes: [null],
    orderInModule: [1, Validators.required],
    moduleId: [null as number | null, Validators.required],
    //moduleId: [null, Validators.required],
    mandatory: [false]
  });

  isSubmitting = false;
  errorMessage = '';

  ngOnInit(): void {
    const moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (moduleId) this.form.patchValue({ moduleId });

    // react to type to clear irrelevant fields
    this.form.get('type')?.valueChanges.subscribe((t) => {
      if (t === 'VIDEO') {
        this.form.get('resourceUrl')?.setValidators([Validators.required]);
        this.form.get('articleContent')?.clearValidators();
      } else if (t === 'PDF') {
        this.form.get('resourceUrl')?.setValidators([Validators.required]);
        this.form.get('articleContent')?.clearValidators();
      } else if (t === 'ARTICLE') {
        this.form.get('articleContent')?.setValidators([Validators.required]);
        this.form.get('resourceUrl')?.clearValidators();
      } else {
        // QUIZ
        this.form.get('resourceUrl')?.clearValidators();
        this.form.get('articleContent')?.clearValidators();
      }
      this.form.get('resourceUrl')?.updateValueAndValidity();
      this.form.get('articleContent')?.updateValueAndValidity();
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    // const payload: Content = this.form.value;
    const payload: Content = {
    ...(this.form.value as any),
    type: this.form.value.type as Content['type'],
    title: this.form.value.title ?? ''
  };

    // ensure correct typing for type
    payload.type = payload.type as Content['type'];

    this.contentService.createContent(payload).subscribe({
      next: (res) => {
        // if content is quiz, redirect to quiz create prefill page
        if (res.type === 'QUIZ') {
          this.router.navigate(['/courses', res.moduleId, 'modules']);
        } else {
          // back to module contents
          this.router.navigate(['/courses', res.moduleId, 'modules']);
        }
      },
      error: (err) => {
        console.error('create content error', err);
        this.errorMessage = err?.message || 'Failed to create content';
        this.isSubmitting = false;
      }
    });
  }

  cancel() {
    const moduleId = this.form.get('moduleId')?.value;
    if (moduleId) {
      this.router.navigate(['/courses', moduleId, 'modules']);
    } else {
      this.router.navigate(['/courses']);
    }
  }
}
