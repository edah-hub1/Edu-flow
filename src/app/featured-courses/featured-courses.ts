import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Courser } from '../models/course.interface';

@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-courses.html',
  styleUrls: ['./featured-courses.css']
})
export class FeaturedCourses {
  featuredCourses: Courser[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      duration: "12 weeks",
      students: 2500,
      rating: 4.8,
      price: 99,
      image: "assets/images/web-dev-bootcamp.png",
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
      image: "assets/images/ui-ux-design-interface-mockups.jpg",
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
      image: "assets/images/digital-marketing-dashboard.png",
      category: "Marketing",
    },
  ];
}
