from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class RevisionType(str, Enum):
    CONCEPT_RECALL = "concept_recall"
    OUTPUT_PREDICTION = "output_prediction"
    SHORT_CODING = "short_coding"
    DEBUGGING = "debugging"
    EXPLANATION = "explanation"
    MIXED_TOPIC = "mixed_topic"
    PREVIOUS_MISTAKE = "previous_mistake"
    PREREQUISITE_REVIEW = "prerequisite_review"


class RevisionPriority(str, Enum):
    DUE_NOW = "due_now"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class RevisionItemBase(BaseModel):
    item_id: str = Field(..., min_length=1, max_length=100)
    user_id: int
    topic_id: str = Field(..., min_length=1, max_length=100)
    revision_type: RevisionType
    priority: RevisionPriority = RevisionPriority.MEDIUM
    content: dict
    scheduled_for: datetime
    due_date: datetime
    completed: bool = False
    completed_at: Optional[datetime] = None
    score: Optional[float] = Field(None, ge=0.0, le=1.0)
    source: str = "scheduled"


class RevisionItemCreate(RevisionItemBase):
    pass


class RevisionItemUpdate(BaseModel):
    completed: Optional[bool] = None
    completed_at: Optional[datetime] = None
    score: Optional[float] = Field(None, ge=0.0, le=1.0)


class RevisionItemResponse(RevisionItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
