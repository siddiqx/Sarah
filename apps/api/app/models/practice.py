from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    exercise_id = Column(String(100), unique=True, nullable=False, index=True)
    topic_id = Column(String(100), ForeignKey("curriculum_topics.topic_id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    exercise_type = Column(String(50), nullable=False)
    difficulty = Column(String(20), nullable=False)
    content = Column(JSON, nullable=False)
    hints = Column(JSON, default=list)
    solution = Column(JSON, nullable=True)
    prerequisites = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    attempts = relationship("ExerciseAttempt", back_populates="exercise", cascade="all, delete-orphan")


class ExerciseAttempt(Base):
    __tablename__ = "exercise_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=False, index=True)
    user_answer = Column(JSON, nullable=False)
    is_correct = Column(Integer, default=0, nullable=False)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    hints_used = Column(Integer, default=0, nullable=False)
    mistake_categories = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="exercise_attempts")
    exercise = relationship("Exercise", back_populates="attempts")


Index("ix_exercise_attempts_user_exercise", ExerciseAttempt.user_id, ExerciseAttempt.exercise_id)
