export interface Enrollment {
  id?: number;
  userId: number;
  courseId: number;
  enrolledAt?: string;
  progressPercentage?: number;
  completedAt?: string | null;
  status?: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
}
