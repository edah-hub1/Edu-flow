import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap, catchError, of } from 'rxjs';
import { ModuleService } from '../module.service';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-list.html',
  styleUrls: ['./module-list.css']
})
export class ModuleList implements OnDestroy {
  modules: Module[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  courseId: number | null = null;
  openMenu: number | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadModules();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadModules(): void {
    this.loading = true;
    this.errorMessage = '';
    this.modules = [];

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = params.get('courseId');
        
        if (!id || isNaN(Number(id))) {
          this.loading = false;
          this.errorMessage = 'Invalid course ID';
          return of(null);
        }
        
        this.courseId = Number(id);
        return this.moduleService.getModulesByCourse(this.courseId).pipe(
          catchError(err => {
            console.error('Error loading modules:', err);
            this.errorMessage = this.getErrorMessage(err);
            this.loading = false;
            return of(null);
          })
        );
      })
    ).subscribe({
      next: (data) => {
        if (data === null) return;
        
        try {
          this.modules = this.normalizeModulesData(data);
          this.modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          console.log('Modules loaded:', this.modules);
        } catch (err) {
          console.error('Error processing modules data:', err);
          this.errorMessage = 'Failed to process modules data';
          this.modules = [];
        } finally {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Subscription error:', err);
        this.errorMessage = 'An unexpected error occurred';
        this.loading = false;
      }
    });
  }

  private normalizeModulesData(data: any): Module[] {
    if (!data) return [];
    
    if (Array.isArray(data)) {
      return this.validateModules(data);
    }
    
    if (data.modules && Array.isArray(data.modules)) {
      return this.validateModules(data.modules);
    }
    
    if (data.data && Array.isArray(data.data)) {
      return this.validateModules(data.data);
    }
    
    if (typeof data === 'object' && data.id) {
      return this.validateModules([data]);
    }
    
    return [];
  }

  private validateModules(modules: any[]): Module[] {
    return modules
      .filter(mod => mod && typeof mod === 'object' && mod.id)
      .map(mod => ({
        id: Number(mod.id),
        title: String(mod.title || 'Untitled Module'),
        description: String(mod.description || ''),
        order: Number(mod.order ?? 0),
        courseId: Number(mod.courseId || this.courseId)
      }));
  }

  private getErrorMessage(err: any): string {
    if (err.status === 404) {
      return 'Course not found';
    } else if (err.status === 403) {
      return 'You do not have permission to view these modules';
    } else if (err.status === 0) {
      return 'Unable to connect to server. Please check your connection.';
    } else if (err.error?.message) {
      return err.error.message;
    }
    return 'Failed to load modules. Please try again.';
  }

  editModule(moduleId: number): void {
    if (!this.courseId) return;
    this.router.navigate([`/courses/${this.courseId}/modules/${moduleId}/edit`]);
  }

  deleteModule(id: number): void {
    if (!this.courseId) return;
    
    if (!confirm('Are you sure you want to delete this module?')) return;

    this.loading = true;
    this.moduleService.deleteModule(this.courseId, id).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        console.error('Failed to delete module:', err);
        this.errorMessage = 'Could not delete module. Please try again.';
        this.loading = false;
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response !== null) {
          this.loadModules();
        }
      }
    });
  }

  goToCreate(): void {
    if (!this.courseId) return;
    this.router.navigate([`/courses/${this.courseId}/modules/create`]);
  }

  trackByModule(index: number, mod: Module): number {
    return mod.id;
  }
}