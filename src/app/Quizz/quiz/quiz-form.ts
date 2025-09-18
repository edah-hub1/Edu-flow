import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz-form.html',
  styleUrls: ['./quiz-form.css']
})
export class QuizForm {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // ✅ define the form inside constructor
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      instructions: [''],
      timeLimitMinutes: [30, [Validators.min(0)]],
      maximumAttempts: [1, [Validators.min(1)]],
      passPercentage: [70, [Validators.min(0), Validators.max(100)]],
      randomizeQuestions: [true],
      showResultsImmediately: [true],
      published: [true],
      contentId: [null, Validators.required] // Link to course/lesson id
    });
  }

  // ✅ move to questions page and pass quiz metadata
  next(): void {
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
      return;
    }

    // Navigate to Question Builder
    this.router.navigate(['/quiz/questions'], {
      state: { quizMeta: this.quizForm.value }
    });
  }
}
