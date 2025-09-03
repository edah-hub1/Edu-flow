import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/sidebar/sidebar';
// import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  templateUrl: './dashboard-layout.html',
  imports: [CommonModule, Sidebar],
})
export class DashboardLayout {}
