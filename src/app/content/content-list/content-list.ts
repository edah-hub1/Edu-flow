
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ContentService } from '../content.service';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content-list.html',
  styleUrls: ['./content-list.css']
})
export class ContentList {
  contents$!: Observable<Content[]>;
  loading = false;
  errorMessage = '';
  moduleId!: number;
  courseId: any|string;

  constructor(private contentService: ContentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadContents();
  }

  loadContents(): void {
    this.loading = true;
    this.errorMessage = '';

    this.contents$ = this.route.paramMap.pipe(
      map(params => Number(params.get('moduleId'))),
      switchMap((id: number) => {
        this.moduleId = id;
        return this.contentService.getContentsByModule(id).pipe(
          catchError(err => {
            console.error('Error loading contents:', err);
            this.errorMessage = 'Failed to load contents. Please try again.';
            return of([]);
          }),
          startWith([])
        );
      })
    );

    this.contents$.subscribe(() => (this.loading = false));
  }
}
