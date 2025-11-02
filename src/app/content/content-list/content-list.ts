import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ContentService } from '../content.service';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content-list.html',
  styleUrls: ['./content-list.css'],
})
export class ContentList implements OnInit {
  private contentService = inject(ContentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  contents$!: Observable<Content[]>;
  loading = false;
  errorMessage = '';
  moduleId!: number;
  courseId!: string | number;
  selectedResource: Content | null = null;

  ngOnInit(): void {
    this.loadContentsReactive();
  }

  private loadContentsReactive(): void {
    this.contents$ = this.route.paramMap.pipe(
      map((params) => {
        this.courseId = params.get('courseId')!;
        this.moduleId = Number(params.get('moduleId'));
        return this.moduleId;
      }),
      tap(() => {
        this.loading = true;
        this.errorMessage = '';
      }),
      switchMap((moduleId: number) =>
        this.contentService.getContentsByModule(moduleId).pipe(
          map((data: any) => (Array.isArray(data) ? data : data?.data || [])),
          catchError((err) => {
            console.error('Error loading contents:', err);
            this.errorMessage = 'Failed to load contents. Please try again.';
            return of([] as Content[]);
          }),
          tap(() => (this.loading = false))
        )
      )
    );
  }

  openResourceModal(content: Content): void {
    this.selectedResource = content;
  }

  closeResourceModal(): void {
    this.selectedResource = null;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToCreate(): void {
    this.router.navigate([
      '/courses',
      this.courseId,
      'modules',
      this.moduleId,
      'contents',
      'create',
    ]);
  }

  trackById(index: number, item: Content) {
    return item.id;
  }

  /**
    Check if the URL is a YouTube video link
   */
  isYouTubeUrl(url?: string | null): boolean {
    if (!url) return false;
    return /youtube\.com\/watch\?v=|youtu\.be\//.test(url);
  }

  /**
    Convert a YouTube URL to an embeddable URL
   */
  getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const videoId = match ? match[1] : '';
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }
}
