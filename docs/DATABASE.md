# Database Documentation

## Schema Overview

Sarah uses PostgreSQL 16 with a normalized relational schema managed by SQLAlchemy and Alembic.

## Entity Relationship Diagram

```
users ────────────────┬──────────────────┬──────────────────┬─────────────────┐
      │               │                  │                  │                 │
      ▼               ▼                  ▼                  ▼                 ▼
user_topic_progress user_lesson_progress exercise_attempts coding_attempts assessment_attempts
      │               │                  │                  │                 │
      └───────────────┴──────────────────┴────────────────┴─────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   curriculum_*      │
                    │   (phases, days,    │
                    │   topics, lessons,  │
                    │   blocks)           │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │ exercises,          │
                    │ coding_problems,    │
                    │ test_cases,         │
                    │ assessments,        │
                    │ questions           │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │ revision_items,     │
                    │ projects,           │
                    │ project_milestones, │
                    │ project_progress,   │
                    │ learning_events     │
                    └─────────────────────┘
```

## Core Tables

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| email | VARCHAR(255) | UNIQUE, NOT NULL, INDEX |
| username | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| hashed_password | VARCHAR(255) | NOT NULL |
| full_name | VARCHAR(200) | NULLABLE |
| avatar_url | VARCHAR(500) | NULLABLE |
| is_active | BOOLEAN | DEFAULT true |
| is_superuser | BOOLEAN | DEFAULT false |
| current_day | INTEGER | DEFAULT 1 |
| current_phase | INTEGER | DEFAULT 1 |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |
| last_login_at | TIMESTAMPTZ | NULLABLE |

### curriculum_phases
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| number | INTEGER | UNIQUE, NOT NULL, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| order | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### curriculum_days
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| number | INTEGER | UNIQUE, NOT NULL, INDEX (1-250) |
| phase_id | INTEGER | FK → curriculum_phases.id, INDEX |
| title | VARCHAR(200) | NOT NULL |
| summary | TEXT | NULLABLE |
| learning_objectives | JSON | DEFAULT [] |
| prerequisites | JSON | DEFAULT [] |
| estimated_study_time_minutes | INTEGER | DEFAULT 60 |
| completion_criteria | TEXT | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### curriculum_topics
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| topic_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| day_number | INTEGER | FK → curriculum_days.number, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| difficulty | VARCHAR(20) | DEFAULT "beginner" |
| learning_objectives | JSON | DEFAULT [] |
| prerequisite_topic_ids | JSON | DEFAULT [] |
| related_skills | JSON | DEFAULT [] |
| mastery_criteria | TEXT | NULLABLE |
| revision_criteria | TEXT | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### curriculum_lessons
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| lesson_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| topic_id | VARCHAR(100) | FK → curriculum_topics.topic_id, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### lesson_blocks
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| lesson_id | INTEGER | FK → curriculum_lessons.id, INDEX |
| block_type | VARCHAR(50) | NOT NULL |
| content | JSON | NOT NULL |
| order | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMPTZ | DEFAULT now() |

**Index**: (lesson_id, order)

### user_topic_progress
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| topic_id | VARCHAR(100) | FK → curriculum_topics.topic_id, INDEX |
| status | ENUM | DEFAULT "unseen" |
| confidence_score | FLOAT | DEFAULT 0.0 |
| lesson_completed | BOOLEAN | DEFAULT false |
| guided_practice_completed | BOOLEAN | DEFAULT false |
| independent_practice_completed | BOOLEAN | DEFAULT false |
| assessment_passed | BOOLEAN | DEFAULT false |
| last_revised_at | TIMESTAMPTZ | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

**Unique Index**: (user_id, topic_id)

### user_lesson_progress
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| lesson_id | INTEGER | FK → curriculum_lessons.id, INDEX |
| status | ENUM | DEFAULT "not_started" |
| current_block_index | INTEGER | DEFAULT 0 |
| time_spent_seconds | INTEGER | DEFAULT 0 |
| completed_at | TIMESTAMPTZ | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

**Unique Index**: (user_id, lesson_id)

### exercises
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| exercise_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| topic_id | VARCHAR(100) | FK → curriculum_topics.topic_id, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| exercise_type | VARCHAR(50) | NOT NULL |
| difficulty | VARCHAR(20) | NOT NULL |
| content | JSON | NOT NULL |
| hints | JSON | DEFAULT [] |
| solution | JSON | NULLABLE |
| prerequisites | JSON | DEFAULT [] |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### exercise_attempts
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| exercise_id | INTEGER | FK → exercises.id, INDEX |
| user_answer | JSON | NOT NULL |
| is_correct | INTEGER | DEFAULT 0 |
| time_spent_seconds | INTEGER | DEFAULT 0 |
| hints_used | INTEGER | DEFAULT 0 |
| mistake_categories | JSON | DEFAULT [] |
| created_at | TIMESTAMPTZ | DEFAULT now() |

**Index**: (user_id, exercise_id)

### coding_problems
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| problem_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NOT NULL |
| difficulty | VARCHAR(20) | NOT NULL |
| instructions | TEXT | NOT NULL |
| examples | JSON | DEFAULT [] |
| constraints | TEXT | NULLABLE |
| starter_code | TEXT | NULLABLE |
| solution_code | TEXT | NULLABLE |
| topic_ids | JSON | DEFAULT [] |
| time_limit_seconds | INTEGER | DEFAULT 30 |
| memory_limit_mb | INTEGER | DEFAULT 256 |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### test_cases
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| problem_id | INTEGER | FK → coding_problems.id, INDEX |
| test_case_id | VARCHAR(100) | NOT NULL |
| input_data | JSON | NOT NULL |
| expected_output | JSON | NOT NULL |
| test_type | VARCHAR(20) | DEFAULT "visible" |
| description | TEXT | NULLABLE |
| order | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMPTZ | DEFAULT now() |

### coding_attempts
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| problem_id | INTEGER | FK → coding_problems.id, INDEX |
| code | TEXT | NOT NULL |
| language | VARCHAR(20) | DEFAULT "python" |
| status | VARCHAR(20) | NOT NULL |
| test_results | JSON | DEFAULT [] |
| total_tests | INTEGER | DEFAULT 0 |
| passed_tests | INTEGER | DEFAULT 0 |
| execution_time_ms | INTEGER | DEFAULT 0 |
| memory_used_mb | INTEGER | NULLABLE |
| error_message | TEXT | NULLABLE |
| is_submission | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMPTZ | DEFAULT now() |

**Index**: (user_id, problem_id)

### assessments
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| assessment_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| assessment_type | VARCHAR(50) | NOT NULL |
| topic_ids | JSON | DEFAULT [] |
| time_limit_minutes | INTEGER | NULLABLE |
| passing_score | FLOAT | DEFAULT 0.7 |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### questions
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| assessment_id | INTEGER | FK → assessments.id, INDEX |
| question_id | VARCHAR(100) | NOT NULL |
| question_type | VARCHAR(50) | NOT NULL |
| prompt | TEXT | NOT NULL |
| options | JSON | NULLABLE |
| correct_answer | JSON | NOT NULL |
| explanation | TEXT | NULLABLE |
| topic_ids | JSON | DEFAULT [] |
| difficulty | INTEGER | DEFAULT 1 |
| order | INTEGER | DEFAULT 0 |
| points | INTEGER | DEFAULT 1 |
| created_at | TIMESTAMPTZ | DEFAULT now() |

### assessment_attempts
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| assessment_id | INTEGER | FK → assessments.id, INDEX |
| answers | JSON | NOT NULL |
| score | FLOAT | NOT NULL |
| passed | INTEGER | DEFAULT 0 |
| time_spent_seconds | INTEGER | DEFAULT 0 |
| dimension_scores | JSON | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |

**Index**: (user_id, assessment_id)

### revision_items
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| item_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| user_id | INTEGER | FK → users.id, INDEX |
| topic_id | VARCHAR(100) | FK → curriculum_topics.topic_id, INDEX |
| revision_type | VARCHAR(50) | NOT NULL |
| priority | VARCHAR(20) | DEFAULT "medium" |
| content | JSON | NOT NULL |
| scheduled_for | TIMESTAMPTZ | NOT NULL, INDEX |
| due_date | TIMESTAMPTZ | NOT NULL, INDEX |
| completed | INTEGER | DEFAULT 0 |
| completed_at | TIMESTAMPTZ | NULLABLE |
| score | FLOAT | NULLABLE |
| source | VARCHAR(50) | DEFAULT "scheduled" |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

**Indexes**: (user_id, due_date), (user_id, completed)

### projects
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| project_id | VARCHAR(100) | UNIQUE, NOT NULL, INDEX |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| objective | TEXT | NOT NULL |
| requirements | JSON | DEFAULT [] |
| constraints | JSON | DEFAULT [] |
| prerequisites | JSON | DEFAULT [] |
| dataset_ids | JSON | DEFAULT [] |
| setup_instructions | TEXT | NULLABLE |
| hints | JSON | DEFAULT [] |
| completion_criteria | TEXT | NULLABLE |
| evaluation_criteria | TEXT | NULLABLE |
| day_range | VARCHAR(50) | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### project_milestones
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| project_id | INTEGER | FK → projects.id, INDEX |
| milestone_id | VARCHAR(100) | NOT NULL |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| order | INTEGER | DEFAULT 0 |
| required_topic_ids | JSON | DEFAULT [] |
| validation_rules | JSON | DEFAULT [] |
| created_at | TIMESTAMPTZ | DEFAULT now() |

### project_progress
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| project_id | INTEGER | FK → projects.id, INDEX |
| status | VARCHAR(20) | DEFAULT "not_started" |
| current_milestone_id | VARCHAR(100) | NULLABLE |
| completed_milestones | JSON | DEFAULT [] |
| progress_percentage | FLOAT | DEFAULT 0.0 |
| started_at | TIMESTAMPTZ | NULLABLE |
| completed_at | TIMESTAMPTZ | NULLABLE |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

**Unique Index**: (user_id, project_id)

### learning_events
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PK, autoincrement |
| user_id | INTEGER | FK → users.id, INDEX |
| event_type | VARCHAR(50) | NOT NULL, INDEX |
| entity_type | VARCHAR(50) | NULLABLE |
| entity_id | VARCHAR(100) | NULLABLE, INDEX |
| topic_id | VARCHAR(100) | NULLABLE, INDEX |
| data | JSON | DEFAULT {} |
| created_at | TIMESTAMPTZ | DEFAULT now(), INDEX |

**Indexes**: (user_id, created_at), (event_type, created_at)

## Migrations

Managed by Alembic in `apps/api/migrations/`.

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1

# Show history
alembic history
```

## Seed Data

Located in `database/seeds/` - run with custom scripts.
