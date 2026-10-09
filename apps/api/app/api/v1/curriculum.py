from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.schemas.curriculum import (
    CurriculumPhaseResponse,
    CurriculumDayResponse,
    CurriculumTopicResponse,
    CurriculumLessonResponse,
)
from app.services.curriculum import CurriculumService

router = APIRouter()


@router.get("/phases", response_model=list[CurriculumPhaseResponse])
async def list_phases(db: Session = Depends(get_db)):
    service = CurriculumService(db)
    return service.get_all_phases()


@router.get("/phases/{phase_id}", response_model=CurriculumPhaseResponse)
async def get_phase(phase_id: int, db: Session = Depends(get_db)):
    service = CurriculumService(db)
    phase = service.get_phase(phase_id)
    if not phase:
        raise HTTPException(status_code=404, detail="Phase not found")
    return phase


@router.get("/days", response_model=list[CurriculumDayResponse])
async def list_days(
    phase_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    service = CurriculumService(db)
    return service.get_all_days(phase_id=phase_id)


@router.get("/days/{day_number}", response_model=CurriculumDayResponse)
async def get_day(day_number: int, db: Session = Depends(get_db)):
    service = CurriculumService(db)
    day = service.get_day(day_number)
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    return day


@router.get("/topics", response_model=list[CurriculumTopicResponse])
async def list_topics(
    phase_id: Optional[int] = Query(None),
    day_number: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    service = CurriculumService(db)
    return service.get_all_topics(phase_id=phase_id, day_number=day_number)


@router.get("/topics/{topic_id}", response_model=CurriculumTopicResponse)
async def get_topic(topic_id: str, db: Session = Depends(get_db)):
    service = CurriculumService(db)
    topic = service.get_topic(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic


@router.get("/lessons/{lesson_id}", response_model=CurriculumLessonResponse)
async def get_lesson(lesson_id: str, db: Session = Depends(get_db)):
    service = CurriculumService(db)
    lesson = service.get_lesson(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson
