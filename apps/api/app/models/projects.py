from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Float, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    objective = Column(Text, nullable=False)
    requirements = Column(JSON, default=list)
    constraints = Column(JSON, default=list)
    prerequisites = Column(JSON, default=list)
    dataset_ids = Column(JSON, default=list)
    setup_instructions = Column(Text, nullable=True)
    hints = Column(JSON, default=list)
    completion_criteria = Column(Text, nullable=True)
    evaluation_criteria = Column(Text, nullable=True)
    day_range = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    milestones = relationship("ProjectMilestone", back_populates="project", cascade="all, delete-orphan")
    progress_records = relationship("ProjectProgress", back_populates="project", cascade="all, delete-orphan")


class ProjectMilestone(Base):
    __tablename__ = "project_milestones"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    milestone_id = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)
    required_topic_ids = Column(JSON, default=list)
    validation_rules = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", back_populates="milestones")


class ProjectProgress(Base):
    __tablename__ = "project_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    status = Column(String(20), default="not_started", nullable=False)
    current_milestone_id = Column(String(100), nullable=True)
    completed_milestones = Column(JSON, default=list)
    progress_percentage = Column(Float, default=0.0, nullable=False)
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="project_progress")
    project = relationship("Project", back_populates="progress_records")


Index("ix_project_progress_user_project", ProjectProgress.user_id, ProjectProgress.project_id, unique=True)
