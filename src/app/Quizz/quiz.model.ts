// export interface Quiz {
//   id?: number;
//   title: string;
//   instructions: string;
//   contentId: number;

//   timeLimitMinutes?: number | null;
//   maximumAttempts?: number;
//   passPercentage?: number;
//   randomizeQuestions?: boolean;
//   showResultsImmediately?: boolean;
//   published?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
//   publishedAt?: string | null;
// }

// export interface Quiz {
//   id?: number;
//   title: string;
//   moduleId: number;
//   questions: Question[];
// }

// export interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number; // index of the correct option
// }


export interface OptionRequest {
  optionText: string;
  correct: boolean;
  orderInQuestion?: number;
}

export interface QuestionRequest {
  questionText: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  orderInQuiz?: number;
  points?: number;
  explanation?: string;
  optionRequest: OptionRequest[];
}

export interface QuizRequest {
  contentId: number;
  instructions?: string;
  timeLimitMinutes?: number | null;
  maximumAttempts?: number | null;
  passPercentage?: number | null;
  randomizeQuestions?: boolean;
  showResultsImmediately?: boolean;
  published?: boolean;
}

export interface FullQuizPayload {
  quizRequest: QuizRequest;
  questionRequest: QuestionRequest[];
}
