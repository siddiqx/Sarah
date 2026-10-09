from fastapi import APIRouter

router = APIRouter()


@router.get("/exercises")
async def list_exercises():
    return {"message": "List exercises - to be implemented"}


@router.get("/exercises/{exercise_id}")
async def get_exercise(exercise_id: str):
    return {"message": f"Get exercise {exercise_id} - to be implemented"}


@router.post("/exercises/{exercise_id}/attempt")
async def attempt_exercise(exercise_id: str):
    return {"message": f"Attempt exercise {exercise_id} - to be implemented"}
