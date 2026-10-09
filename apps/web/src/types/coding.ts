export interface CodingProblem {
  id: number;
  problem_id: string;
  topic_id: string;
  title: string;
  description: string;
  difficulty: string;
  starter_code: string | null;
  solution_code: string | null;
  constraints: string[];
  examples: { input: unknown; output: unknown; explanation?: string }[];
  hints: string[];
  created_at: string;
  updated_at: string;
  test_cases?: TestCase[];
}

export interface TestCase {
  id: number;
  problem_id: string;
  input_data: Record<string, unknown>;
  expected_output: Record<string, unknown>;
  is_hidden: boolean;
  order: number;
  created_at: string;
}

export interface CodingAttempt {
  id: number;
  user_id: number;
  problem_id: string;
  code: string;
  language: string;
  status: string;
  test_results: Record<string, unknown>;
  execution_time_ms: number | null;
  memory_used_mb: number | null;
  error_message: string | null;
  created_at: string;
}
