from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_projects():
    return {"message": "List projects - to be implemented"}


@router.get("/{project_id}")
async def get_project(project_id: str):
    return {"message": f"Get project {project_id} - to be implemented"}


@router.post("/{project_id}/start")
async def start_project(project_id: str):
    return {"message": f"Start project {project_id} - to be implemented"}
