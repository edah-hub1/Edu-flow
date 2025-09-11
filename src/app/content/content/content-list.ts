import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-list',
  standalone: true,
  templateUrl: './content-list.html',
  styleUrls: ['./content-list.css'],
  imports: [CommonModule, RouterLink],
})
export class ContentList {
  contents = [
    { id: 1, title: 'This is title for Content', type: 'PDF' },
    { id: 2, title: 'Another Content Example', type: 'VIDEO' },
  ];
}
