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
