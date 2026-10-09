export interface CurriculumPhase {
  id: number;
  number: number;
  title: string;
  description: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CurriculumDay {
  id: number;
  number: number;
  phase_id: number;
  title: string;
  summary: string | null;
  learning_objectives: string[];
  prerequisites: string[];
  estimated_study_time_minutes: number;
  completion_criteria: string | null;
  created_at: string;
  updated_at: string;
}

export interface CurriculumTopic {
  id: number;
  topic_id: string;
  day_number: number;
  title: string;
  description: string | null;
  difficulty: string;
  learning_objectives: string[];
  prerequisite_topic_ids: string[];
  related_skills: string[];
  mastery_criteria: string | null;
  revision_criteria: string | null;
  created_at: string;
  updated_at: string;
}

export interface CurriculumLesson {
  id: number;
  lesson_id: string;
  topic_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  blocks?: LessonBlock[];
}

export interface LessonBlock {
  id: number;
  lesson_id: number;
  block_type: string;
  content: Record<string, unknown>;
  order: number;
  created_at: string;
}
