# Initial migration - create all tables
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('username', sa.String(100), nullable=False),
        sa.Column('hashed_password', sa.String(255), nullable=False),
        sa.Column('full_name', sa.String(200), nullable=True),
        sa.Column('avatar_url', sa.String(500), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('is_superuser', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('current_day', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('current_phase', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('last_login_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    op.create_index('ix_users_username', 'users', ['username'], unique=True)

    # Curriculum phases
    op.create_table(
        'curriculum_phases',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('number', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_curriculum_phases_number', 'curriculum_phases', ['number'], unique=True)

    # Curriculum days
    op.create_table(
        'curriculum_days',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('number', sa.Integer(), nullable=False),
        sa.Column('phase_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('learning_objectives', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('prerequisites', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('estimated_study_time_minutes', sa.Integer(), nullable=False, server_default='60'),
        sa.Column('completion_criteria', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['phase_id'], ['curriculum_phases.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_curriculum_days_number', 'curriculum_days', ['number'], unique=True)
    op.create_index('ix_curriculum_days_phase_id', 'curriculum_days', ['phase_id'])

    # Curriculum topics
    op.create_table(
        'curriculum_topics',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('topic_id', sa.String(100), nullable=False),
        sa.Column('day_number', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('difficulty', sa.String(20), nullable=False, server_default='beginner'),
        sa.Column('learning_objectives', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('prerequisite_topic_ids', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('related_skills', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('mastery_criteria', sa.Text(), nullable=True),
        sa.Column('revision_criteria', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['day_number'], ['curriculum_days.number'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_curriculum_topics_topic_id', 'curriculum_topics', ['topic_id'], unique=True)
    op.create_index('ix_curriculum_topics_day_number', 'curriculum_topics', ['day_number'])

    # Curriculum lessons
    op.create_table(
        'curriculum_lessons',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('lesson_id', sa.String(100), nullable=False),
        sa.Column('topic_id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['topic_id'], ['curriculum_topics.topic_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_curriculum_lessons_lesson_id', 'curriculum_lessons', ['lesson_id'], unique=True)
    op.create_index('ix_curriculum_lessons_topic_id', 'curriculum_lessons', ['topic_id'])

    # Lesson blocks
    op.create_table(
        'lesson_blocks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('lesson_id', sa.Integer(), nullable=False),
        sa.Column('block_type', sa.String(50), nullable=False),
        sa.Column('content', postgresql.JSONB(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['lesson_id'], ['curriculum_lessons.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_lesson_blocks_lesson_order', 'lesson_blocks', ['lesson_id', 'order'])

    # User topic progress
    op.create_table(
        'user_topic_progress',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('topic_id', sa.String(100), nullable=False),
        sa.Column('mastery_state', sa.String(20), nullable=False, server_default='UNSEEN'),
        sa.Column('confidence', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('lesson_completed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('practice_completed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('assessment_passed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('last_studied_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['topic_id'], ['curriculum_topics.topic_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_user_topic_progress_user_topic', 'user_topic_progress', ['user_id', 'topic_id'], unique=True)

    # User lesson progress
    op.create_table(
        'user_lesson_progress',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('lesson_id', sa.String(100), nullable=False),
        sa.Column('completed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('time_spent_seconds', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['lesson_id'], ['curriculum_lessons.lesson_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_user_lesson_progress_user_lesson', 'user_lesson_progress', ['user_id', 'lesson_id'], unique=True)

    # Exercises
    op.create_table(
        'exercises',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('exercise_id', sa.String(100), nullable=False),
        sa.Column('topic_id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('difficulty', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('question_type', sa.String(50), nullable=False),
        sa.Column('question_data', postgresql.JSONB(), nullable=False),
        sa.Column('correct_answer', postgresql.JSONB(), nullable=False),
        sa.Column('hints', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('explanation', sa.Text(), nullable=True),
        sa.Column('mistake_categories', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['topic_id'], ['curriculum_topics.topic_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_exercises_exercise_id', 'exercises', ['exercise_id'], unique=True)
    op.create_index('ix_exercises_topic_id', 'exercises', ['topic_id'])

    # Exercise attempts
    op.create_table(
        'exercise_attempts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('exercise_id', sa.String(100), nullable=False),
        sa.Column('answer', postgresql.JSONB(), nullable=False),
        sa.Column('is_correct', sa.Boolean(), nullable=False),
        sa.Column('mistake_category', sa.String(50), nullable=True),
        sa.Column('hint_level', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('time_spent_seconds', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['exercise_id'], ['exercises.exercise_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_exercise_attempts_user_exercise', 'exercise_attempts', ['user_id', 'exercise_id'])

    # Coding problems
    op.create_table(
        'coding_problems',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('problem_id', sa.String(100), nullable=False),
        sa.Column('topic_id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('difficulty', sa.String(20), nullable=False),
        sa.Column('starter_code', sa.Text(), nullable=True),
        sa.Column('solution_code', sa.Text(), nullable=True),
        sa.Column('constraints', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('examples', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('hints', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['topic_id'], ['curriculum_topics.topic_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_coding_problems_problem_id', 'coding_problems', ['problem_id'], unique=True)
    op.create_index('ix_coding_problems_topic_id', 'coding_problems', ['topic_id'])

    # Test cases
    op.create_table(
        'test_cases',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('problem_id', sa.String(100), nullable=False),
        sa.Column('input_data', postgresql.JSONB(), nullable=False),
        sa.Column('expected_output', postgresql.JSONB(), nullable=False),
        sa.Column('is_hidden', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['problem_id'], ['coding_problems.problem_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_test_cases_problem_id', 'test_cases', ['problem_id'])

    # Coding attempts
    op.create_table(
        'coding_attempts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('problem_id', sa.String(100), nullable=False),
        sa.Column('code', sa.Text(), nullable=False),
        sa.Column('language', sa.String(20), nullable=False, server_default='python'),
        sa.Column('status', sa.String(20), nullable=False),
        sa.Column('test_results', postgresql.JSONB(), nullable=False),
        sa.Column('execution_time_ms', sa.Integer(), nullable=True),
        sa.Column('memory_used_mb', sa.Integer(), nullable=True),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['problem_id'], ['coding_problems.problem_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_coding_attempts_user_problem', 'coding_attempts', ['user_id', 'problem_id'])

    # Assessments
    op.create_table(
        'assessments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('assessment_id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('assessment_type', sa.String(50), nullable=False),
        sa.Column('phase_id', sa.Integer(), nullable=True),
        sa.Column('topic_ids', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('time_limit_minutes', sa.Integer(), nullable=True),
        sa.Column('passing_score', sa.Float(), nullable=False, server_default='70.0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['phase_id'], ['curriculum_phases.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_assessments_assessment_id', 'assessments', ['assessment_id'], unique=True)

    # Questions
    op.create_table(
        'questions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('assessment_id', sa.String(100), nullable=False),
        sa.Column('question_id', sa.String(100), nullable=False),
        sa.Column('question_type', sa.String(50), nullable=False),
        sa.Column('question_data', postgresql.JSONB(), nullable=False),
        sa.Column('correct_answer', postgresql.JSONB(), nullable=False),
        sa.Column('explanation', sa.Text(), nullable=True),
        sa.Column('points', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['assessment_id'], ['assessments.assessment_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_questions_assessment_id', 'questions', ['assessment_id'])

    # Assessment attempts
    op.create_table(
        'assessment_attempts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('assessment_id', sa.String(100), nullable=False),
        sa.Column('answers', postgresql.JSONB(), nullable=False),
        sa.Column('score', sa.Float(), nullable=False),
        sa.Column('passed', sa.Boolean(), nullable=False),
        sa.Column('dimension_scores', postgresql.JSONB(), nullable=False, server_default='{}'),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['assessment_id'], ['assessments.assessment_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_assessment_attempts_user_assessment', 'assessment_attempts', ['user_id', 'assessment_id'])

    # Revision items
    op.create_table(
        'revision_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('topic_id', sa.String(100), nullable=False),
        sa.Column('revision_type', sa.String(50), nullable=False),
        sa.Column('priority', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('due_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('source', sa.String(50), nullable=True),
        sa.Column('metadata', postgresql.JSONB(), nullable=False, server_default='{}'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['topic_id'], ['curriculum_topics.topic_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_revision_items_user_due', 'revision_items', ['user_id', 'due_at'])

    # Projects
    op.create_table(
        'projects',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('project_id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('phase_id', sa.Integer(), nullable=True),
        sa.Column('prerequisites', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('dataset_references', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('milestones', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('validation_rules', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('evaluation_criteria', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('hints', postgresql.JSONB(), nullable=False, server_default='[]'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['phase_id'], ['curriculum_phases.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_projects_project_id', 'projects', ['project_id'], unique=True)

    # Project progress
    op.create_table(
        'project_progress',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('project_id', sa.String(100), nullable=False),
        sa.Column('status', sa.String(20), nullable=False, server_default='NOT_STARTED'),
        sa.Column('current_milestone', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('milestone_progress', postgresql.JSONB(), nullable=False, server_default='{}'),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['project_id'], ['projects.project_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_project_progress_user_project', 'project_progress', ['user_id', 'project_id'], unique=True)

    # Learning events
    op.create_table(
        'learning_events',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('event_type', sa.String(50), nullable=False),
        sa.Column('entity_type', sa.String(50), nullable=False),
        sa.Column('entity_id', sa.String(100), nullable=False),
        sa.Column('metadata', postgresql.JSONB(), nullable=False, server_default='{}'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_learning_events_user_created', 'learning_events', ['user_id', 'created_at'])


def downgrade() -> None:
    op.drop_index('ix_learning_events_user_created', table_name='learning_events')
    op.drop_table('learning_events')

    op.drop_index('ix_project_progress_user_project', table_name='project_progress')
    op.drop_table('project_progress')

    op.drop_index('ix_projects_project_id', table_name='projects')
    op.drop_table('projects')

    op.drop_index('ix_revision_items_user_due', table_name='revision_items')
    op.drop_table('revision_items')

    op.drop_index('ix_assessment_attempts_user_assessment', table_name='assessment_attempts')
    op.drop_table('assessment_attempts')

    op.drop_index('ix_questions_assessment_id', table_name='questions')
    op.drop_table('questions')

    op.drop_index('ix_assessments_assessment_id', table_name='assessments')
    op.drop_table('assessments')

    op.drop_index('ix_coding_attempts_user_problem', table_name='coding_attempts')
    op.drop_table('coding_attempts')

    op.drop_index('ix_test_cases_problem_id', table_name='test_cases')
    op.drop_table('test_cases')

    op.drop_index('ix_coding_problems_topic_id', table_name='coding_problems')
    op.drop_index('ix_coding_problems_problem_id', table_name='coding_problems')
    op.drop_table('coding_problems')

    op.drop_index('ix_exercise_attempts_user_exercise', table_name='exercise_attempts')
    op.drop_table('exercise_attempts')

    op.drop_index('ix_exercises_topic_id', table_name='exercises')
    op.drop_index('ix_exercises_exercise_id', table_name='exercises')
    op.drop_table('exercises')

    op.drop_index('ix_user_lesson_progress_user_lesson', table_name='user_lesson_progress')
    op.drop_table('user_lesson_progress')

    op.drop_index('ix_user_topic_progress_user_topic', table_name='user_topic_progress')
    op.drop_table('user_topic_progress')

    op.drop_index('ix_lesson_blocks_lesson_order', table_name='lesson_blocks')
    op.drop_table('lesson_blocks')

    op.drop_index('ix_curriculum_lessons_topic_id', table_name='curriculum_lessons')
    op.drop_index('ix_curriculum_lessons_lesson_id', table_name='curriculum_lessons')
    op.drop_table('curriculum_lessons')

    op.drop_index('ix_curriculum_topics_day_number', table_name='curriculum_topics')
    op.drop_index('ix_curriculum_topics_topic_id', table_name='curriculum_topics')
    op.drop_table('curriculum_topics')

    op.drop_index('ix_curriculum_days_phase_id', table_name='curriculum_days')
    op.drop_index('ix_curriculum_days_number', table_name='curriculum_days')
    op.drop_table('curriculum_days')

    op.drop_index('ix_curriculum_phases_number', table_name='curriculum_phases')
    op.drop_table('curriculum_phases')

    op.drop_index('ix_users_username', table_name='users')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')
