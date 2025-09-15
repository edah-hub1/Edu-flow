export interface Content {
  id?: number;
  title: string;
  description: string;
  type: 'VIDEO' | 'PDF' | 'ARTICLE' | 'QUIZ'; // enum-like
  orderInModule: number;
  resourceUrl?: string;
  articleContent?: string;
  durationMinutes?: number | null;
  quizId?: number | null;
  moduleId: number;
  mandatory?: boolean | null;
}

