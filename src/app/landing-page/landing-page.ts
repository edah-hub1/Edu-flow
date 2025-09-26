// src/app/landing-page/landing-page.component.ts
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

// Import the standalone components
import type { Courser } from "../models/course.interface"
import { HeaderComponent } from "../header/header.component"
import { FooterComponent } from "../footer/footer.component"
import { FeaturedCoursesComponent } from "../featured-courses/featured-courses.component"
import { CallToActionComponent } from "../call-to-action/call-to-action.component"

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FeaturedCoursesComponent,
    CallToActionComponent,
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- Header -->
      <app-header></app-header>

      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-balance">
            Learn Anytime, Anywhere with <span class="text-accent-400">Eduflow</span>
          </h1>
          <p class="text-lg lg:text-xl text-primary-100 mb-8 max-w-2xl mx-auto text-pretty">
            Explore thousands of expert-led courses and upgrade your skills for the future.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg">
              Get Started
            </button>
            <button class="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg">
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Courses -->
      <app-featured-courses></app-featured-courses>

      <!-- Call To Action -->
      <app-call-to-action></app-call-to-action>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
})
export class LandingPage {}
