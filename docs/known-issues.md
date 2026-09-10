# Known Issues & Technical Debt Register

This document tracks known limitations, intentional trade-offs, and upcoming fixes in PrepAura.

---

## Active Issues & Workarounds

### 1. Web Audio Permission Prompt in Non-HTTPS Environments

- **Impact**: When accessing the development server via a remote IP rather than `localhost`, browsers may block microphone permissions for the live waveform visualizer.
- **Workaround**: Access the development server exclusively via `http://localhost:3000` or configure an SSL reverse proxy with valid TLS certificates.
- **Scheduled Fix**: Phase 2 will introduce an audio fallback mock stream with synthetic sinusoidal waveform generation for headless testing.

### 2. SQLite Concurrent Write Contention

- **Impact**: Under heavy simulated concurrent load across multiple browser tabs, SQLite can occasionally throw write lock exceptions.
- **Workaround**: Single-user local development is unaffected.
- **Scheduled Fix**: Documented in ADR-002; production migration to PostgreSQL with `asyncpg` resolves this completely.

### 3. JWT Revocation Without Centralized Cache

- **Impact**: Once issued, JWT tokens remain valid until their expiration timestamp (default: 7 days) and cannot be invalidated on the server side if compromised.
- **Workaround**: Shorten `ACCESS_TOKEN_EXPIRE_MINUTES` in `Backend/.env` for elevated security environments.
- **Scheduled Fix**: Implementation of a Redis token blocklist in Phase 3.
