from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class CodingProblem(Base):
    __tablename__ = "coding_problems"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(20), nullable=False)
    instructions = Column(Text, nullable=False)
    examples = Column(JSON, default=list)
    constraints = Column(Text, nullable=True)
    starter_code = Column(Text, nullable=True)
    solution_code = Column(Text, nullable=True)
    topic_ids = Column(JSON, default=list)
    time_limit_seconds = Column(Integer, default=30, nullable=False)
    memory_limit_mb = Column(Integer, default=256, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    test_cases = relationship("TestCase", back_populates="problem", cascade="all, delete-orphan")
    attempts = relationship("CodingAttempt", back_populates="problem", cascade="all, delete-orphan")


class TestCase(Base):
    __tablename__ = "test_cases"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("coding_problems.id"), nullable=False, index=True)
    test_case_id = Column(String(100), nullable=False)
    input_data = Column(JSON, nullable=False)
    expected_output = Column(JSON, nullable=False)
    test_type = Column(String(20), default="visible", nullable=False)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    problem = relationship("CodingProblem", back_populates="test_cases")


class CodingAttempt(Base):
    __tablename__ = "coding_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    problem_id = Column(Integer, ForeignKey("coding_problems.id"), nullable=False, index=True)
    code = Column(Text, nullable=False)
    language = Column(String(20), default="python", nullable=False)
    status = Column(String(20), nullable=False)
    test_results = Column(JSON, default=list)
    total_tests = Column(Integer, default=0, nullable=False)
    passed_tests = Column(Integer, default=0, nullable=False)
    execution_time_ms = Column(Integer, default=0, nullable=False)
    memory_used_mb = Column(Integer, nullable=True)
    error_message = Column(Text, nullable=True)
    is_submission = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="coding_attempts")
    problem = relationship("CodingProblem", back_populates="attempts")


Index("ix_coding_attempts_user_problem", CodingAttempt.user_id, CodingAttempt.problem_id)
