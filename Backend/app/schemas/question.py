from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class QuestionBase(BaseModel):
    topic: str
    question: str
    difficulty: str
    hint: str | None = None
    order_index: int = 0
    role: str | None = "Engineering"
    timeEstimate: str | None = "3 mins"


class QuestionCreate(QuestionBase):
    pass


class QuestionResponse(QuestionBase):
    id: int
    interview_id: int | None = None

    model_config = ConfigDict(from_attributes=True)


class AnswerCreate(BaseModel):
    question_id: int
    answer_text: str = Field(..., min_length=1)


class AnswerResponse(BaseModel):
    id: int
    interview_id: int
    question_id: int
    answer_text: str
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)