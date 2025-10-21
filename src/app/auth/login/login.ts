import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
})
export class Login {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (res: any) => {
          console.log('Login successful:', res);

          // ✅ Save tokens + user info
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('refresh_token', res.refreshToken);
          localStorage.setItem('auth_uuid', res.user.uuid);
          localStorage.setItem('auth_email', res.user.email);
          localStorage.setItem('auth_role', res.user.role);
          localStorage.setItem('auth_name', `${res.user.firstName} ${res.user.lastName}`);

          // ✅ Redirect based on role
          switch (res.user.role.toUpperCase()) {
            case 'ADMIN':
              this.router.navigate(['/dashboard/admin']);
              break;
            case 'INSTRUCTOR':
              this.router.navigate(['/dashboard/instructor']);
              break;
            case 'STUDENT':
              this.router.navigate(['/dashboard/student']);
              break;
            default:
              this.router.navigate(['/dashboard']);
          }
        },
        error: (err: any) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        }
      });
    }
  }
}
