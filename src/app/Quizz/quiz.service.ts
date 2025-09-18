import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private url = `${environment.apiUrl}/quiz-creation`;

  constructor(private http: HttpClient) {}

  createFullQuiz(payload: any): Observable<any> {
    return this.http.post<any>(this.url, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
