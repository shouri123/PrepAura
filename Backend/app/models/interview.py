from datetime import datetime, timezone
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.question import Question, Answer
    from app.models.result import Result


class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role: Mapped[str] = mapped_column(String(100), nullable=False)
    experience_level: Mapped[str] = mapped_column(String(50), nullable=False)
    interview_type: Mapped[str] = mapped_column(String(50), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(50), nullable=False)
    question_count: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="in_progress", nullable=False)
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="interviews")
    questions: Mapped[List["Question"]] = relationship(
        "Question", back_populates="interview", cascade="all, delete-orphan", order_by="Question.order_index"
    )
    answers: Mapped[List["Answer"]] = relationship(
        "Answer", back_populates="interview", cascade="all, delete-orphan"
    )
    result: Mapped[Optional["Result"]] = relationship(
        "Result", back_populates="interview", uselist=False, cascade="all, delete-orphan"
    )

    @property
    def overall_score(self) -> Optional[float]:
        return self.result.overall_score if self.result else None