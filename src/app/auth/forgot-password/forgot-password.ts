import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardActions, MatCardContent } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule,MatCardActions,MatSpinner,MatCardContent    
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading = false;
  message = '';
  error = '';

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.message = '';
    this.error = '';

    const email = this.form.value.email;

    // 👉 Replace with your real backend endpoint
    this.http.post('/api/auth/forgot-password', { email }).subscribe({
      next: () => {
        this.message = 'Password reset instructions have been sent to your email.';
        this.loading = false;
      },
      error: (err) => {
        console.error('Forgot password error:', err);
        this.error = err?.error?.message || 'Something went wrong. Please try again.';
        this.loading = false;
      }
    });
  }
}

