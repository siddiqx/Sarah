export interface RevisionItem {
  id: number;
  user_id: number;
  topic_id: string;
  revision_type: string;
  priority: number;
  due_at: string;
  completed_at: string | null;
  source: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface LearningEvent {
  id: number;
  user_id: number;
  event_type: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}
