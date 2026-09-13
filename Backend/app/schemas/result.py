from datetime import datetime
from typing import Any, Dict, List
from pydantic import BaseModel, ConfigDict, computed_field


class ResultResponse(BaseModel):
    id: int
    interview_id: int
    overall_score: float
    technical_rigor_score: float = 75.0
    structured_delivery_score: float = 75.0
    problem_decomposition_score: float = 75.0
    edge_case_conviction_score: float = 75.0
    technical_score: float = 75.0
    communication_score: float = 75.0
    problem_solving_score: float = 75.0
    strengths: List[str] = []
    weaknesses: List[str] = []
    recommendations: List[str] = []
    question_reviews: List[Dict[str, Any]] = []
    created_at: datetime

    @computed_field
    @property
    def questionReviews(self) -> List[Dict[str, Any]]:
        return self.question_reviews

    @computed_field
    @property
    def overallScore(self) -> float:
        return self.overall_score

    @computed_field
    @property
    def scores(self) -> Dict[str, float]:
        return {
            "technical": round(self.technical_rigor_score, 1),
            "communication": round(self.structured_delivery_score, 1),
            "problemSolving": round(self.problem_decomposition_score, 1),
            "confidence": round(self.edge_case_conviction_score, 1),
        }

    @computed_field
    @property
    def improvements(self) -> List[str]:
        return self.weaknesses

    @computed_field
    @property
    def aiRecommendation(self) -> str:
        return (
            " ".join(self.recommendations)
            if self.recommendations
            else "Focus on structured trade-offs and edge-case testing."
        )

    model_config = ConfigDict(from_attributes=True)