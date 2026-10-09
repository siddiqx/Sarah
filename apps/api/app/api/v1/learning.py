from fastapi import APIRouter

router = APIRouter()


@router.get("/progress")
async def get_learning_progress():
    return {"message": "Learning progress endpoint - to be implemented"}


@router.post("/lessons/{lesson_id}/start")
async def start_lesson(lesson_id: str):
    return {"message": f"Start lesson {lesson_id} - to be implemented"}


@router.post("/lessons/{lesson_id}/complete")
async def complete_lesson(lesson_id: str):
    return {"message": f"Complete lesson {lesson_id} - to be implemented"}
