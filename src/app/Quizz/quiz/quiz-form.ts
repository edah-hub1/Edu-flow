// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-create-quiz',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './quiz-form.html',
//   styleUrls: ['./quiz-form.css']
// })
// export class QuizForm {
//   quizForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     // ✅ define the form inside constructor
//     this.quizForm = this.fb.group({
//       title: ['', Validators.required],
//       instructions: [''],
//       timeLimitMinutes: [30, [Validators.min(0)]],
//       maximumAttempts: [1, [Validators.min(1)]],
//       passPercentage: [70, [Validators.min(0), Validators.max(100)]],
//       randomizeQuestions: [true],
//       showResultsImmediately: [true],
//       published: [true],
//       contentId: [null, Validators.required] // Link to course/lesson id
//     });
//   }

//   // ✅ move to questions page and pass quiz metadata
//   next(): void {
//     if (this.quizForm.invalid) {
//       this.quizForm.markAllAsTouched();
//       return;
//     }

//     // Navigate to Question Builder
//     this.router.navigate(['/quiz/questions'], {
//       state: { quizMeta: this.quizForm.value }
//     });
//   }
// }

// src/app/quizzes/quiz-form/quiz-form.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContentService } from '../../content/content.service';
import { Content } from '../../content/content.model';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quiz-form.html'
})
export class QuizForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contentService = inject(ContentService);

  quizForm = this.fb.group({
    instructions: [''],
    timeLimitMinutes: [30],
    maximumAttempts: [1],
    passPercentage: [70],
    randomizeQuestions: [true],
    showResultsImmediately: [true],
    published: [false]
  });

  contentId!: number;
  contentTitle = '';
  contentDescription = '';

  ngOnInit() {
    this.contentId = Number(this.route.snapshot.paramMap.get('contentId'));
    if (!this.contentId) {
      this.router.navigate(['/courses']);
      return;
    }

    this.contentService.getContentsByModule(this.contentId).subscribe({
  next: (c) => {
    const content = Array.isArray(c) ? c[0] : c; // pick first if array
    this.contentTitle = content?.title ?? '';
    this.contentDescription = content?.description ?? '';
  }
});


 
  }

  next() {
    // navigate to questions builder passing meta via navigation extras state
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
      return;
    }

    this.router.navigate(['/quizzes', this.contentId, 'questions'], {
      state: {
        quizMeta: {
          ...this.quizForm.value,
          contentId: this.contentId
        },
        title: this.contentTitle,
        description: this.contentDescription
      }
    });
  }
}
