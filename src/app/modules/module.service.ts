import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Module } from './module.model';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create a new module
  createModule(payload: Module): Observable<Module> {
    return this.http.post<Module>(`${this.apiUrl}/modules`, payload);
  }

  // Get modules for a specific course
  getModulesByCourse(courseId: number): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/courses/${courseId}/modules`);
  }

    //  Get a specific module by ID(Not yet)
  getModule(moduleId: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/modules/${moduleId}`);
  }

  // Delete a module by courseId + moduleId
  deleteModule(courseId: number, moduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${courseId}/modules/${moduleId}`);
  }
}


