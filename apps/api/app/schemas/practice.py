from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime
from enum import Enum


class ExerciseType(str, Enum):
    RECOGNITION = "recognition"
    PREDICTION = "prediction"
    COMPLETION = "completion"
    GUIDED_CONSTRUCTION = "guided_construction"
    INDEPENDENT_PROBLEM = "independent_problem"
    VARIATION = "variation"
    COMBINED_CONCEPTS = "combined_concepts"
    PRACTICAL_APPLICATION = "practical_application"


class ExerciseDifficulty(str, Enum):
    LEVEL_1 = "level_1"
    LEVEL_2 = "level_2"
    LEVEL_3 = "level_3"
    LEVEL_4 = "level_4"
    LEVEL_5 = "level_5"
    LEVEL_6 = "level_6"
    LEVEL_7 = "level_7"
    LEVEL_8 = "level_8"


class ExerciseBase(BaseModel):
    exercise_id: str = Field(..., min_length=1, max_length=100)
    topic_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    exercise_type: ExerciseType
    difficulty: ExerciseDifficulty
    content: dict
    hints: list[str] = Field(default_factory=list)
    solution: Optional[dict] = None
    prerequisites: list[str] = Field(default_factory=list)


class ExerciseCreate(ExerciseBase):
    pass


class ExerciseUpdate(ExerciseBase):
    exercise_id: Optional[str] = Field(None, min_length=1, max_length=100)
    topic_id: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class ExerciseResponse(ExerciseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ExerciseAttemptBase(BaseModel):
    exercise_id: str
    user_answer: dict
    is_correct: bool
    time_spent_seconds: int = Field(default=0, ge=0)
    hints_used: int = Field(default=0, ge=0)
    mistake_categories: list[str] = Field(default_factory=list)


class ExerciseAttemptCreate(ExerciseAttemptBase):
    pass


class ExerciseAttemptResponse(ExerciseAttemptBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
