import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DashboardLayout } from '../dashboard-layout/dashboard-layout';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-admin-dashboard',
  imports: [DashboardLayout,CommonModule],
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  adminName = 'Super Admin';
  totalUsers = 256;
  totalCourses = 48;
  activeInstructors = 12;

  // User Growth Line Chart
  userGrowthData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Users',
        data: [50, 80, 120, 160, 200, 256],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  // Course Distribution Pie Chart
  courseDistributionData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Technology', 'Business', 'Design', 'Science'],
    datasets: [
      {
        data: [20, 12, 8, 8],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }
    ]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  // Recent Users Table
  recentUsers = [
    { name: 'John Doe', role: 'Instructor', status: 'Active' },
    { name: 'Jane Smith', role: 'Student', status: 'Active' },
    { name: 'Alex Kim', role: 'Student', status: 'Inactive' }
  ];

  // Notifications
  notifications = [
    { message: '3 new courses pending approval', time: '5 min ago' },
    { message: 'System backup completed', time: '2 hrs ago' },
    { message: 'New instructor registration', time: '1 day ago' }
  ];
}
