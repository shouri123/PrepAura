from datetime import datetime, timezone
from typing import List, TYPE_CHECKING
from sqlalchemy import DateTime, Float, ForeignKey, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

if TYPE_CHECKING:
    from app.models.interview import Interview


class Result(Base):
    __tablename__ = "results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    interview_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("interviews.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    overall_score: Mapped[float] = mapped_column(Float, nullable=False)
    technical_rigor_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    structured_delivery_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    problem_decomposition_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    edge_case_conviction_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    technical_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    communication_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    problem_solving_score: Mapped[float] = mapped_column(Float, default=75.0, nullable=False)
    strengths: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    weaknesses: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    recommendations: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    question_reviews: Mapped[List[dict]] = mapped_column(JSON, default=list, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )

    interview: Mapped["Interview"] = relationship("Interview", back_populates="result")