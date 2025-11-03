import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quizzes`;

  constructor(private http: HttpClient) {}

  //  Fetch quiz (with questions + options)
  getQuiz(quizId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${quizId}/bulk`);
  }
  

  //  Bulk create quiz (with questions)
  bulkCreateQuiz(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, payload);
  }
}
