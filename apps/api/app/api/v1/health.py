from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health_check():
    return {"status": "healthy", "service": "sarah-api"}


@router.get("/ready")
async def readiness_check():
    return {"status": "ready", "service": "sarah-api"}
