from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import structlog

from schemas import ExecutionRequest, ExecutionResponse, HealthResponse
from executor import executor

structlog.configure(
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt='iso'),
        structlog.processors.JSONRenderer(),
    ]
)

logger = structlog.get_logger()

app = FastAPI(
    title='Sarah Code Runner',
    description='Isolated code execution service for Sarah learning platform',
    version='0.1.0',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health', response_model=HealthResponse)
async def health():
    return HealthResponse(status='healthy', version='0.1.0')


@app.post('/execute', response_model=ExecutionResponse)
async def execute_code(request: ExecutionRequest):
    logger.info('executing_code', language=request.language.value, test_cases=len(request.test_cases))

    try:
        result = executor.execute(request)
        logger.info('execution_complete', status=result.status.value, time_ms=result.execution_time_ms)
        return result
    except Exception as e:
        logger.error('execution_failed', error=str(e))
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8080)
