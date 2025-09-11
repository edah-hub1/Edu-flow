import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from './content.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);
  private baseUrl = '{{base_url}}/content';

  // Only one argument now
  createContent(payload: Content): Observable<Content> {
    return this.http.post<Content>(`${this.baseUrl}/create`, payload);
  }
}


  // get contents for module
  // getContentsByModule(moduleId: number): Observable<Content[]> {
  //   return this.http.get<Content[]>(`${this.base}/modules/${moduleId}/contents`);
  // }

  // deleteContent(contentId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.base}/contents/${contentId}`);
  // }

  //  update content
  // updateContent(courseId: string, moduleId: string, editingContentId: string, contentId: number, payload: Content | FormData): Observable<Content> {
  //   if (payload instanceof FormData) {
  //     return this.http.put<Content>(`${this.base}/contents/${contentId}`, payload);
  //   }
  //   return this.http.put<Content>(`${this.base}/contents/${contentId}`, payload);
  // }

