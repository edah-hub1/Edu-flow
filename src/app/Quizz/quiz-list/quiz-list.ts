import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../quiz.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css']
})
export class QuizList implements OnInit {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);

  quiz: any = null;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    // ✅ Get quizId from route 
    const quizId = Number(this.route.snapshot.paramMap.get('quizId'));

    if (!quizId) {
      this.errorMessage = 'Invalid quiz ID in route.';
      return;
    }

    this.loading = true;
    this.quizService.getQuiz(quizId).pipe(
      catchError(err => {
        console.error('Failed to load quiz', err);
        this.errorMessage = 'No quiz found for this content yet.';
        this.loading = false;
        return of(null);
      })
    ).subscribe(res => {
      this.quiz = res;
      this.loading = false;
    });
  }
}
