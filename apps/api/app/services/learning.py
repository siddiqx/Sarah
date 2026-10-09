from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime, UTC

from app.models.learning import UserLessonProgress, UserTopicProgress, LessonProgressStatus, TopicProgressStatus
from app.schemas.learning import LessonProgressCreate, LessonProgressUpdate, TopicProgressCreate, TopicProgressUpdate


class LearningService:
    def __init__(self, db: Session):
        self.db = db

    def get_lesson_progress(self, user_id: int, lesson_id: int) -> Optional[UserLessonProgress]:
        return (
            self.db.query(UserLessonProgress)
            .filter(
                UserLessonProgress.user_id == user_id,
                UserLessonProgress.lesson_id == lesson_id,
            )
            .first()
        )

    def start_lesson(self, user_id: int, lesson_id: int) -> UserLessonProgress:
        progress = self.get_lesson_progress(user_id, lesson_id)
        if progress:
            if progress.status == LessonProgressStatus.NOT_STARTED:
                progress.status = LessonProgressStatus.IN_PROGRESS
                progress.updated_at = datetime.now(UTC)
        else:
            progress = UserLessonProgress(
                user_id=user_id,
                lesson_id=lesson_id,
                status=LessonProgressStatus.IN_PROGRESS,
                current_block_index=0,
                time_spent_seconds=0,
            )
            self.db.add(progress)
        self.db.commit()
        self.db.refresh(progress)
        return progress

    def update_lesson_progress(
        self,
        user_id: int,
        lesson_id: int,
        update: LessonProgressUpdate,
    ) -> Optional[UserLessonProgress]:
        progress = self.get_lesson_progress(user_id, lesson_id)
        if not progress:
            return None
        
        if update.status is not None:
            progress.status = update.status
        if update.current_block_index is not None:
            progress.current_block_index = update.current_block_index
        if update.time_spent_seconds is not None:
            progress.time_spent_seconds = update.time_spent_seconds
        
        if progress.status == LessonProgressStatus.COMPLETED and not progress.completed_at:
            progress.completed_at = datetime.now(UTC)
        
        progress.updated_at = datetime.now(UTC)
        self.db.commit()
        self.db.refresh(progress)
        return progress

    def get_topic_progress(self, user_id: int, topic_id: str) -> Optional[UserTopicProgress]:
        return (
            self.db.query(UserTopicProgress)
            .filter(
                UserTopicProgress.user_id == user_id,
                UserTopicProgress.topic_id == topic_id,
            )
            .first()
        )

    def get_all_topic_progress(self, user_id: int) -> List[UserTopicProgress]:
        return (
            self.db.query(UserTopicProgress)
            .filter(UserTopicProgress.user_id == user_id)
            .all()
        )

    def update_topic_progress(
        self,
        user_id: int,
        topic_id: str,
        update: TopicProgressUpdate,
    ) -> Optional[UserTopicProgress]:
        progress = self.get_topic_progress(user_id, topic_id)
        if not progress:
            progress = UserTopicProgress(user_id=user_id, topic_id=topic_id)
            self.db.add(progress)
        
        if update.status is not None:
            progress.status = update.status
        if update.confidence_score is not None:
            progress.confidence_score = update.confidence_score
        if update.lesson_completed is not None:
            progress.lesson_completed = update.lesson_completed
        if update.guided_practice_completed is not None:
            progress.guided_practice_completed = update.guided_practice_completed
        if update.independent_practice_completed is not None:
            progress.independent_practice_completed = update.independent_practice_completed
        if update.assessment_passed is not None:
            progress.assessment_passed = update.assessment_passed
        if update.last_revised_at is not None:
            progress.last_revised_at = update.last_revised_at
        
        progress.updated_at = datetime.now(UTC)
        self.db.commit()
        self.db.refresh(progress)
        return progress
