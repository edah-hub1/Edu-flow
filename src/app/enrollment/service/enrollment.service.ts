import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = `${environment.apiUrl}/enrollments`;
  private http = inject(HttpClient);

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }
}
