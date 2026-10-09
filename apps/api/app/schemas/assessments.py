from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class QuestionType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    MULTIPLE_SELECT = "multiple_select"
    SHORT_ANSWER = "short_answer"
    OUTPUT_PREDICTION = "output_prediction"
    CODE_COMPLETION = "code_completion"
    DEBUGGING = "debugging"
    ORDERING = "ordering"
    CODING_PROBLEM = "coding_problem"
    PRACTICAL_DATA_TASK = "practical_data_task"


class AssessmentType(str, Enum):
    MICRO_QUIZ = "micro_quiz"
    LESSON_QUIZ = "lesson_quiz"
    TOPIC_QUIZ = "topic_quiz"
    MIXED_REVISION_QUIZ = "mixed_revision_quiz"
    WEAKNESS_FOCUSED_QUIZ = "weakness_focused_quiz"
    WEEKLY_ASSESSMENT = "weekly_assessment"
    PHASE_ASSESSMENT = "phase_assessment"
    PRACTICAL_CODING_EXAM = "practical_coding_exam"
    MOCK_EXAM = "mock_exam"
    FINAL_ASSESSMENT = "final_assessment"


class QuestionBase(BaseModel):
    question_id: str = Field(..., min_length=1, max_length=100)
    assessment_id: str = Field(..., min_length=1, max_length=100)
    question_type: QuestionType
    prompt: str
    options: Optional[list[dict]] = None
    correct_answer: dict
    explanation: Optional[str] = None
    topic_ids: list[str] = Field(default_factory=list)
    difficulty: int = Field(default=1, ge=1, le=5)
    order: int = Field(default=0, ge=0)
    points: int = Field(default=1, ge=1)


class QuestionCreate(QuestionBase):
    pass


class QuestionResponse(QuestionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class AssessmentBase(BaseModel):
    assessment_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    assessment_type: AssessmentType
    topic_ids: list[str] = Field(default_factory=list)
    time_limit_minutes: Optional[int] = Field(None, ge=1)
    passing_score: float = Field(default=0.7, ge=0.0, le=1.0)
    questions: list[QuestionCreate] = Field(default_factory=list)


class AssessmentCreate(AssessmentBase):
    pass


class AssessmentUpdate(AssessmentBase):
    assessment_id: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class AssessmentResponse(AssessmentBase):
    id: int
    questions: list[QuestionResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AssessmentAttemptBase(BaseModel):
    assessment_id: str
    answers: list[dict]
    score: float = Field(..., ge=0.0, le=1.0)
    passed: bool
    time_spent_seconds: int = Field(default=0, ge=0)
    dimension_scores: Optional[dict] = None


class AssessmentAttemptCreate(AssessmentAttemptBase):
    pass


class AssessmentAttemptResponse(AssessmentAttemptBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
