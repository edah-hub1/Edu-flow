export interface Content {
  id?: number;
  title: string;
  description: string;
  moduleId: number;
  type: string; // e.g. "PDF", "VIDEO", "ARTICLE"
  orderInModule: number;
  resourceUrl?: string;
  articleContent?: string;
  durationMinutes?: number | null;
  quizId?: number | null;
  mandatory: boolean | null;
}
