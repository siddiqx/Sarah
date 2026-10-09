from fastapi import APIRouter

router = APIRouter()


@router.get("/problems")
async def list_problems():
    return {"message": "List coding problems - to be implemented"}


@router.get("/problems/{problem_id}")
async def get_problem(problem_id: str):
    return {"message": f"Get coding problem {problem_id} - to be implemented"}


@router.post("/problems/{problem_id}/run")
async def run_code(problem_id: str):
    return {"message": f"Run code for problem {problem_id} - to be implemented"}


@router.post("/problems/{problem_id}/submit")
async def submit_code(problem_id: str):
    return {"message": f"Submit code for problem {problem_id} - to be implemented"}
