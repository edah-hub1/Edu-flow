import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css']
})
export class QuizList implements OnInit {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);

  quiz: any;
  loading = true;
  errorMessage = '';

//   ngOnInit(): void {
//     const quizId = Number(this.route.snapshot.paramMap.get('quizId'));
//     this.quizService.getQuiz(quizId).subscribe({
//       next: (res) => {
//         this.quiz = res;
//         this.quiz.questionResponses = this.quiz.questionResponses || []; // fallback
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Failed to load quiz', err);
//         this.errorMessage = 'Failed to load quiz.';
//         this.loading = false;
//       }
//     });

//   }
// }
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    // capture the correct param name
    const quizId = Number(params.get('quizId'));   // 'quizId'
    if (quizId) {
      this.quizService.getQuiz(quizId).subscribe({
        next: (res) => this.quiz = res,
        error: (err) => {
          console.error('Failed to load quiz', err);
          this.errorMessage = 'Failed to load quiz.';
        }
      });
    }
  });
}
}
