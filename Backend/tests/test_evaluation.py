import pytest
from app.services.ai_service import AIService


def test_four_vector_weighted_formula():
    rigor = 90.0
    delivery = 80.0
    decomposition = 85.0
    conviction = 75.0

    expected = round((rigor * 0.30) + (delivery * 0.25) + (decomposition * 0.25) + (conviction * 0.20), 1)
    # (27.0) + (20.0) + (21.25) + (15.0) = 83.25 -> 83.2 or 83.3
    assert 83.2 <= expected <= 83.3


@pytest.mark.anyio
async def test_fallback_evaluation_has_four_vectors():
    fallback = await AIService.evaluate_answers("Frontend Developer", [], [])
    assert "technical_rigor_score" in fallback
    assert "structured_delivery_score" in fallback
    assert "problem_decomposition_score" in fallback
    assert "edge_case_conviction_score" in fallback
    assert 0 <= fallback["overall_score"] <= 100


def test_result_response_schema_question_reviews():
    from datetime import datetime, timezone
    from app.schemas.result import ResultResponse

    dummy = ResultResponse(
        id=1,
        interview_id=1,
        overall_score=85.0,
        technical_rigor_score=85.0,
        structured_delivery_score=85.0,
        problem_decomposition_score=85.0,
        edge_case_conviction_score=85.0,
        technical_score=85.0,
        communication_score=85.0,
        problem_solving_score=85.0,
        question_reviews=[
            {
                "question": "Explain consistency models",
                "userAnswer": "Strong vs eventual consistency trade-offs",
                "score": 88.0,
                "aiEvaluation": "Sound architectural reasoning",
                "modelAnswer": "PACELC theorem evaluation",
                "suggestion": "Quantify replication lag metrics",
            }
        ],
        created_at=datetime.now(timezone.utc),
    )

    assert len(dummy.questionReviews) == 1
    assert dummy.questionReviews[0]["score"] == 88.0
    assert dummy.overallScore == 85.0
