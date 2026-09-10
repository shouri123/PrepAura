# ADR-002: Asynchronous SQLite with SQLAlchemy 2.0 and aiosqlite

## Status

Accepted

## Context

PrepAura needs persistent storage for user accounts, session telemetry, questions, and evaluation debriefs. The database layer must support:

1. Zero-friction local onboarding (no requirement to install or manage Docker containers or background PostgreSQL daemons for local development or evaluation).
2. Fully non-blocking asynchronous I/O to avoid degrading FastAPI request throughput.
3. Clean, zero-rewrite migration path to managed cloud databases (AWS RDS, Supabase, Neon PostgreSQL) for production deployment.

## Decision

We chose **SQLite 3 via `aiosqlite` and SQLAlchemy 2.0 Async**:

- Engine: `sqlite+aiosqlite:///./prepaura.db`
- Declarative models using standard SQLAlchemy `Mapped` types and `mapped_column`.
- Lifespan initialization to auto-create missing tables on startup.

## Rationale

1. **Zero-Config Onboarding**: Developers or AI agents can clone the repository, run `pip install -r requirements.txt`, and immediately start the server. The database file `prepaura.db` is initialized automatically without requiring database creation credentials.
2. **True Async I/O**: `aiosqlite` executes SQLite operations in background worker threads, preventing synchronous file locks from blocking the Python asyncio event loop.
3. **PostgreSQL Portability**: SQLAlchemy 2.0 abstracts SQL dialect differences. Migrating to PostgreSQL only requires updating the connection string to `postgresql+asyncpg://...` without altering declarative model definitions.

## Consequences

- SQLite does not support native concurrent write scaling across multiple horizontal server processes. For multi-replica production deployments, PostgreSQL with `asyncpg` must be configured.
