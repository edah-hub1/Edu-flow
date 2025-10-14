import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardLayout } from '../dashboard/dashboard-layout/dashboard-layout';

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: number;
  duration: string;
  status: 'Published' | 'Draft';
}

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboardLayout],
  templateUrl: './all-quiz.html',
  styleUrls: ['./all-quiz.css']
})
export class AllQuiz implements OnInit {
  router = inject(Router);

  quizzes: Quiz[] = [];
  search = new FormControl('');
  filterCourse = new FormControl('');
  filterStatus = new FormControl('');

  ngOnInit(): void {
    this.quizzes = [
      { id: 1, title: 'History of Science', description: '10 questions, 30 minutes', questions: 10, duration: '30 min', status: 'Published' },
      { id: 2, title: 'Introduction to Biology', description: '15 questions, 45 minutes', questions: 15, duration: '45 min', status: 'Draft' },
      { id: 3, title: 'Advanced Calculus', description: '20 questions, 60 minutes', questions: 20, duration: '60 min', status: 'Published' },
      { id: 4, title: 'World Literature', description: '12 questions, 35 minutes', questions: 12, duration: '35 min', status: 'Published' },
      { id: 5, title: 'Organic Chemistry', description: '18 questions, 50 minutes', questions: 18, duration: '50 min', status: 'Draft' },
    ];
  }

  get filteredQuizzes(): Quiz[] {
    const term = this.search.value?.toLowerCase() ?? '';
    const status = this.filterStatus.value;
    return this.quizzes.filter(q =>
      q.title.toLowerCase().includes(term) &&
      (!status || q.status === status)
    );
  }

  viewQuiz(quizId: number) {
    this.router.navigate(['/quizzes', quizId, 'view']);
  }

  editQuiz(quizId: number) {
    this.router.navigate(['/quizzes', quizId, 'edit']);
  }

  deleteQuiz(quizId: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizzes = this.quizzes.filter(q => q.id !== quizId);
    }
  }

  createNewQuiz() {
    this.router.navigate(['/quizzes/new']);
  }
}
