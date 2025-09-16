import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private baseUrl = 'http://localhost:8080/quizzes'; //  API

  constructor(private http: HttpClient) {}

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/create`, quiz);
  }

  getQuizByModule(moduleId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/module/${moduleId}`);
  }
}
