// src/app/quizzes/quiz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  //  private baseUrl = 'http://localhost:8080/api/quizzes';
   private apiUrl = `${environment.apiUrl}/quizzes`;
  

  constructor(private http: HttpClient) {}

  getQuiz(quizId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${quizId}`);
  }

  // ✅ Bulk create with quizRequest + questionRequest
  bulkCreateQuiz(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, payload);
  }
}
