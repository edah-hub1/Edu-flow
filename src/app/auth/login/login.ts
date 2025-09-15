import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatCardContent, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardContent,
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
          this.router.navigate(['/dashboard/student']);
        },
        error: (err: any) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        }
      });
    }
  }
}
