# PrepAura Changelog & Patch Notes

## Release Date: September 10, 2026

### Overview

Comprehensive transformation of PrepAura into a production-grade, AI-native technical interview simulation platform featuring a Modern Antique Claymorphic aesthetic, zero-emoji policy, decoupled FastAPI backend with Argon2id authentication, and an AI-oriented documentation architecture.

---

### Key Additions & Refactorings

#### 1. AI-Native Documentation Architecture

- Restructured documentation from a single monolithic file into a modular, multi-tier hierarchy under `docs/`:
  - `AGENTS.md`: Authoritative AI development guide for Cursor, Claude Code, Gemini, and Codex.
  - `docs/product/`: Vision, requirements, rubrics, and roadmap.
  - `docs/architecture/`: System topology, frontend, backend, database, API contracts, and authentication architecture.
  - `docs/design/`: Design system tokens, UI anti-slop guidelines, and screen catalog.
  - `docs/decisions/`: ADR-001 (Decoupled Architecture), ADR-002 (SQLite Async with PostgreSQL migration path), ADR-003 (Argon2id pwdlib + JWT).
  - `docs/development/`: Local setup guide, testing procedures, and troubleshooting.
  - `docs/ai/`: Mental model context, coding rules, and change protocol.
  - `stitch_screens/README.md`: Workflow index categorizing screens into reference, generated, and implemented states.

#### 2. Backend Architecture & Authentication Stabilization

- Implemented full-fidelity FastAPI 0.115+ application with async lifespan context manager.
- Configured SQLAlchemy 2.0 Async with `aiosqlite` for zero-configuration local onboarding without database daemon dependencies.
- Replaced deprecated `passlib` with `pwdlib[argon2]` to resolve Python 3.14 compatibility (`ImportError: cannot import name 'crypt'`).
- Added robust JWT authentication pipeline (`python-jose`) with bearer token extraction and validation.
- Created `/health`, `/api/auth/register`, `/api/auth/login`, and `/api/auth/me` endpoints.
- Verified database auto-creation and table initialization (`users`, `interviews`, `interview_questions`).

#### 3. Complete Modern Antique Claymorphism Redesign

- Applied the unified palette across all 12 platform views:
  - Alabaster Canvas (`#FAF7F2`)
  - Glazed Porcelain (`#FFFFFF`)
  - Deep Lapis (`#1E1B4B`)
  - Terracotta (`#E05A47`)
  - Venetian Gilt (`#D97706`)
  - Celadon Emerald (`#0F766E`)

- Crafted tactile clay components (`ClayCard`, `Button`, `Badge`) with multi-layered outer shadows and inner glossy bevel highlights.
- Enforced typography pairing: `Fraunces` (600/700 serif) display headings with `Plus Jakarta Sans` body copy.
- Enforced strict **Zero-Emoji Directive** across all components, substituting Lucide React vector icons.

#### 4. Frontend Screen Refinements

- **Landing Page (`LandingPage.jsx`)**: Refactored into a hero-centric SaaS overview with dynamic simulation trigger and clear navigation.
- **Dedicated Public Pages**:
  - `FeaturesPage.jsx`: Platform capability breakdown.
  - `MethodologyPage.jsx`: 4-phase evaluation engine explanation.
  - `PricingPage.jsx`: Tiered subscription models with interactive FAQ.

- **Simulation Chamber Pages**:
  - `InterviewSetup.jsx`: Hardware sensor verification, track selection, seniority tuning, and interviewer demeanor profiles.
  - `InterviewSession.jsx`: Web Audio API waveform canvas visualizer, countdown timer, scratchpad with auto-save, and hint triggers.
  - `InterviewResult.jsx`: GSAP animated conviction score counter, 4-vector competency breakdown, qualitative AI debrief, and model answers.
  - `QuestionBank.jsx`: Curated question catalog with track filtering and search.
  - `History.jsx`: Historical simulation archives with score trajectories and quick inspection drawer.
  - `Analytics.jsx`: Recharts score evolution area chart, competency vector breakdown, and 7-day remediation regimen.
  - `Profile.jsx`: Operator credentials management, skill vector inventory, and CV upload parser. Fixed missing `useEffect` import.
  - `Settings.jsx`: Engine selector (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro), strictness slider, and BYOK API keys.

- **Component Polish**:
  - Resolved unreadable dark-text-on-dark-background button in `Navbar.jsx` and `button.jsx`.
  - Standardized component casing from `register.jsx` to `Register.jsx`.

#### 5. Build & Verification

- Verified production build via `npm run build`: 2,840 modules transformed with 0 errors.
- Verified backend initialization via `python -c "from app.main import app; print('OK')"`.
- Verified live dev server (`http://localhost:3000`) and FastAPI server (`http://127.0.0.1:8000`).
