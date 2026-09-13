# Claude Code Context - PrepAura

This file provides reference commands, architectural patterns, and guidelines for Claude Code operating on PrepAura.

---

## Quick Commands

### Frontend

- Install dependencies: `npm install`
- Start dev server: `npm run dev` (port 5173 / proxy configured to port 8000)
- Production build: `npm run build`
- Run unit tests: `npm run test`

### Backend

- Start backend server: `cd Backend && python run.py` (or `uvicorn app.main:app --reload --port 8000`)
- Run backend tests: `cd Backend && pytest`
- Smoke test import: `cd Backend && python -c "from app.main import app; print('OK')"`

---

## Architectural Conventions

### Zero Emoji Rule (Mandatory)

- No emojis anywhere in UI text, code comments, commit messages, or documentation.
- Use `lucide-react` icons exclusively.

### Theme & Styling

- Modern Antique Claymorphic aesthetic defined in `DESIGN.md`.
- Background: `#FAF7F2`, Cards: `#FFFFFF`, Primary Accent: `#E05A47`, Authoritative Accent: `#1E1B4B`.
- Use Tailwind CSS with custom clay classes (`clay-card-antique`, `clay-btn-terracotta`).

### Dual-Mode Architecture

- Frontend must never crash if the backend is down.
- Always provide graceful fallbacks in services (`authService.js`, `interviewService.js`, `questionService.js`, `analyticsService.js`).

### Scoring Vectors (4-Vector Engine)

- Technical Rigor (30%)
- Structured Delivery (25%)
- Problem Decomposition (25%)
- Edge-Case Conviction (20%)
- `Overall = (Rigor * 0.30) + (Structure * 0.25) + (Decomposition * 0.25) + (EdgeCases * 0.20)`
