from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.interview import Interview
from app.models.question import Answer, Question
from app.models.result import Result
from app.services.ai_service import AIService


class EvaluationService:

    @staticmethod
    async def evaluate_interview(
        db: AsyncSession,
        interview: Interview,
    ) -> Result:

        q_query = (
            select(Question)
            .where(Question.interview_id == interview.id)
            .order_by(Question.order_index)
        )

        questions = (
            await db.execute(q_query)
        ).scalars().all()

        a_query = (
            select(Answer)
            .where(Answer.interview_id == interview.id)
        )

        answers = (
            await db.execute(a_query)
        ).scalars().all()

        answer_map = {
            answer.question_id: answer.answer_text
            for answer in answers
        }

        question_texts = [
            question.question
            for question in questions
        ]

        answer_texts = [
            answer_map.get(
                question.id,
                "No answer provided.",
            )
            for question in questions
        ]

        eval_data = await AIService.evaluate_answers(
            interview.role,
            question_texts,
            answer_texts,
        )

        rigor = max(0.0, min(100.0, float(eval_data.get("technical_rigor_score", eval_data.get("technical_score", 75.0)))))
        delivery = max(0.0, min(100.0, float(eval_data.get("structured_delivery_score", eval_data.get("communication_score", 75.0)))))
        decomposition = max(0.0, min(100.0, float(eval_data.get("problem_decomposition_score", eval_data.get("problem_solving_score", 75.0)))))
        conviction = max(0.0, min(100.0, float(eval_data.get("edge_case_conviction_score", eval_data.get("technical_score", 75.0)))))

        weighted_overall = round(
            (rigor * 0.30) + (delivery * 0.25) + (decomposition * 0.25) + (conviction * 0.20),
            1,
        )
        overall = max(0.0, min(100.0, weighted_overall))

        question_reviews = []
        for q, a in zip(questions, answer_texts):
            has_ans = bool(a and a.strip() and a != "No answer provided.")
            q_score = round(overall if has_ans else 35.0, 1)
            critique = (
                f"Demonstrated structured perspective on {q.topic.lower()}. Consider articulating explicit capacity thresholds and recovery boundaries."
                if has_ans
                else "No substantive response recorded for this prompt query."
            )
            model_ans = (
                f"Principal engineers address {q.topic.lower()} by formulating explicit service-level objectives (SLOs), failure domains, state replication guarantees, and observable metrics."
            )
            suggestion = (
                f"Highlight concrete quantitative trade-offs and disaster recovery mechanisms when evaluating {q.topic.lower()}."
            )
            question_reviews.append({
                "question": q.question,
                "userAnswer": a,
                "score": q_score,
                "aiEvaluation": critique,
                "modelAnswer": model_ans,
                "suggestion": suggestion,
            })

        result = Result(
            interview_id=interview.id,
            overall_score=overall,
            technical_rigor_score=rigor,
            structured_delivery_score=delivery,
            problem_decomposition_score=decomposition,
            edge_case_conviction_score=conviction,
            technical_score=rigor,
            communication_score=delivery,
            problem_solving_score=decomposition,
            strengths=eval_data.get("strengths", []),
            weaknesses=eval_data.get("weaknesses", []),
            recommendations=eval_data.get(
                "recommendations",
                [],
            ),
            question_reviews=question_reviews,
        )

        db.add(result)

        await db.commit()
        await db.refresh(result)

        return result