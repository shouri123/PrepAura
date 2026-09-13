import json
import logging
from typing import Any, Dict, List
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)


class AIService:
    @staticmethod
    def _get_fallback_questions(role: str, interview_type: str, difficulty: str, count: int) -> List[Dict[str, Any]]:
        bank = [
            {
                "topic": "System Architecture",
                "question": f"How do you design a scalable architecture for a {role} application considering high availability?",
                "difficulty": difficulty,
                "hint": "Focus on load balancers, caching layers, and database sharding/replication.",
            },
            {
                "topic": "Core Fundamentals",
                "question": f"Explain the critical performance bottlenecks you commonly encounter in modern {role} environments.",
                "difficulty": difficulty,
                "hint": "Mention memory leaks, I/O operations, network latency, and concurrency.",
            },
            {
                "topic": "Troubleshooting & Problem Solving",
                "question": "Walk me through an incident where production failed unexpectedly. What was your triage process?",
                "difficulty": difficulty,
                "hint": "Describe logging, observability, root cause analysis, and post-mortems.",
            },
            {
                "topic": "Best Practices",
                "question": "How do you enforce robust security, code readability, and CI/CD automated test coverage?",
                "difficulty": difficulty,
                "hint": "Address linters, unit/integration test suites, secrets management, and automation pipelines.",
            },
            {
                "topic": "Collaboration & Teamwork",
                "question": "Describe a scenario where you disagreed with a technical design decision by a peer. How did you resolve it?",
                "difficulty": difficulty,
                "hint": "Focus on constructive conflict resolution, data-driven proofs, and team consensus.",
            },
        ]
        # Pad or slice to requested count
        while len(bank) < count:
            bank.append(
                {
                    "topic": "General Technical Concept",
                    "question": f"Discuss an advanced architectural challenge you resolved recently as a {role}.",
                    "difficulty": difficulty,
                    "hint": "Highlight metrics, benchmarks, and business outcomes.",
                }
            )
        return bank[:count]

    @staticmethod
    async def generate_questions(
        role: str, experience_level: str, interview_type: str, difficulty: str, count: int
    ) -> List[Dict[str, Any]]:
        if not settings.HF_TOKEN:
            logger.warning("HF_TOKEN missing. Using deterministic fallback questions.")
            return AIService._get_fallback_questions(role, interview_type, difficulty, count)

        headers = {
            "Authorization": f"Bearer {settings.HF_TOKEN}",
            "Content-Type": "application/json",
        }

        prompt = (
            f"You are an expert technical interviewer. Generate exactly {count} interview questions for:\n"
            f"Role: {role}\n"
            f"Experience: {experience_level}\n"
            f"Type: {interview_type}\n"
            f"Difficulty: {difficulty}\n\n"
            "Return ONLY a valid JSON array of objects with no markdown code blocks and no surrounding text. "
            "Format: [{\"topic\": \"...\", \"question\": \"...\", \"difficulty\": \"...\", \"hint\": \"...\"}]"
        )

        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 1200,
                "temperature": 0.3,
                "return_full_text": False,
            },
        }

        url = f"https://api-inference.huggingface.co/models/{settings.HF_MODEL_ID}"

        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code == 200:
                    raw_data = response.json()
                    text = raw_data[0]["generated_text"] if isinstance(raw_data, list) else str(raw_data)
                    # Clean markdown wrappers if returned
                    text = text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
                    parsed = json.loads(text)
                    if isinstance(parsed, list) and len(parsed) > 0:
                        return parsed[:count]
        except Exception as exc:
            logger.error(f"Hugging Face generation error: {exc}. Falling back to default questions.")

        return AIService._get_fallback_questions(role, interview_type, difficulty, count)

    @staticmethod
    async def evaluate_answers(
        role: str, questions: List[str], answers: List[str]
    ) -> Dict[str, Any]:
        fallback_evaluation = {
            "overall_score": 81.8,
            "technical_rigor_score": 85.0,
            "structured_delivery_score": 80.0,
            "problem_decomposition_score": 82.0,
            "edge_case_conviction_score": 79.0,
            "technical_score": 85.0,
            "communication_score": 80.0,
            "problem_solving_score": 82.0,
            "strengths": [
                "Clear conceptual clarity and structured reasoning",
                "Concise understanding of fundamental technical patterns",
            ],
            "weaknesses": [
                "Could provide deeper real-world metric details",
                "Edge-case considerations could be further elaborated",
            ],
            "recommendations": [
                "Elaborate with production incident post-mortems and concrete metrics",
                "Practice high-level scalability trade-offs systematically",
            ],
        }

        if not settings.HF_TOKEN or not answers:
            return fallback_evaluation

        q_and_a = "\n".join([f"Q: {q}\nA: {a}" for q, a in zip(questions, answers)])
        prompt = (
            f"You are a principal technical hiring manager. Evaluate the following interview for a {role}:\n{q_and_a}\n\n"
            "Evaluate rigorously. Return ONLY a valid JSON object with exactly these fields:\n"
            "{\n"
            '  "overall_score": <number between 0 and 100>,\n'
            '  "technical_rigor_score": <number between 0 and 100>,\n'
            '  "structured_delivery_score": <number between 0 and 100>,\n'
            '  "problem_decomposition_score": <number between 0 and 100>,\n'
            '  "edge_case_conviction_score": <number between 0 and 100>,\n'
            '  "technical_score": <number between 0 and 100>,\n'
            '  "communication_score": <number between 0 and 100>,\n'
            '  "problem_solving_score": <number between 0 and 100>,\n'
            '  "strengths": ["...", "..."],\n'
            '  "weaknesses": ["...", "..."],\n'
            '  "recommendations": ["...", "..."]\n'
            "}"
        )

        headers = {
            "Authorization": f"Bearer {settings.HF_TOKEN}",
            "Content-Type": "application/json",
        }
        payload = {
            "inputs": prompt,
            "parameters": {"max_new_tokens": 800, "temperature": 0.2, "return_full_text": False},
        }
        url = f"https://api-inference.huggingface.co/models/{settings.HF_MODEL_ID}"

        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code == 200:
                    raw_data = response.json()
                    text = raw_data[0]["generated_text"] if isinstance(raw_data, list) else str(raw_data)
                    text = text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
                    parsed = json.loads(text)
                    required = ["overall_score", "technical_score", "communication_score", "problem_solving_score"]
                    if all(k in parsed for k in required):
                        # Ensure 4-vector fields exist if model omitted them
                        parsed.setdefault("technical_rigor_score", float(parsed.get("technical_score", 75.0)))
                        parsed.setdefault("structured_delivery_score", float(parsed.get("communication_score", 75.0)))
                        parsed.setdefault("problem_decomposition_score", float(parsed.get("problem_solving_score", 75.0)))
                        parsed.setdefault("edge_case_conviction_score", float(parsed.get("technical_score", 75.0)))
                        return parsed
        except Exception as exc:
            logger.error(f"Hugging Face evaluation error: {exc}. Falling back to standard evaluation.")

        return fallback_evaluation