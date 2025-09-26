// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import your standalone components
import { Header } from './header/header';
import { Hero } from './hero/hero';
import { FeaturedCourses } from './featured-courses/featured-courses';
import { TopRatedCoursesComponent } from './top-rated-courses/top-rated-courses.component';
import { CallToAction } from './call-to-action/call-to-action';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Hero,
    FeaturedCourses,
    TopRatedCoursesComponent,
    CallToAction,
    Footer,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Header -->
      <app-header></app-header>

      <!-- Main Content -->
      <main class="flex-1">
        <app-hero></app-hero>
        <app-featured-courses></app-featured-courses>
        <app-top-rated-courses></app-top-rated-courses>
        <app-call-to-action></app-call-to-action>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
})
export class AppComponent {
  title = 'eduflow';
}
