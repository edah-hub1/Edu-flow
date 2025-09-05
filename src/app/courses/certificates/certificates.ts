import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css']
})
export class Certificates {
  certificates: any[] = []; // later bind from backend
}

