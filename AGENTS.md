# PrepAura - AI Development Guide

## Project Overview

PrepAura is an AI-powered technical interview simulation and performance calibration platform for senior, staff, and principal engineering candidates. It provides full-fidelity interview simulation with real-time audio telemetry, structured scoring rubrics, and longitudinal analytics.

This document is the authoritative development guide for AI coding agents (Claude Code, Gemini, Cursor, Codex, etc.) working on this repository. Every agent must adhere to the rules, architectural boundaries, and change protocols detailed below.

---

## Architectural Stack

### Frontend

- Framework: React 19 (Context7: `/reactjs/react.dev`)
- Tooling: Vite 6 (ESM, HMR, port 3000)
- Styling: Tailwind CSS 3.4 with custom claymorphic extensions
- Icons: Lucide React (feather-style SVGs)
- Animation: Framer Motion and GSAP (ScrollTrigger, TweenLite)
- Data Visualization: Recharts (area, bar, radar)
- Routing: React Router v7 (`react-router-dom`)
- Audio Processing: Web Audio API (real-time AnalyserNode waveform synthesis)

### Backend

- Framework: FastAPI 0.115+ (Context7: `/websites/fastapi_tiangolo`)
- ASGI Server: Uvicorn (port 8000, reload enabled in development)
- Database: SQLite 3 via SQLAlchemy 2.0 Async (`aiosqlite`)
- Password Hashing: Argon2id via `pwdlib[argon2]` (compatible with Python 3.14+)
- Authentication: JWT (`python-jose` with HS256 algorithm)
- Validation: Pydantic v2 schemas for all request/response boundaries

---

## Repository Structure

```text
PrepAura/
├── AGENTS.md                  # Authoritative instructions and rules for AI agents
├── README.md                  # Production overview, quickstart, and developer guide
├── DESIGN.md                  # Visual theme token specifications
├── index.html                 # Single page application entry point
├── package.json               # Frontend dependencies and scripts
├── vite.config.js             # Vite configuration with proxy settings
├── tailwind.config.js         # Theme color tokens, bevels, and clay shadows
├── Backend/
│   ├── run.py                 # Backend entry point (uvicorn runner)
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (JWT secret, DB URL)
│   ├── prepaura.db            # Local SQLite database instance
│   └── app/
│       ├── main.py            # FastAPI lifespan, CORS, router mounting
│       ├── core/
│       │   ├── config.py      # App settings via Pydantic BaseSettings
│       │   ├── database.py    # Async engine and sessionmaker
│       │   └── security.py    # Argon2 password hashing and JWT encoding/decoding
│       ├── models/
│       │   ├── user.py        # SQLAlchemy User entity
│       │   └── interview.py   # SQLAlchemy Interview and Question entities
│       ├── schemas/
│       │   ├── user.py        # Pydantic auth and user schemas
│       │   └── interview.py   # Pydantic interview creation and evaluation schemas
│       └── api/
│           ├── v1/
│           │   ├── api.py     # Main API router aggregating sub-routers
│           │   └── endpoints/
│           │       ├── auth.py       # Register, Login, Me endpoints
│           │       ├── interviews.py # Simulation session, answer submit, evaluation
│           │       └── analytics.py  # Historical trajectories and metrics
│           └── deps.py        # Dependency injection (db session, get_current_user)
├── src/
│   ├── main.jsx               # React DOM root render
│   ├── App.jsx                # Router configuration, layout shell, AuthProvider
│   ├── index.css              # Font declarations, clay utility classes, animations
│   ├── components/            # Reusable UI primitives and layout structures
│   │   ├── Navbar.jsx         # Navigation header with session status and quick links
│   │   ├── Footer.jsx         # Global footer with platform navigation
│   │   ├── ClayCard.jsx       # Glazed porcelain card primitive with multi-layer shadows
│   │   ├── Button.jsx         # Beveled buttons with tactile active states
│   │   └── Badge.jsx          # Semantic status and difficulty indicators
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication state, login, register, logout, fallback
│   ├── pages/                 # Full application views
│   │   ├── LandingPage.jsx    # Hero-centric SaaS introduction
│   │   ├── FeaturesPage.jsx   # Curated platform capabilities breakdown
│   │   ├── MethodologyPage.jsx# 4-phase evaluation rubric explanation
│   │   ├── PricingPage.jsx    # Tiered subscription models
│   │   ├── Dashboard.jsx      # Operator mission control and readiness gauges
│   │   ├── InterviewSetup.jsx # Role, seniority, rigor, and sensor calibration
│   │   ├── InterviewSession.jsx # Live simulation chamber with waveform and scratchpad
│   │   ├── InterviewResult.jsx  # Score debrief, competency breakdown, model answers
│   │   ├── QuestionBank.jsx   # Curated system design and architecture prompts
│   │   ├── History.jsx        # Historical simulation audit log
│   │   ├── Analytics.jsx      # Longitudinal scoring charts and 7-day regimen
│   │   ├── Profile.jsx        # Operator credentials, skill vectors, and resume parser
│   │   ├── Settings.jsx       # Engine selection, temperature, and BYOK API keys
│   │   ├── Login.jsx          # Authentication portal (sign in)
│   │   └── Register.jsx       # Operator registration (sign up)
│   └── services/
│       └── api.js             # Centralized Axios client with automatic bearer headers
├── docs/                      # Multi-layered documentation hierarchy
│   ├── product/               # Vision, requirements, rubrics
│   ├── architecture/          # End-to-end technical documentation
│   ├── design/                # Claymorphic tokens and visual guidelines
│   ├── decisions/             # Architecture Decision Records (ADRs)
│   ├── development/           # Setup, testing, and debugging guides
│   ├── ai/                    # Deep context and change protocols for agents
│   └── changelog.md           # Cumulative patch notes
└── stitch_screens/            # UI reference mockups and generated assets
```

---

## Strict Rules for AI Agents

### 1. Zero Emoji Policy (Mandatory)

- Do NOT use emojis anywhere in the codebase.
- No emojis in UI text, labels, buttons, tooltips, toasts, modals, or notifications.
- No emojis in code comments, commit messages, or markdown documentation.
- Use Lucide React SVG icons for visual indicators.

### 2. Design System and Visual Consistency

- Adhere strictly to the Modern Antique Claymorphic aesthetic defined in `DESIGN.md` and `docs/design/design-system.md`.
- Color Palette:
  - Background: Alabaster `#FAF7F2`
  - Cards: Glazed Porcelain `#FFFFFF`
  - Primary Action: Terracotta `#E05A47`
  - Accent / Authority: Deep Lapis `#1E1B4B`
  - Highlight / Warning: Venetian Gilt `#D97706`
  - Success / Verification: Celadon `#0F766E`

- Clay Elevation:
  - Outer shadow: `0 12px 28px -4px rgba(30, 27, 75, 0.08)`
  - Inner bevel: `inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 0 rgba(30, 27, 75, 0.04)`
  - Border: `1px solid rgba(224, 216, 204, 0.7)`

- Typography:
  - Serif Display: `Fraunces` (weights 600, 700)
  - Sans-Serif Body: `Plus Jakarta Sans` (weights 400, 500, 600, 700)

### 3. Component Reuse

- Reuse existing components in `src/components/` before creating new ones.
- Do not create ad-hoc styled card wrappers when `ClayCard` can be utilized.
- Use `Button` and `Badge` components for interactive and status displays.

### 4. Architectural Boundaries

- Keep business logic out of UI view components.
- Route all backend network calls through `src/services/api.js` or dedicated service modules.
- Preserve the dual-mode authentication in `AuthContext.jsx`:
  - When the FastAPI backend is online, use live JWT tokens and database persistence.
  - When the backend is unreachable, gracefully fall back to local session state with zero console crashes.

### 5. Security and Credentials

- Never hardcode secrets, private keys, or API tokens in frontend source files.
- Environment variables belong in `.env` and must be accessed via `import.meta.env` (Vite) or Pydantic `BaseSettings` (FastAPI).

### 6. API Contract Synchronization

- When modifying backend endpoints in `Backend/app/api/`, update the corresponding Pydantic schemas in `Backend/app/schemas/`.
- Update the frontend Axios caller in `src/services/api.js` and document the change in `docs/architecture/api.md`.

---

## Protocol for Making Changes

### Phase 1: Before Modifying Code

1. Read the relevant documentation in `docs/` for the feature area.
2. Inspect the existing implementation in `src/` or `Backend/`.
3. Check architectural constraints and ADRs in `docs/decisions/`.
4. Formulate the smallest minimal change that accomplishes the goal.

### Phase 2: Implementation

1. Write clean, idiomatic code adhering to PEP 8 (Python) and modern React patterns (hooks, functional components).
2. Avoid unnecessary dependencies.
3. Validate that no emojis have been introduced.

### Phase 3: Post-Modification Verification

1. Run backend automated checks or smoke tests (`python -c "from app.main import app; print('OK')"`).
2. Run frontend build verification (`npm run build`).
3. Verify affected browser pages for visual consistency and console errors.
4. Update corresponding documentation in `docs/` if architecture or behavior has changed.
