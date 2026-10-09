from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum


class Language(str, Enum):
    PYTHON = 'python'
    JAVASCRIPT = 'javascript'
    TYPESCRIPT = 'typescript'


class ExecutionStatus(str, Enum):
    PENDING = 'pending'
    RUNNING = 'running'
    SUCCESS = 'success'
    ERROR = 'error'
    TIMEOUT = 'timeout'
    MEMORY_LIMIT = 'memory_limit'
    COMPILATION_ERROR = 'compilation_error'


class TestCaseResult(BaseModel):
    passed: bool
    input: Dict[str, Any]
    expected: Dict[str, Any]
    actual: Dict[str, Any]
    error: Optional[str] = None
    execution_time_ms: int


class ExecutionRequest(BaseModel):
    code: str
    language: Language = Language.PYTHON
    test_cases: List[Dict[str, Any]] = Field(default_factory=list)
    timeout_seconds: int = Field(default=30, ge=1, le=120)
    memory_limit_mb: int = Field(default=256, ge=64, le=1024)
    stdin: Optional[str] = None


class ExecutionResponse(BaseModel):
    status: ExecutionStatus
    stdout: str = ''
    stderr: str = ''
    test_results: List[TestCaseResult] = Field(default_factory=list)
    execution_time_ms: int = 0
    memory_used_mb: int = 0
    error_message: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    version: str
