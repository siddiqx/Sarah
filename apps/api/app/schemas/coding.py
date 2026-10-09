from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ProblemDifficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class TestCaseType(str, Enum):
    VISIBLE = "visible"
    HIDDEN = "hidden"


class TestCaseBase(BaseModel):
    test_case_id: str = Field(..., min_length=1, max_length=100)
    problem_id: str = Field(..., min_length=1, max_length=100)
    input_data: dict
    expected_output: dict
    test_type: TestCaseType = TestCaseType.VISIBLE
    description: Optional[str] = None
    order: int = Field(default=0, ge=0)


class TestCaseCreate(TestCaseBase):
    pass


class TestCaseResponse(TestCaseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CodingProblemBase(BaseModel):
    problem_id: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=200)
    description: str
    difficulty: ProblemDifficulty
    instructions: str
    examples: list[dict] = Field(default_factory=list)
    constraints: Optional[str] = None
    starter_code: Optional[str] = None
    solution_code: Optional[str] = None
    topic_ids: list[str] = Field(default_factory=list)
    time_limit_seconds: int = Field(default=30, ge=1, le=300)
    memory_limit_mb: int = Field(default=256, ge=64, le=2048)


class CodingProblemCreate(CodingProblemBase):
    pass


class CodingProblemUpdate(CodingProblemBase):
    problem_id: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=200)


class CodingProblemResponse(CodingProblemBase):
    id: int
    test_cases: list[TestCaseResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CodeExecutionRequest(BaseModel):
    code: str
    problem_id: str
    language: str = "python"
    input_data: Optional[dict] = None


class CodeExecutionResponse(BaseModel):
    success: bool
    output: Optional[str] = None
    error: Optional[str] = None
    execution_time_ms: int
    memory_used_mb: Optional[float] = None
    test_results: Optional[list[dict]] = None


class CodeSubmissionRequest(BaseModel):
    code: str
    problem_id: str
    language: str = "python"


class CodeSubmissionResponse(BaseModel):
    submission_id: str
    status: str
    test_results: list[dict]
    total_tests: int
    passed_tests: int
    execution_time_ms: int
    memory_used_mb: Optional[float] = None
