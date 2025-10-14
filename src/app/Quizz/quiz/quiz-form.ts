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
  templateUrl: './quiz-form.html',
  styleUrls: ['./quiz-form.css']
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
    const content = Array.isArray(c) ? c[0] : c; 
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
