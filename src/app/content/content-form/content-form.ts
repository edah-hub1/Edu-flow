import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentService } from '../content.service';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-form',
  standalone: true,
  templateUrl: './content-form.html',
  styleUrls: ['./content-form.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContentForm implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  moduleId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['PDF', Validators.required],
      orderInModule: [1, Validators.required],
      resourceUrl: [''],
      articleContent: [''],
      durationMinutes: [null],
      quizId: [null],
      mandatory: [false],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload: Content = {
      ...this.form.value,
      moduleId: this.moduleId,
    };

    this.contentService.createContent(payload).subscribe({
      next: () => {
        this.successMessage = 'Content created successfully!';
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: () => {
        this.errorMessage = 'Failed to create content';
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
