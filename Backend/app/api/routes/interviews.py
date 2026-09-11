from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.interview import (
    InterviewResponse,
    InterviewStartRequest,
    InterviewSummaryResponse,
)
from app.schemas.question import AnswerCreate, AnswerResponse
from app.schemas.result import ResultResponse
from app.services.interview_service import InterviewService


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"],
)


@router.post(
    "",
    response_model=InterviewResponse,
    status_code=status.HTTP_201_CREATED,
)
@router.post(
    "/start",
    response_model=InterviewResponse,
    status_code=status.HTTP_201_CREATED,
)
async def start_interview(
    interview_data: InterviewStartRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await InterviewService.start_interview(
        db,
        current_user.id,
        interview_data,
    )


@router.get(
    "",
    response_model=list[InterviewSummaryResponse],
)
@router.get(
    "/history",
    response_model=list[InterviewSummaryResponse],
)
async def list_interviews(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await InterviewService.get_user_history(
        db,
        current_user.id,
    )


@router.get(
    "/{interview_id}",
    response_model=InterviewResponse,
)
async def get_interview(
    interview_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await InterviewService.get_interview_by_id(
        db,
        interview_id,
        current_user.id,
    )


@router.get(
    "/{interview_id}/result",
    response_model=ResultResponse,
)
async def get_interview_result(
    interview_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    interview = await InterviewService.get_interview_by_id(
        db,
        interview_id,
        current_user.id,
    )
    if not interview.result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Result not compiled yet for this interview.",
        )
    return interview.result


@router.post(
    "/{interview_id}/answers",
    response_model=AnswerResponse,
    status_code=status.HTTP_201_CREATED,
)
@router.post(
    "/{interview_id}/answer",
    response_model=AnswerResponse,
    status_code=status.HTTP_201_CREATED,
)
async def submit_answer(
    interview_id: int,
    answer_data: AnswerCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await InterviewService.submit_answer(
        db,
        interview_id,
        current_user.id,
        answer_data,
    )


@router.post(
    "/{interview_id}/complete",
    response_model=ResultResponse,
)
async def complete_interview(
    interview_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await InterviewService.complete_interview(
        db,
        interview_id,
        current_user.id,
    )