import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Content } from './content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createContent(payload: Content): Observable<Content> {
    return this.http.post<Content>(`${this.apiUrl}/contents`, payload);
  }

 // GET contents by module
  getContentsByModule(moduleId: number): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiUrl}/modules/${moduleId}/contents`);
  }
}


  