from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey, Enum as SQLEnum, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class LessonProgressStatus(str, enum.Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class TopicProgressStatus(str, enum.Enum):
    UNSEEN = "unseen"
    INTRODUCED = "introduced"
    UNDERSTOOD = "understood"
    PRACTICED = "practiced"
    APPLIED = "applied"
    ASSESSED = "assessed"
    MASTERED = "mastered"


class UserLessonProgress(Base):
    __tablename__ = "user_lesson_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    lesson_id = Column(Integer, ForeignKey("curriculum_lessons.id"), nullable=False, index=True)
    status = Column(SQLEnum(LessonProgressStatus), default=LessonProgressStatus.NOT_STARTED, nullable=False)
    current_block_index = Column(Integer, default=0, nullable=False)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="lesson_progress")
    lesson = relationship("CurriculumLesson", back_populates="user_progress")


class UserTopicProgress(Base):
    __tablename__ = "user_topic_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    topic_id = Column(String(100), ForeignKey("curriculum_topics.topic_id"), nullable=False, index=True)
    status = Column(SQLEnum(TopicProgressStatus), default=TopicProgressStatus.UNSEEN, nullable=False)
    confidence_score = Column(Float, default=0.0, nullable=False)
    lesson_completed = Column(Boolean, default=False, nullable=False)
    guided_practice_completed = Column(Boolean, default=False, nullable=False)
    independent_practice_completed = Column(Boolean, default=False, nullable=False)
    assessment_passed = Column(Boolean, default=False, nullable=False)
    last_revised_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="topic_progress")
    topic = relationship("CurriculumTopic", back_populates="user_progress")


Index("ix_user_topic_progress_user_topic", UserTopicProgress.user_id, UserTopicProgress.topic_id, unique=True)
Index("ix_user_lesson_progress_user_lesson", UserLessonProgress.user_id, UserLessonProgress.lesson_id, unique=True)
