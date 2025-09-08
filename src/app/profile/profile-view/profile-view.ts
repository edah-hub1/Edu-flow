import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/service/auth.service';
import { UserService, User } from '../../core/service/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile-view.html',
  styleUrls: ['./profile-view.css']
})
export class ProfileView implements OnInit {
  profileForm!: FormGroup;
  user: User | null = null;
  saving = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      password: ['']
    });

    const email = this.authService.getEmail();
    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (res) => {
          if (res) {
            this.user = res;
            this.profileForm.patchValue({
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email
            });
          }
        },
        error: (err) => console.error('Failed to load user:', err)
      });
    }
  }

  saveProfile() {
    if (!this.user) return;

    this.saving = true;

    const updated = this.profileForm.getRawValue();
    const payload: Partial<User> = {
      firstName: updated.firstName,
      lastName: updated.lastName,
      ...(updated.password ? { password: updated.password } : {})
    };

    this.userService.updateUser(this.user.id, payload).subscribe({
      next: (res) => {
        this.saving = false;
        alert('Profile updated successfully ✅');
        this.user = res; // update local copy
        this.profileForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email
        });
      },
      error: (err) => {
        this.saving = false;
        console.error('Failed to update profile:', err);
        alert('Failed to update profile');
      }
    });
  }
}
