import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../quiz.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface QuizState {
  loading: boolean;
  quiz: any | null;
  errorMessage: string;
}

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css'],
})
export class QuizList {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);

  // ✅ Strongly typed reactive stream
  quizState$: Observable<QuizState> = this.route.paramMap.pipe(
    map(params => Number(params.get('quizId'))),
    switchMap((quizId): Observable<QuizState> => {
      if (!quizId) {
        return of({
          loading: false,
          quiz: null,
          errorMessage: 'Invalid quiz ID in route.',
        });
      }

      return this.quizService.getQuiz(quizId).pipe(
        map(quiz => ({
          loading: false,
          quiz,
          errorMessage: '',
        })),
        startWith({ loading: true, quiz: null, errorMessage: '' }),
        catchError(err =>
          of({
            loading: false,
            quiz: null,
            errorMessage:
              err.error?.messages?.[0] || 'No quiz found for this content yet.',
          })
        )
      );
    })
  );
}
