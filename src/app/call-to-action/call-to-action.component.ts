import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-call-to-action",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6 text-balance">
            Ready to Start Your Learning Journey?
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto text-pretty">
            Join over 250,000 students who are already learning with Eduflow. 
            Start your free trial today and unlock unlimited access to our courses.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button class="bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg">
              View All Courses
            </button>
          </div>

          <!-- Features -->
          <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Lifetime Access</h3>
              <p class="text-primary-100">Access your courses anytime, anywhere with lifetime updates</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Expert Instructors</h3>
              <p class="text-primary-100">Learn from industry professionals with years of experience</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p class="text-primary-100">Get help whenever you need it with our dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CallToActionComponent {}
