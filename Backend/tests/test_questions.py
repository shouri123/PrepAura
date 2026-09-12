from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_question_bank_unauthorized():
    response = client.get("/api/questions/bank")
    assert response.status_code == 401


def test_questions_unauthorized():
    response = client.get("/api/questions")
    assert response.status_code == 401