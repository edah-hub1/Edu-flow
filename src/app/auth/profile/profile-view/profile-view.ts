import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { UserService, User } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile-view.html',
  styleUrls: ['./profile-view.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
})
export class ProfileView implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  user: User | null = null;
  loading = false;

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;

    try {
      this.userService.getMyProfile().subscribe({
        next: (res) => {
          this.user = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('❌ Failed to load profile', err);
          this.loading = false;

          // Redirect to login if unauthorized or UUID missing
          this.router.navigate(['/auth/login']);
        },
      });
    } catch (e) {
      console.error('❌ No UUID in localStorage', e);
      this.router.navigate(['/auth/login']);
    }
  }

  editProfile(): void {
    console.log('Edit profile clicked');
    // Navigate to edit form if you build one
  }
}
