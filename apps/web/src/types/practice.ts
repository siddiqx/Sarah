export interface Exercise {
  id: number;
  exercise_id: string;
  topic_id: string;
  title: string;
  description: string | null;
  difficulty: number;
  question_type: string;
  question_data: Record<string, unknown>;
  correct_answer: Record<string, unknown>;
  hints: string[];
  explanation: string | null;
  mistake_categories: string[];
  created_at: string;
  updated_at: string;
}

export interface ExerciseAttempt {
  id: number;
  user_id: number;
  exercise_id: string;
  answer: Record<string, unknown>;
  is_correct: boolean;
  mistake_category: string | null;
  hint_level: number;
  time_spent_seconds: number;
  created_at: string;
}
