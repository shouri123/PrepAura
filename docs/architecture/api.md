# API Specifications & Contracts

## Base URL

- Development: `http://127.0.0.1:8000/api`
- Frontend Proxy: Any call to `/api/*` from the Vite dev server (`http://localhost:3000`) is forwarded to the backend.

---

## Authentication Endpoints (`/api/auth`)

### 1. Register User

- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Request Body**:
  ```json
  {
    "email": "candidate@prepaura.ai",
    "password": "SecurePassword123!",
    "full_name": "Elena Rostova",
    "target_role": "Staff Distributed Systems Architect",
    "seniority_level": "Staff"
  }
  ```

- **Response** (`201 Created`):
  ```json
  {
    "id": 1,
    "email": "candidate@prepaura.ai",
    "full_name": "Elena Rostova",
    "target_role": "Staff Distributed Systems Architect",
    "seniority_level": "Staff",
    "created_at": "2026-09-10T12:00:00Z",
    "is_active": true
  }
  ```

- **Errors**: `400 Bad Request` if email is already registered.

### 2. Login (Token Exchange)

- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "candidate@prepaura.ai",
    "password": "SecurePassword123!"
  }
  ```

- **Response** (`200 OK`):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "token_type": "bearer",
    "user": {
      "id": 1,
      "email": "candidate@prepaura.ai",
      "full_name": "Elena Rostova",
      "target_role": "Staff Distributed Systems Architect",
      "seniority_level": "Staff"
    }
  }
  ```

- **Errors**: `401 Unauthorized` if invalid email or password.

### 3. Current User Profile

- **Method**: `GET`
- **Endpoint**: `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "id": 1,
    "email": "candidate@prepaura.ai",
    "full_name": "Elena Rostova",
    "target_role": "Staff Distributed Systems Architect",
    "seniority_level": "Staff"
  }
  ```

- **Errors**: `401 Unauthorized` if token is missing or expired.

---

## Interview Endpoints (`/api/interviews`)

### 1. Create Simulation Session

- **Method**: `POST`
- **Endpoint**: `/api/interviews`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "role_track": "Distributed Systems",
    "seniority": "Staff",
    "rigor": "Elevated",
    "interviewer_demeanor": "Rigorous Bar Raiser"
  }
  ```

- **Response** (`201 Created`):
  ```json
  {
    "id": 42,
    "status": "created",
    "role_track": "Distributed Systems",
    "seniority": "Staff",
    "rigor": "Elevated",
    "created_at": "2026-09-10T12:30:00Z",
    "questions": [
      {
        "order": 1,
        "prompt": "Design a globally distributed idempotency key service capable of 500k writes/sec with strict linearizability."
      }
    ]
  }
  ```

### 2. Submit Question Answer

- **Method**: `POST`
- **Endpoint**: `/api/interviews/{id}/answer`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "question_order": 1,
    "candidate_answer": "I will decompose this into an edge gateway layer, a Raft-replicated metadata registry...",
    "duration_seconds": 185
  }
  ```

- **Response** (`200 OK`):
  ```json
  {
    "status": "recorded",
    "question_order": 1,
    "next_question_available": true
  }
  ```

### 3. Complete & Evaluate Simulation

- **Method**: `POST`
- **Endpoint**: `/api/interviews/{id}/evaluate`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "id": 42,
    "status": "completed",
    "overall_score": 88,
    "competencies": {
      "technical_rigor": 91,
      "structured_delivery": 85,
      "problem_decomposition": 89,
      "edge_case_conviction": 84
    },
    "executive_summary": "Demonstrated exceptional grasp of quorum write amplification and distributed lease timeouts.",
    "demonstrated_strengths": [
      "Rigorous defense of Raft election lease timeouts under WAN jitter",
      "Immediate scoping of read vs. write amplification trade-offs"
    ],
    "growth_vectors": [
      "Explicitly account for split-brain fencing tokens when delegating lock leases"
    ]
  }
  ```

---

## Analytics Endpoints (`/api/analytics`)

### 1. Longitudinal History & Trajectory

- **Method**: `GET`
- **Endpoint**: `/api/analytics/history`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`): Returns array of past simulation records with overall score, competencies, and timestamps.
