import { Component, OnInit } from '@angular/core';
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
export class ContentList implements OnInit {
  contents: Content[] = [];
  loading = false;
  errorMessage = '';
  moduleId!: number;
  courseId!: number | string;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.route.paramMap
      .pipe(
        map(params => {
          this.courseId = params.get('courseId')!;
          this.moduleId = Number(params.get('moduleId'));
          return this.moduleId;
        }),
        switchMap((id: number) =>
          this.contentService.getContentsByModule(id).pipe(
            catchError(err => {
              console.error('Error loading contents:', err);
              this.errorMessage = 'Failed to load contents. Please try again.';
              return of([]);
            }),
            startWith([])
          )
        )
      )
      .subscribe((contents: Content[]) => {
        this.contents = contents;
        this.loading = false;
      });
  }

  addQuizContent() {
    const newQuiz: Partial<Content> = {
      title: 'New Quiz',
      description: 'Description for new quiz',
      moduleId: this.moduleId,
      type: 'QUIZ',
      orderInModule: this.contents.length + 1,
      resourceUrl: '',
      articleContent: '',
      durationMinutes: null,
      quizId: null,
      mandatory: false
    };

    this.contentService.createContent(newQuiz as Content).subscribe({
      next: (savedQuiz: Content) => {
        this.contents.push(savedQuiz);
      },
      error: err => {
        console.error('Failed to create quiz content:', err);
        this.errorMessage = err?.error?.message || 'Failed to create quiz';
      }
    });
  }

  // ✅ Helper: check if this quiz already exists
  hasQuiz(c: Content): boolean {
    return !!c.quizId;
  }
}
