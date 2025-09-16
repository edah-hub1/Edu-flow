// src/app/quizzes/quiz.model.ts
export interface Quiz {
  id?: number;
  title: string;
  moduleId: number;
  questions: Question[];
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}
