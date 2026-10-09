from sqlalchemy.orm import Session
from typing import Optional, List

from app.models.curriculum import (
    CurriculumPhase,
    CurriculumDay,
    CurriculumTopic,
    CurriculumLesson,
    LessonBlock,
)
from app.schemas.curriculum import (
    CurriculumPhaseResponse,
    CurriculumDayResponse,
    CurriculumTopicResponse,
    CurriculumLessonResponse,
)


class CurriculumService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_phases(self) -> List[CurriculumPhase]:
        return self.db.query(CurriculumPhase).order_by(CurriculumPhase.number).all()

    def get_phase(self, phase_id: int) -> Optional[CurriculumPhase]:
        return self.db.query(CurriculumPhase).filter(CurriculumPhase.id == phase_id).first()

    def get_all_days(self, phase_id: Optional[int] = None) -> List[CurriculumDay]:
        query = self.db.query(CurriculumDay)
        if phase_id:
            query = query.filter(CurriculumDay.phase_id == phase_id)
        return query.order_by(CurriculumDay.number).all()

    def get_day(self, day_number: int) -> Optional[CurriculumDay]:
        return self.db.query(CurriculumDay).filter(CurriculumDay.number == day_number).first()

    def get_all_topics(
        self,
        phase_id: Optional[int] = None,
        day_number: Optional[int] = None,
    ) -> List[CurriculumTopic]:
        query = self.db.query(CurriculumTopic)
        if day_number:
            query = query.filter(CurriculumTopic.day_number == day_number)
        elif phase_id:
            query = query.join(CurriculumDay).filter(CurriculumDay.phase_id == phase_id)
        return query.order_by(CurriculumTopic.day_number, CurriculumTopic.id).all()

    def get_topic(self, topic_id: str) -> Optional[CurriculumTopic]:
        return self.db.query(CurriculumTopic).filter(CurriculumTopic.topic_id == topic_id).first()

    def get_lesson(self, lesson_id: str) -> Optional[CurriculumLesson]:
        return self.db.query(CurriculumLesson).filter(CurriculumLesson.lesson_id == lesson_id).first()

    def get_lessons_for_topic(self, topic_id: str) -> List[CurriculumLesson]:
        return (
            self.db.query(CurriculumLesson)
            .filter(CurriculumLesson.topic_id == topic_id)
            .order_by(CurriculumLesson.id)
            .all()
        )
