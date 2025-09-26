// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import your standalone components
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturedCoursesComponent } from './featured-courses/featured-courses.component';
import { TopRatedCoursesComponent } from './top-rated-courses/top-rated-courses.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    FeaturedCoursesComponent,
    TopRatedCoursesComponent,
    CallToActionComponent,
    FooterComponent,
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
