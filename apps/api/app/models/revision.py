from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey, Float, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class RevisionItem(Base):
    __tablename__ = "revision_items"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(String(100), unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    topic_id = Column(String(100), ForeignKey("curriculum_topics.topic_id"), nullable=False, index=True)
    revision_type = Column(String(50), nullable=False)
    priority = Column(String(20), default="medium", nullable=False)
    content = Column(JSON, nullable=False)
    scheduled_for = Column(DateTime(timezone=True), nullable=False, index=True)
    due_date = Column(DateTime(timezone=True), nullable=False, index=True)
    completed = Column(Integer, default=0, nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    score = Column(Float, nullable=True)
    source = Column(String(50), default="scheduled", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="revision_items")


Index("ix_revision_items_user_due", RevisionItem.user_id, RevisionItem.due_date)
Index("ix_revision_items_user_completed", RevisionItem.user_id, RevisionItem.completed)
