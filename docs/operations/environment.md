# Environment Variables Reference

This document catalogs all environment variables used across development, staging, and production environments.

---

## Backend Environment Variables (`Backend/.env`)

| Variable Name | Required | Default in Development | Production Recommendation | Description |
| :--- | :--- | :--- | :--- | :--- |
| `SECRET_KEY` | Yes | `prepaura-simulation-ultra-secure-key-2026-precision-jwt` | 64-byte cryptographically secure random hex string | Key used to sign and verify HMAC-SHA256 JWT tokens. |
| `DATABASE_URL` | Yes | `sqlite+aiosqlite:///./prepaura.db` | `postgresql+asyncpg://user:pass@host:5432/prepaura` | Connection string for SQLAlchemy async engine. |
| `ENVIRONMENT` | No | `development` | `production` | Runtime mode (`development`, `staging`, `production`). Controls debug detail. |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `10080` (7 days) | `1440` (24 hours) | Token validity window before candidate must re-authenticate. |
| `ALLOWED_ORIGINS` | No | `http://localhost:3000,http://127.0.0.1:3000` | `https://prepaura.ai,https://app.prepaura.ai` | Comma-separated list of origins permitted by CORS middleware. |

---

## Frontend Environment Variables (`.env`)

| Variable Name | Required | Default in Development | Production Recommendation | Description |
| :--- | :--- | :--- | :--- | :--- |
| `VITE_API_URL` | No | `/api` | `/api` or `https://api.prepaura.ai/api` | Base URL for Axios network calls. In development, forwarded via Vite proxy. |
| `VITE_USE_MOCK` | No | `false` | `false` | When true, forces client-side mock evaluation for offline testing. |

---

## Security Best Practices

- Never commit `.env` containing production credentials to version control.
- Ensure `.env` is listed in `.gitignore`.
- Provide `.env.example` as a template with dummy values for onboarding.
