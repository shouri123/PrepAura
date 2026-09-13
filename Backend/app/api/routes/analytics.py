from datetime import datetime
from typing import Any, Dict, List
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.interview import Interview
from app.models.question import Answer
from app.models.result import Result
from app.models.user import User

router = APIRouter(prefix="/analytics", tags=["Analytics"])
dashboard_router = APIRouter(tags=["Dashboard"])


@dashboard_router.get("/dashboard", response_model=Dict[str, Any])
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Total completed interviews
    completed_query = (
        select(func.count(Interview.id))
        .where(Interview.user_id == current_user.id, Interview.status == "completed")
    )
    completed_count = (await db.execute(completed_query)).scalar() or 0

    # Total questions answered
    answers_query = (
        select(func.count(Answer.id))
        .join(Interview, Answer.interview_id == Interview.id)
        .where(Interview.user_id == current_user.id)
    )
    answered_count = (await db.execute(answers_query)).scalar() or 0

    # Average scores
    avg_query = (
        select(
            func.avg(Result.overall_score),
            func.avg(Result.technical_rigor_score),
            func.avg(Result.structured_delivery_score),
            func.avg(Result.problem_decomposition_score),
            func.avg(Result.edge_case_conviction_score),
        )
        .join(Interview, Result.interview_id == Interview.id)
        .where(Interview.user_id == current_user.id, Interview.status == "completed")
    )
    avg_row = (await db.execute(avg_query)).first()
    avg_overall = round(avg_row[0], 1) if avg_row and avg_row[0] is not None else 84.0
    avg_rigor = round(avg_row[1], 1) if avg_row and avg_row[1] is not None else 85.0
    avg_delivery = round(avg_row[2], 1) if avg_row and avg_row[2] is not None else 80.0
    avg_decomp = round(avg_row[3], 1) if avg_row and avg_row[3] is not None else 82.0
    avg_conviction = round(avg_row[4], 1) if avg_row and avg_row[4] is not None else 78.0

    # Recent history
    recent_query = (
        select(Interview, Result)
        .join(Result, Interview.id == Result.interview_id)
        .where(Interview.user_id == current_user.id, Interview.status == "completed")
        .order_by(Interview.completed_at.desc())
        .limit(5)
    )
    recent_rows = (await db.execute(recent_query)).all()

    recent_interviews = []
    score_trend = []
    for interview, res in reversed(recent_rows):
        date_label = interview.completed_at.strftime("%b %d") if interview.completed_at else "Recent"
        score_trend.append({"date": date_label, "score": round(res.overall_score)})

    for interview, res in recent_rows:
        date_str = interview.completed_at.strftime("%Y-%m-%d") if interview.completed_at else datetime.utcnow().strftime("%Y-%m-%d")
        recent_interviews.append({
            "id": f"int_{interview.id}",
            "role": interview.role,
            "type": interview.interview_type,
            "difficulty": interview.difficulty,
            "score": round(res.overall_score),
            "date": date_str,
            "duration": "20 mins",
            "status": "Completed",
        })

    # Default starter data if user has no sessions yet
    if not score_trend:
        score_trend = [
            {"date": "Day 1", "score": 70},
            {"date": "Day 3", "score": 76},
            {"date": "Day 7", "score": 82},
            {"date": "Day 14", "score": 88},
        ]

    skill_analysis = [
        {"skill": "Technical Rigor", "score": avg_rigor, "benchmark": 75},
        {"skill": "Structured Delivery", "score": avg_delivery, "benchmark": 75},
        {"skill": "Problem Decomposition", "score": avg_decomp, "benchmark": 75},
        {"skill": "Edge-Case Conviction", "score": avg_conviction, "benchmark": 70},
        {"skill": "Overall Calibrated", "score": avg_overall, "benchmark": 75},
    ]

    return {
        "stats": {
            "interviewsCompleted": completed_count,
            "averageScore": round(avg_overall),
            "questionsAnswered": answered_count,
            "currentStreak": min(completed_count, 5) if completed_count > 0 else 1,
        },
        "scoreTrend": score_trend,
        "skillAnalysis": skill_analysis,
        "recentInterviews": recent_interviews,
    }


@router.get("/overview", response_model=Dict[str, Any])
async def get_analytics_overview(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Total interviews
    total_query = select(func.count(Interview.id)).where(Interview.user_id == current_user.id)
    total_interviews = (await db.execute(total_query)).scalar() or 0

    # Completed interviews
    completed_query = select(func.count(Interview.id)).where(
        Interview.user_id == current_user.id, Interview.status == "completed"
    )
    completed_interviews = (await db.execute(completed_query)).scalar() or 0

    # 4-vector averages
    avg_query = (
        select(
            func.avg(Result.overall_score),
            func.avg(Result.technical_rigor_score),
            func.avg(Result.structured_delivery_score),
            func.avg(Result.problem_decomposition_score),
            func.avg(Result.edge_case_conviction_score),
        )
        .join(Interview, Result.interview_id == Interview.id)
        .where(Interview.user_id == current_user.id, Interview.status == "completed")
    )
    avg_row = (await db.execute(avg_query)).first()
    avg_overall = round(avg_row[0], 1) if avg_row and avg_row[0] is not None else 82.0
    avg_rigor = round(avg_row[1], 1) if avg_row and avg_row[1] is not None else 85.0
    avg_delivery = round(avg_row[2], 1) if avg_row and avg_row[2] is not None else 80.0
    avg_decomp = round(avg_row[3], 1) if avg_row and avg_row[3] is not None else 82.0
    avg_conviction = round(avg_row[4], 1) if avg_row and avg_row[4] is not None else 78.0

    skill_scores = {
        "Technical Rigor": avg_rigor,
        "Structured Delivery": avg_delivery,
        "Problem Decomposition": avg_decomp,
        "Edge-Case Conviction": avg_conviction,
    }
    sorted_skills = sorted(skill_scores.items(), key=lambda item: item[1], reverse=True)
    strongest_skill = sorted_skills[0][0]
    weakest_skill = sorted_skills[-1][0]

    # Recent history scores
    recent_query = (
        select(Interview.id, Interview.role, Interview.completed_at, Result.overall_score)
        .join(Result, Interview.id == Result.interview_id)
        .where(Interview.user_id == current_user.id, Interview.status == "completed")
        .order_by(Interview.completed_at.desc())
        .limit(5)
    )
    recent_rows = (await db.execute(recent_query)).all()
    recent_scores = [
        {
            "interview_id": row[0],
            "role": row[1],
            "completed_at": row[2].isoformat() if row[2] else None,
            "score": row[3],
        }
        for row in recent_rows
    ]

    return {
        "total_interviews": total_interviews,
        "completed_interviews": completed_interviews,
        "average_score": avg_overall,
        "strongest_skill": strongest_skill,
        "weakest_skill": weakest_skill,
        "skill_breakdown": {
            "technical_rigor": avg_rigor,
            "structured_delivery": avg_delivery,
            "problem_decomposition": avg_decomp,
            "edge_case_conviction": avg_conviction,
            "technical": avg_rigor,
            "communication": avg_delivery,
            "problem_solving": avg_decomp,
        },
        "recent_scores": recent_scores,
    }