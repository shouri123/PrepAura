from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_dashboard_unauthorized():
    response = client.get("/api/dashboard")
    assert response.status_code == 401


def test_analytics_overview_unauthorized():
    response = client.get("/api/analytics/overview")
    assert response.status_code == 401
