import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ModuleService } from '../module.service';
import { Module } from '../module.model';
import { CourseService } from '../../courses/course.service';
import { Course } from '../../courses/course.model';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-list.html',
  styleUrls: ['./module-list.css']
})
export class ModuleList {
  modules$!: Observable<Module[]>;
  loading = false;
  errorMessage = '';
  courseId!: number;
  courseTitle = ''; //  store course title
  openMenuId: number | null = null;

  constructor(
    private moduleService: ModuleService,
    private courseService: CourseService, // inject CourseService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadModules();
  }

  /** Load modules and also fetch course title */
  loadModules(): void {
    this.loading = true;

    this.modules$ = this.route.paramMap.pipe(
      map(params => Number(params.get('courseId'))),
      tap((id) => {
        this.courseId = id;
        this.fetchCourseTitle(id); // fetch course title in parallel
      }),
      switchMap((id: number) => 
        this.moduleService.getModulesByCourse(id).pipe(
          map((data: any) => {
            if (Array.isArray(data)) return data;
            if (data?.modules) return data.modules;
            if (data?.data) return data.data;
            if (data && typeof data === 'object') return [data];
            return [];
          }),
          catchError(err => {
            console.error('Error loading modules:', err);
            this.errorMessage = 'Failed to load modules. Please try again.';
            return of([]);
          }),
          startWith([])
        )
      )
    );

    this.modules$.subscribe(() => {
      this.loading = false;
    });
  }

  /** ✅ Fetch course title for heading */
  private fetchCourseTitle(courseId: number): void {
    this.courseService.getCourse(courseId).pipe(
      tap((course: Course) => {
        this.courseTitle = course.title || `Course ${courseId}`;
      }),
      catchError(err => {
        console.error('Failed to fetch course title:', err);
        this.courseTitle = `Course ${courseId}`;
        return of(null);
      })
    ).subscribe();
  }

  toggleMenu(id: number): void {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  viewContents(moduleId: number): void {
    console.log('View contents for module:', moduleId);
    this.router.navigate([`/courses/${this.courseId}/modules/${moduleId}/contents`]);
  }

  editModule(moduleId: number): void {
    console.log('Editing module:', moduleId);
    this.router.navigate([`/courses/${this.courseId}/modules/${moduleId}/edit`]);
  }

  deleteModule(moduleId: number): void {
    if (!confirm('Are you sure you want to delete this module?')) return;

    console.log('Deleting module:', moduleId);
    this.moduleService.deleteModule(this.courseId, moduleId).subscribe({
      next: () => {
        console.log('Module deleted successfully');
        this.loadModules();
      },
      error: (err) => {
        console.error('Failed to delete module:', err);
        this.errorMessage = 'Could not delete module.';
      }
    });
  }

  goToCreate(): void {
    console.log('Navigating to create module page');
    this.router.navigate([`/courses/${this.courseId}/modules/create`]);
  }

  trackByModule(index: number, mod: Module): any {
    return mod.id;
  }
}
