import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-rated-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Top Rated <span class="text-primary-600">Courses</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn from the best-rated instructors across the platform.
        </p>
      </div>
    </section>
  `,
})
export class TopRatedCoursesComponent {}
