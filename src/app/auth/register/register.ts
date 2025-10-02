import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class Register {
  isLoading = false;
  hide = true;
  hideConfirm = true;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.registerForm.valid) {
      this.isLoading = true;
      const { confirmPassword, role, ...formValue } = this.registerForm.value;

      if (formValue.password !== confirmPassword) {
        alert("Passwords don't match");
        this.isLoading = false;
        return;
      }

      const payload = {
        ...formValue,
        role: role
      };

      this.authService.register(payload).subscribe({
        next: (res: any) => {
          console.log('Registration successful:', res);
          alert('Account created! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Registration failed', err);
          alert(err.error?.message || 'Something went wrong');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}