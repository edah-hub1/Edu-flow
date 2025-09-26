// src/app/featured-courses/featured-courses.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Courser } from '../models/course.interface';

@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Featured <span class="text-primary-600">Courses</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Discover our most popular courses designed by industry experts to help you master new skills
          </p>
        </div>

        <!-- Courses Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let course of featuredCourses" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
            <!-- Course Image -->
            <div class="relative overflow-hidden">
              <img 
                [src]="course.image" 
                [alt]="course.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ course.category }}
                </span>
              </div>
            </div>

            <!-- Course Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ course.title }}
              </h3>
              <p class="text-gray-600 mb-4">by {{ course.instructor }}</p>

              <!-- Course Stats -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    {{ course.duration }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    {{ course.students }}
                  </span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm text-gray-600">{{ course.rating }}</span>
                </div>
              </div>

              <!-- Price and Enroll -->
              <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-primary-600">
                  {{ course.price }}
                </div>
                <button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FeaturedCoursesComponent {
  featuredCourses: Courser[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      duration: "12 weeks",
      students: 2500,
      rating: 4.8,
      price: 99,
      image: "/web-dev-bootcamp.png",
      category: "Development",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      duration: "8 weeks",
      students: 1800,
      rating: 4.9,
      price: 79,
      image: "/ui-ux-design-interface-mockups.jpg",
      category: "Design",
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Emily Rodriguez",
      duration: "6 weeks",
      students: 3200,
      rating: 4.7,
      price: 69,
      image: "/digital-marketing-dashboard.png",
      category: "Marketing",
    },
  ];
}
