from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime
from enum import Enum


class LessonProgressStatus(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class LessonProgressBase(BaseModel):
    lesson_id: str
    status: LessonProgressStatus = LessonProgressStatus.NOT_STARTED
    current_block_index: int = Field(default=0, ge=0)
    time_spent_seconds: int = Field(default=0, ge=0)


class LessonProgressCreate(LessonProgressBase):
    pass


class LessonProgressUpdate(BaseModel):
    status: Optional[LessonProgressStatus] = None
    current_block_index: Optional[int] = Field(None, ge=0)
    time_spent_seconds: Optional[int] = Field(None, ge=0)


class LessonProgressResponse(LessonProgressBase):
    id: int
    user_id: int
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TopicProgressStatus(str, Enum):
    UNSEEN = "unseen"
    INTRODUCED = "introduced"
    UNDERSTOOD = "understood"
    PRACTICED = "practiced"
    APPLIED = "applied"
    ASSESSED = "assessed"
    MASTERED = "mastered"


class TopicProgressBase(BaseModel):
    topic_id: str
    status: TopicProgressStatus = TopicProgressStatus.UNSEEN
    confidence_score: float = Field(default=0.0, ge=0.0, le=1.0)
    lesson_completed: bool = False
    guided_practice_completed: bool = False
    independent_practice_completed: bool = False
    assessment_passed: bool = False
    last_revised_at: Optional[datetime] = None


class TopicProgressCreate(TopicProgressBase):
    pass


class TopicProgressUpdate(BaseModel):
    status: Optional[TopicProgressStatus] = None
    confidence_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    lesson_completed: Optional[bool] = None
    guided_practice_completed: Optional[bool] = None
    independent_practice_completed: Optional[bool] = None
    assessment_passed: Optional[bool] = None
    last_revised_at: Optional[datetime] = None


class TopicProgressResponse(TopicProgressBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
