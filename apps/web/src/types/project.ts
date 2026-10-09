export interface Project {
  id: number;
  project_id: string;
  title: string;
  description: string;
  phase_id: number | null;
  prerequisites: string[];
  dataset_references: string[];
  milestones: ProjectMilestone[];
  validation_rules: string[];
  evaluation_criteria: string[];
  hints: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectMilestone {
  milestone_id: string;
  title: string;
  description: string;
  tasks: string[];
  validation: string[];
}

export interface ProjectProgress {
  id: number;
  user_id: number;
  project_id: string;
  status: string;
  current_milestone: number;
  milestone_progress: Record<string, unknown>;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}
