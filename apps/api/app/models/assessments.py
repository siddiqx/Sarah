from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Float, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    assessment_type = Column(String(50), nullable=False)
    topic_ids = Column(JSON, default=list)
    time_limit_minutes = Column(Integer, nullable=True)
    passing_score = Column(Float, default=0.7, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    questions = relationship("Question", back_populates="assessment", cascade="all, delete-orphan")
    attempts = relationship("AssessmentAttempt", back_populates="assessment", cascade="all, delete-orphan")


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False, index=True)
    question_id = Column(String(100), nullable=False)
    question_type = Column(String(50), nullable=False)
    prompt = Column(Text, nullable=False)
    options = Column(JSON, nullable=True)
    correct_answer = Column(JSON, nullable=False)
    explanation = Column(Text, nullable=True)
    topic_ids = Column(JSON, default=list)
    difficulty = Column(Integer, default=1, nullable=False)
    order = Column(Integer, default=0, nullable=False)
    points = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    assessment = relationship("Assessment", back_populates="questions")


class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False, index=True)
    answers = Column(JSON, nullable=False)
    score = Column(Float, nullable=False)
    passed = Column(Integer, default=0, nullable=False)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    dimension_scores = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="assessment_attempts")
    assessment = relationship("Assessment", back_populates="attempts")


Index("ix_assessment_attempts_user_assessment", AssessmentAttempt.user_id, AssessmentAttempt.assessment_id)
