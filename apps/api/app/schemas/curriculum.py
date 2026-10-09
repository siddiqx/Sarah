from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class DifficultyLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class BlockType(str, Enum):
    CONCEPT_EXPLANATION = "concept_explanation"
    WORKED_EXAMPLE = "worked_example"
    CODE_EXAMPLE = "code_example"
    OUTPUT_PREDICTION = "output_prediction"
    STEP_BY_STEP_TRACE = "step_by_step_trace"
    FILL_IN_CODE = "fill_in_code"
    ORDERING_EXERCISE = "ordering_exercise"
    MATCHING_EXERCISE = "matching_exercise"
    INTERACTIVE_COMPARISON = "interactive_comparison"
    DEBUGGING_EXERCISE = "debugging_exercise"
    SMALL_SIMULATION = "small_simulation"
    KNOWLEDGE_CHECK = "knowledge_check"
    PRACTICAL_APPLICATION = "practical_application"
    SUMMARY = "summary"
    REVISION_CHECKPOINT = "revision_checkpoint"


class CurriculumPhaseBase(BaseModel):
    number: int = Field(..., ge=1)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    order: int = Field(..., ge=0)


class CurriculumPhaseCreate(CurriculumPhaseBase):
    pass


class CurriculumPhaseUpdate(CurriculumPhaseBase):
    number: Optional[int] = Field(None, ge=1)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class CurriculumPhaseResponse(CurriculumPhaseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CurriculumDayBase(BaseModel):
    number: int = Field(..., ge=1, le=250)
    phase_id: int = Field(..., ge=1)
    title: str = Field(..., min_length=1, max_length=200)
    summary: Optional[str] = None
    learning_objectives: list[str] = Field(default_factory=list)
    prerequisites: list[str] = Field(default_factory=list)
    estimated_study_time_minutes: int = Field(default=60, ge=1)
    completion_criteria: Optional[str] = None


class CurriculumDayCreate(CurriculumDayBase):
    pass


class CurriculumDayUpdate(CurriculumDayBase):
    number: Optional[int] = Field(None, ge=1, le=250)
    phase_id: Optional[int] = Field(None, ge=1)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class CurriculumDayResponse(CurriculumDayBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CurriculumTopicBase(BaseModel):
    topic_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    difficulty: DifficultyLevel = DifficultyLevel.BEGINNER
    learning_objectives: list[str] = Field(default_factory=list)
    prerequisite_topic_ids: list[str] = Field(default_factory=list)
    related_skills: list[str] = Field(default_factory=list)
    mastery_criteria: Optional[str] = None
    revision_criteria: Optional[str] = None


class CurriculumTopicCreate(CurriculumTopicBase):
    pass


class CurriculumTopicUpdate(CurriculumTopicBase):
    topic_id: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class CurriculumTopicResponse(CurriculumTopicBase):
    id: int
    day_number: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class LessonBlockBase(BaseModel):
    block_type: BlockType
    content: dict
    order: int = Field(..., ge=0)


class LessonBlockCreate(LessonBlockBase):
    pass


class LessonBlockResponse(LessonBlockBase):
    id: int
    lesson_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CurriculumLessonBase(BaseModel):
    lesson_id: str = Field(..., min_length=1, max_length=100)
    topic_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    blocks: list[LessonBlockCreate] = Field(default_factory=list)


class CurriculumLessonCreate(CurriculumLessonBase):
    pass


class CurriculumLessonUpdate(CurriculumLessonBase):
    lesson_id: Optional[str] = Field(None, min_length=1, max_length=100)
    topic_id: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class CurriculumLessonResponse(CurriculumLessonBase):
    id: int
    blocks: list[LessonBlockResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
