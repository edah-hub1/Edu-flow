import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ModuleService } from '../module.service';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-list.html',
  styleUrls: ['./module-list.css']
})
export class ModuleList {
  modules$!: Observable<Module[]>;
  loading: boolean = false;
  errorMessage: string = '';
  courseId!: number;

  constructor(
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.loading = true;
    this.errorMessage = '';

    this.modules$ = this.route.paramMap.pipe(
      map(params => Number(params.get('courseId'))),
      switchMap((id: number) => {
        this.courseId = id;
        return this.moduleService.getModulesByCourse(id).pipe(
          map((data: any) => {
            if (Array.isArray(data)) {
              return data;
            } else if (data && typeof data === 'object' && data.hasOwnProperty('modules')) {
              return data.modules || [];
            } else if (data && typeof data === 'object' && data.hasOwnProperty('data')) {
              return data.data || [];
            } else {
              return data ? [data] : [];
            }
          }),
          catchError(err => {
            console.error('Error loading modules:', err);
            this.errorMessage = 'Failed to load modules. Please try again.';
            return of([]);
          }),
          startWith([]) // let UI render an initial value
        );
      })
    );

    this.modules$.subscribe(() => {
      this.loading = false;
    });
  }

  goToCreate(): void {
    this.router.navigate([`/courses/${this.courseId}/modules/create`]);
  }

  trackByModule(index: number, mod: Module): any {
    return mod.id;
  }
}


