import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage {
  featuredCourses = [
    {
      title: 'Introduction to Python',
      author: 'John Doe',
      image: 'https://images.unsplash.com/photo-1581091012184-5c7b94e57a92'
    },
    {
      title: 'Web Design Fundamentals',
      author: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
    },
    {
      title: 'Data Science for Beginners',
      author: 'Peter Jones',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
    },
    {
      title: 'Machine Learning ',
      author: 'Emily White',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Kim',
      role: 'Software Engineer',
      message: 'CourseApp transformed how I learn online. The instructors are world-class!',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      name: 'James Otieno',
      role: 'Data Analyst',
      message: 'Flexible and engaging — I could learn at my own pace and still stay motivated.',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      name: 'Maria Gonzalez',
      role: 'UI/UX Designer',
      message: 'The projects and community made learning so enjoyable and effective.',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg'
    }
  ];
}
