export interface Assessment {
  id: number;
  assessment_id: string;
  title: string;
  description: string | null;
  assessment_type: string;
  phase_id: number | null;
  topic_ids: string[];
  time_limit_minutes: number | null;
  passing_score: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  assessment_id: string;
  question_id: string;
  question_type: string;
  question_data: Record<string, unknown>;
  correct_answer: Record<string, unknown>;
  explanation: string | null;
  points: number;
  order: number;
  created_at: string;
}

export interface AssessmentAttempt {
  id: number;
  user_id: number;
  assessment_id: string;
  answers: Record<string, unknown>;
  score: number;
  passed: boolean;
  dimension_scores: Record<string, number>;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}
