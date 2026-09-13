from typing import Any, Dict, List
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.question import Question
from app.models.user import User
from app.schemas.question import QuestionResponse

router = APIRouter(prefix="/questions", tags=["Question Bank"])

CURATED_BANK: List[Dict[str, Any]] = [
    {
        "id": 101,
        "topic": "React",
        "role": "Frontend Developer",
        "difficulty": "Medium",
        "timeEstimate": "3 mins",
        "question": "Explain the Virtual DOM and how React reconciliation algorithm works.",
        "hint": "Think about diffing algorithm, key props, and batched updates.",
        "order_index": 0,
        "interview_id": None,
    },
    {
        "id": 102,
        "topic": "JavaScript",
        "role": "Frontend Developer",
        "difficulty": "Hard",
        "timeEstimate": "4 mins",
        "question": "What is the Event Loop in JavaScript, and how do microtasks differ from macrotasks?",
        "hint": "Mention Call Stack, Callback Queue, Microtask Queue (Promises), and rendering cycles.",
        "order_index": 1,
        "interview_id": None,
    },
    {
        "id": 103,
        "topic": "Architecture",
        "role": "Distributed Systems",
        "difficulty": "Hard",
        "timeEstimate": "5 mins",
        "question": "Design a resilient distributed rate limiter capable of handling 100,000 requests per second.",
        "hint": "Discuss Token Bucket vs Leaky Bucket algorithms and Redis sliding window log.",
        "order_index": 2,
        "interview_id": None,
    },
    {
        "id": 104,
        "topic": "DBMS",
        "role": "Backend Developer",
        "difficulty": "Medium",
        "timeEstimate": "3 mins",
        "question": "Compare Optimistic Concurrency Control vs Pessimistic Locking in transactional systems.",
        "hint": "Analyze transaction collision rates, deadlock prevention, and database isolation levels.",
        "order_index": 3,
        "interview_id": None,
    },
    {
        "id": 105,
        "topic": "Conflict Resolution",
        "role": "Engineering Lead",
        "difficulty": "Medium",
        "timeEstimate": "4 mins",
        "question": "Describe an architectural disagreement you navigated with a staff engineer and how alignment was reached.",
        "hint": "Focus on data-backed RFCs, benchmarking, and consensus building.",
        "order_index": 4,
        "interview_id": None,
    },
]


@router.get("", response_model=List[QuestionResponse])
@router.get("/bank", response_model=List[QuestionResponse])
async def get_question_bank(
    topic: str | None = None,
    difficulty: str | None = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Question)
    if topic and topic.lower() != "all":
        query = query.where(Question.topic.ilike(f"%{topic}%"))
    if difficulty and difficulty.lower() != "all":
        query = query.where(Question.difficulty.ilike(difficulty))
    query = query.limit(50)
    result = await db.execute(query)
    items = list(result.scalars().all())

    if not items:
        # Fall back to curated bank matching filters
        filtered = CURATED_BANK
        if topic and topic.lower() != "all":
            filtered = [q for q in filtered if topic.lower() in q["topic"].lower()]
        if difficulty and difficulty.lower() != "all":
            filtered = [q for q in filtered if difficulty.lower() == q["difficulty"].lower()]
        return [QuestionResponse(**q) for q in filtered]

    return items