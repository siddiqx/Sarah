from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ProjectStatus(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    BLOCKED = "blocked"


class ProjectMilestoneBase(BaseModel):
    milestone_id: str = Field(..., min_length=1, max_length=100)
    project_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    order: int = Field(default=0, ge=0)
    required_topic_ids: list[str] = Field(default_factory=list)
    validation_rules: list[dict] = Field(default_factory=list)


class ProjectMilestoneCreate(ProjectMilestoneBase):
    pass


class ProjectMilestoneResponse(ProjectMilestoneBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    project_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    objective: str
    requirements: list[str] = Field(default_factory=list)
    constraints: list[str] = Field(default_factory=list)
    prerequisites: list[str] = Field(default_factory=list)
    dataset_ids: list[str] = Field(default_factory=list)
    setup_instructions: Optional[str] = None
    hints: list[str] = Field(default_factory=list)
    completion_criteria: Optional[str] = None
    evaluation_criteria: Optional[str] = None
    day_range: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    project_id: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class ProjectResponse(ProjectBase):
    id: int
    milestones: list[ProjectMilestoneResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProjectProgressBase(BaseModel):
    project_id: str
    status: ProjectStatus = ProjectStatus.NOT_STARTED
    current_milestone_id: Optional[str] = None
    completed_milestones: list[str] = Field(default_factory=list)
    progress_percentage: float = Field(default=0.0, ge=0.0, le=100.0)


class ProjectProgressCreate(ProjectProgressBase):
    pass


class ProjectProgressUpdate(BaseModel):
    status: Optional[ProjectStatus] = None
    current_milestone_id: Optional[str] = None
    completed_milestones: Optional[list[str]] = None
    progress_percentage: Optional[float] = Field(None, ge=0.0, le=100.0)


class ProjectProgressResponse(ProjectProgressBase):
    id: int
    user_id: int
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
