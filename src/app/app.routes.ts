import { Routes } from '@angular/router';

// Auth
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { ForgotPassword } from './auth/forgot-password/forgot-password';

// Dashboard
import { StudentDashboard } from './dashboard/student-dashboard/student-dashboard';
import { InstructorDashboard } from './dashboard/instructor-dashboard/instructor-dashboard';
import { AdminDashboard } from './dashboard/admin-dashboard/admin-dashboard';
import { LandingPage } from './dashboard/landing-page/landing-page';



// Courses
import { CourseList } from './courses/course-list/course-list';
import { CourseDetail } from './courses/course-detail/course-detail';
import { CourseForm } from './courses/course-form/course-form';

import { CourseModule } from './courses/course-module/course-module';
import { ModuleList } from './modules/module-list/module-list';
import { ModuleForm } from './modules/module-form/module-form';
import { ContentList } from './content/content-list/content-list';
import { ContentForm } from './content/content-form/content-form';



// Enrollment
import { EnrollmentList } from './enrollment/enrollment-list/enrollment-list';
import { ProgressTracker } from './enrollment/progress-tracker/progress-tracker';

// Notifications
import { NotificationList } from './notifications/notification-list/notification-list';

// Profile
import { ProfileView } from './auth/profile/profile-view/profile-view';
import { ProfileEdit } from './auth/profile/profile-edit/profile-edit';

// Certificates
import { Certificates } from './courses/certificates/certificates';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },

  // Dashboards
  { path: 'dashboard/student', component: StudentDashboard },
  { path: 'dashboard/instructor', component: InstructorDashboard },
  { path: 'dashboard/admin', component: AdminDashboard },
  { path: 'landing-page', component: LandingPage },

  // Courses
  { path: 'courses', component: CourseList },
  { path: 'courses/new', component: CourseForm },
  { path: 'courses/edit/:id', component: CourseForm },
  { path: 'courses/:id', component: CourseDetail },

  { path: 'courses/:courseId/modules', component: ModuleList },
  { path: 'courses/:courseId/modules/create', component: ModuleForm },

    // Modules
  { path: 'courses/:courseId/modules/:moduleId/contents', component: ContentList },
  { path: 'courses/:courseId/modules/:moduleId/contents/create', component: ContentForm },
  { path: 'courses/:courseId/modules/:moduleId/contents/:contentId/edit', component: ContentForm }, 


  //{ path: 'module', component: CourseModule },

  // Enrollment
  { path: 'enrollments', component: EnrollmentList },
  { path: 'progress', component: ProgressTracker },

  // Notifications
  { path: 'notifications', component: NotificationList },

  // Profile
  { path: 'profile', component: ProfileView },
  { path: 'profile/edit', component: ProfileEdit },

  // Enrollment
  {path:'enrollment', component: EnrollmentList},

  // Certificate
   { path: 'certificates', component: Certificates },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
