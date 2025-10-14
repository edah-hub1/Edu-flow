import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-form.html',
  styleUrls: ['./question-form.css']
})
export class QuestionForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private quizService = inject(QuizService);

  form!: FormGroup;
  contentId!: number;
  isSubmitting = false;
  errorMessage = '';

  ngOnInit(): void {
    this.contentId = Number(this.route.snapshot.paramMap.get('contentId'));

    this.form = this.fb.group({
      quizRequest: this.fb.group({
        contentId: [this.contentId, Validators.required],
        instructions: ['', Validators.required],
        timeLimitMinutes: [null],
        maximumAttempts: [1, Validators.required],
        passPercentage: [50, Validators.required],
        randomizeQuestions: [false],
        showResultsImmediately: [true],
      }),
      questionRequest: this.fb.array([])
    });

    // start with one sample question
    this.addQuestion();
  }

  // getters
  get questions(): FormArray {
    return this.form.get('questionRequest') as FormArray;
  }

  options(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('optionRequest') as FormArray;
  }

  // methods
  addQuestion(): void {
    const qGroup = this.fb.group({
      questionText: ['', Validators.required],
      type: ['SINGLE_CHOICE', Validators.required],
      orderInQuiz: [this.questions.length + 1],
      points: [1, Validators.required],
      explanation: [''],
      optionRequest: this.fb.array([])
    });

    this.questions.push(qGroup);
    this.addOption(this.questions.length - 1); //  first option
    this.addOption(this.questions.length - 1); //  second option
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(qIndex: number): void {
    this.options(qIndex).push(
      this.fb.group({
        optionText: ['', Validators.required],
        correct: [false],
        orderInQuestion: [this.options(qIndex).length + 1]
      })
    );
  }

  removeOption(qIndex: number, optIndex: number): void {
    this.options(qIndex).removeAt(optIndex);
  }

 saveQuiz(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  const payload = this.form.value;

  this.quizService.bulkCreateQuiz(payload).subscribe({
    next: (res) => {
      console.log('Quiz saved:', res);

      // navigate back to the module's contents
      const courseId = this.route.snapshot.paramMap.get('courseId');
      const moduleId = this.route.snapshot.paramMap.get('moduleId');

      this.router.navigate([
        '/courses',
        courseId,
        'modules',
        moduleId,
        'contents'
      ]);
    },
    error: (err) => {
      console.error('Failed to save quiz', err);
      this.errorMessage = err?.error?.message || 'Failed to save quiz';
      this.isSubmitting = false;
    },
    complete: () => (this.isSubmitting = false)
  });
}
}