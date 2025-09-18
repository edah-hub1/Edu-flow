export interface Quiz {
  id?: number;
  title: string;
  instructions: string;
  contentId: number;

  timeLimitMinutes?: number | null;
  maximumAttempts?: number;
  passPercentage?: number;
  randomizeQuestions?: boolean;
  showResultsImmediately?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

// export interface Quiz {
//   id?: number;
//   title: string;
//   moduleId: number;
//   questions: Question[];
// }

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}
