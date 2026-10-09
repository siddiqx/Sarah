from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Boolean, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class CurriculumPhase(Base):
    __tablename__ = "curriculum_phases"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer, unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    days = relationship("CurriculumDay", back_populates="phase", cascade="all, delete-orphan")


class CurriculumDay(Base):
    __tablename__ = "curriculum_days"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer, unique=True, nullable=False, index=True)
    phase_id = Column(Integer, ForeignKey("curriculum_phases.id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    summary = Column(Text, nullable=True)
    learning_objectives = Column(JSON, default=list)
    prerequisites = Column(JSON, default=list)
    estimated_study_time_minutes = Column(Integer, default=60, nullable=False)
    completion_criteria = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    phase = relationship("CurriculumPhase", back_populates="days")
    topics = relationship("CurriculumTopic", back_populates="day", cascade="all, delete-orphan")


class CurriculumTopic(Base):
    __tablename__ = "curriculum_topics"

    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(String(100), unique=True, nullable=False, index=True)
    day_number = Column(Integer, ForeignKey("curriculum_days.number"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    difficulty = Column(String(20), default="beginner", nullable=False)
    learning_objectives = Column(JSON, default=list)
    prerequisite_topic_ids = Column(JSON, default=list)
    related_skills = Column(JSON, default=list)
    mastery_criteria = Column(Text, nullable=True)
    revision_criteria = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    day = relationship("CurriculumDay", back_populates="topics")
    lessons = relationship("CurriculumLesson", back_populates="topic", cascade="all, delete-orphan")
    user_progress = relationship("UserTopicProgress", back_populates="topic", cascade="all, delete-orphan")


class CurriculumLesson(Base):
    __tablename__ = "curriculum_lessons"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(String(100), unique=True, nullable=False, index=True)
    topic_id = Column(String(100), ForeignKey("curriculum_topics.topic_id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    topic = relationship("CurriculumTopic", back_populates="lessons")
    blocks = relationship("LessonBlock", back_populates="lesson", cascade="all, delete-orphan", order_by="LessonBlock.order")
    user_progress = relationship("UserLessonProgress", back_populates="lesson", cascade="all, delete-orphan")


class LessonBlock(Base):
    __tablename__ = "lesson_blocks"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("curriculum_lessons.id"), nullable=False, index=True)
    block_type = Column(String(50), nullable=False)
    content = Column(JSON, nullable=False)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lesson = relationship("CurriculumLesson", back_populates="blocks")


Index("ix_lesson_blocks_lesson_order", LessonBlock.lesson_id, LessonBlock.order)
