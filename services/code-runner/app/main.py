from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import subprocess
import tempfile
import os
import signal
import time

app = FastAPI(title="Sarah Code Runner", version="0.1.0")


class ExecutionRequest(BaseModel):
    code: str
    language: str = "python"
    input_data: Optional[str] = None
    time_limit_seconds: int = 30
    memory_limit_mb: int = 256


class ExecutionResponse(BaseModel):
    success: bool
    output: Optional[str] = None
    error: Optional[str] = None
    execution_time_ms: int
    memory_used_mb: Optional[float] = None
    timed_out: bool = False


def run_python_code(code: str, input_data: Optional[str], time_limit: int) -> ExecutionResponse:
    start_time = time.time()
    
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as f:
        f.write(code)
        temp_file = f.name
    
    try:
        proc = subprocess.Popen(
            ["python3", temp_file],
            stdin=subprocess.PIPE if input_data else None,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        
        try:
            stdout, stderr = proc.communicate(input=input_data, timeout=time_limit)
            execution_time_ms = int((time.time() - start_time) * 1000)
            
            if proc.returncode == 0:
                return ExecutionResponse(
                    success=True,
                    output=stdout,
                    execution_time_ms=execution_time_ms,
                )
            else:
                return ExecutionResponse(
                    success=False,
                    error=stderr,
                    execution_time_ms=execution_time_ms,
                )
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.communicate()
            return ExecutionResponse(
                success=False,
                error="Execution timed out",
                execution_time_ms=int((time.time() - start_time) * 1000),
                timed_out=True,
            )
    finally:
        try:
            os.unlink(temp_file)
        except OSError:
            pass


@app.post("/execute", response_model=ExecutionResponse)
async def execute_code(request: ExecutionRequest):
    if request.language != "python":
        return ExecutionResponse(
            success=False,
            error=f"Language {request.language} not supported yet",
            execution_time_ms=0,
        )
    
    return run_python_code(request.code, request.input_data, request.time_limit_seconds)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "sarah-code-runner"}
