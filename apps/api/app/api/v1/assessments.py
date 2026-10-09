from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_assessments():
    return {"message": "List assessments - to be implemented"}


@router.get("/{assessment_id}")
async def get_assessment(assessment_id: str):
    return {"message": f"Get assessment {assessment_id} - to be implemented"}


@router.post("/{assessment_id}/attempt")
async def attempt_assessment(assessment_id: str):
    return {"message": f"Attempt assessment {assessment_id} - to be implemented"}
