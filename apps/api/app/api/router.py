from fastapi import APIRouter

from app.api.v1 import health, curriculum, learning, practice, coding, assessments, revision, projects

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(curriculum.router, prefix="/curriculum", tags=["curriculum"])
api_router.include_router(learning.router, prefix="/learning", tags=["learning"])
api_router.include_router(practice.router, prefix="/practice", tags=["practice"])
api_router.include_router(coding.router, prefix="/coding", tags=["coding"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(revision.router, prefix="/revision", tags=["revision"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
