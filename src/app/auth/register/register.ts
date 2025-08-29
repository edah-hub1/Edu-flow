import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
 
})
export class Register {
  hide = true;
  hideConfirm = true;
  registerForm: FormGroup;
  authService: any;
  router: any;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

 onSubmit() {
  if (this.registerForm.valid) {
    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password).subscribe({
      next: (res: any) => {
        console.log('Registration successful:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Registration failed', err);
        alert('Something went wrong');
      }
    });
  }
}


}
