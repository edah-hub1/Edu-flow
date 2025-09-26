import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-100">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Eduflow</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a href="#" class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Courses</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <button class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Login
            </button>
            <button class="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
              Sign Up
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button class="text-gray-700 hover:text-primary-600 p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
