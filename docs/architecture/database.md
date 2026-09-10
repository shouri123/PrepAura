# Database Architecture

## Persistence Engine

- **Default Engine**: SQLite 3
- **Async Driver**: `aiosqlite`
- **Connection URL**: `sqlite+aiosqlite:///./prepaura.db`
- **ORM Layer**: SQLAlchemy 2.0 (`AsyncAttrs`, `DeclarativeBase`, `Mapped`, `mapped_column`)

---

## Entity Relationship Schema

```text
+-----------------------+           +-----------------------------+
|         users         |           |         interviews          |
+-----------------------+           +-----------------------------+
| id (PK, Integer)      | 1       * | id (PK, Integer)            |
| email (String, Unique)|<--------->| user_id (FK -> users.id)    |
| hashed_password (Str) |           | role_track (String)         |
| full_name (String)    |           | seniority (String)          |
| target_role (String)  |           | rigor (String)              |
| seniority_level (Str) |           | status (String)             |
| created_at (DateTime) |           | overall_score (Integer)     |
| is_active (Boolean)   |           | feedback_json (Text/JSON)   |
+-----------------------+           | created_at (DateTime)       |
                                    +-----------------------------+
                                                   | 1
                                                   |
                                                   | *
                                    +-----------------------------+
                                    |     interview_questions     |
                                    +-----------------------------+
                                    | id (PK, Integer)            |
                                    | interview_id (FK)           |
                                    | question_order (Integer)    |
                                    | prompt (Text)               |
                                    | candidate_answer (Text)     |
                                    | score (Integer)             |
                                    | critique (Text)             |
                                    +-----------------------------+
```

---

## Table Definitions

### 1. `users` Table

Stores candidate credentials, profile configuration, and audit timestamps:

- `id`: Auto-incrementing primary key.
- `email`: Normalized lowercase unique index.
- `hashed_password`: Secure Argon2id digest string.
- `full_name`: Candidate's display name.
- `target_role`: Candidate's current focus (e.g., "Staff Distributed Systems Architect").
- `seniority_level`: Enum-backed string ("Junior", "Mid-Level", "Senior", "Staff").
- `created_at`: Timestamp (UTC).
- `is_active`: Boolean flag for account access control.

### 2. `interviews` Table

Stores simulation chamber sessions and aggregate calibration results:

- `id`: Auto-incrementing primary key.
- `user_id`: Foreign key referencing `users.id` with cascade deletion.
- `role_track`: Target technical specialization.
- `seniority`: Evaluation seniority bracket.
- `rigor`: Rigor level applied ("Standard", "Elevated", "Stress-Test").
- `status`: Session lifecycle state ("created", "in_progress", "completed", "aborted").
- `overall_score`: Integer conviction score in the range `[0, 100]`.
- `feedback_json`: Serialized JSON storing the qualitative debrief, demonstrated strengths, growth vectors, and competency breakdowns.
- `created_at`: Timestamp (UTC).

### 3. `interview_questions` Table

Stores granular, question-by-question candidate answers and critique data:

- `id`: Auto-incrementing primary key.
- `interview_id`: Foreign key referencing `interviews.id`.
- `question_order`: 1-based sequential question index within the interview.
- `prompt`: Architectural question presented to the candidate.
- `candidate_answer`: Candidate's transcribed speech or scratchpad text.
- `score`: Individual question score `[0, 100]`.
- `critique`: Actionable evaluation and model benchmark answer.

---

## Migration Path to PostgreSQL

The codebase uses SQLAlchemy 2.0 standard declarative mappings with no SQLite-specific vendor lock-in. To migrate to managed PostgreSQL:

1. Update `Backend/requirements.txt` to include `asyncpg`.
2. Modify `DATABASE_URL` in `Backend/.env`:
   ```env
   DATABASE_URL=postgresql+asyncpg://user:password@host:5432/prepaura
   ```

3. Initialize Alembic for version-controlled migration scripts (`alembic init -t async migrations`).
