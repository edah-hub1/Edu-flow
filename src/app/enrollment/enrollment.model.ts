export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  progressPercentage: number;
  completed: boolean;
  status: string;
}
