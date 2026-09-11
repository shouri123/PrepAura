# PrepAura: Precision AI Interview Simulation Platform

**PrepAura** is an enterprise-grade technical interview simulation and telemetry platform designed to evaluate engineering candidates under authentic cognitive load. Calibrated against Principal and Staff Engineering rubrics from tier-1 technology organizations (Meta, Google, Stripe), PrepAura combines real-time voice interrogation, dynamic architectural trade-off analysis, and deep telemetry diagnostics.

---

## Documentation Hierarchy

PrepAura maintains an AI-native, multi-layered documentation structure:

- **[AGENTS.md](AGENTS.md)**: Authoritative developer guide and strict rules for AI coding agents.
- **[DOCUMENTATION.md](DOCUMENTATION.md)**: Master documentation index and sitemap.
- **[docs/product/](docs/product/)**: Product vision, evaluation engine rubrics, and future roadmap.
- **[docs/architecture/](docs/architecture/)**: System topology, frontend, backend, database schema, and OpenAPI contracts.
- **[docs/design/](docs/design/)**: Modern Antique Claymorphic design tokens, zero-emoji policy, and screen catalog.
- **[docs/decisions/](docs/decisions/)**: Architecture Decision Records (ADRs).
- **[docs/development/](docs/development/)**: Local development setup, smoke tests, and debugging guides.
- **[docs/ai/](docs/ai/)**: AI mental model context, coding constraints, and change protocol.
- **[docs/changelog.md](docs/changelog.md)**: Cumulative release notes and daily patches.
- **[stitch_screens/README.md](stitch_screens/README.md)**: Screen workflow index (reference -> generated -> implemented).

---

## Architecture Overview

```text
PrepAura/
├── Backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/          # REST endpoints (auth, users, interviews, questions, analytics)
│   │   ├── core/                # Config, security (Argon2, JWT), dependency injection
│   │   ├── database/            # SQLAlchemy 2.0 async engine & session management
│   │   ├── models/              # Declarative database models (User, Interview, Question, Result)
│   │   ├── schemas/             # Pydantic V2 validation schemas
│   │   ├── services/            # Business logic and AI evaluation engines
│   │   ├── utils/               # Audio, scoring, and telemetry helpers
│   │   └── main.py              # FastAPI application initialization with lifespan & CORS
│   ├── .env                     # Environment variables (Database URL, JWT keys)
│   ├── requirements.txt         # Python dependencies
│   └── run.py                   # Uvicorn entry point (port 8000)
│
├── src/
│   ├── components/
│   │   ├── layout/              # Navbar, Sidebar, Footer, DashboardLayout
│   │   └── ui/                  # Glazed porcelain claymorphic primitives (Button, Card, Badge, etc.)
│   ├── context/                 # AuthContext, InterviewContext
│   ├── hooks/                   # Custom React hooks (useAuth, useInterview)
│   ├── pages/                   # Standalone & Dashboard page views
│   │   ├── Home.jsx             # Hero-only landing page with live telemetry preview
│   │   ├── Methodology.jsx      # Standalone 4-phase evaluation engine explanation
│   │   ├── Curriculum.jsx       # Standalone focus track syllabus & modules
│   │   ├── Pricing.jsx          # Standalone tiers and membership calculator
│   │   ├── Login.jsx            # Operator authentication gateway
│   │   ├── Register.jsx         # Candidate chamber dossier creation
│   │   ├── Dashboard.jsx        # Candidate mission control
│   │   ├── InterviewSetup.jsx   # Pre-flight track, rigor, and hardware calibration
│   │   ├── Interview.jsx        # Live simulation chamber arena with waveform sync
│   │   ├── InterviewResult.jsx  # Telemetry report, GSAP score counter, debrief
│   │   ├── QuestionBank.jsx     # Curated high-yield prompt repository
│   │   ├── InterviewHistory.jsx # Historical audit logs and archives
│   │   ├── Analytics.jsx        # Longitudinal performance telemetry charts
│   │   ├── Profile.jsx          # Candidate parameters & CV upload parser
│   │   └── Settings.jsx         # Engine model & strictness configuration
│   ├── services/                # Axios API client & endpoints integration
│   ├── utils/                   # Mock fallbacks, constants, and rubrics
│   ├── App.jsx                  # Application routing & providers
│   ├── index.css                # Base reset & claymorphic token utility classes
│   └── main.jsx                 # Vite application mount
│
├── index.html                   # HTML5 root with Fraunces & Plus Jakarta Sans fonts
├── package.json                 # Node dependencies and build scripts
├── tailwind.config.js           # Modern Antique design tokens and color scales
└── vite.config.js               # Vite build configuration
```

---

## Technical Stack

### Frontend

- **Framework**: React 19 with Vite 5
- **Styling**: Tailwind CSS with custom claymorphic token extensions
- **Animation & Motion**: Framer Motion and GSAP (GreenSock Animation Platform)
- **Data Visualization**: Recharts (Longitudinal Area Charts & Competency Bars)
- **Component Primitives**: Radix UI headless components
- **Iconography**: Lucide React vector icons (Strictly zero emojis)
- **HTTP Client**: Axios with Bearer token interceptors and fallback resilience

### Backend

- **Framework**: FastAPI (ASGI) on Python 3.14
- **Validation**: Pydantic V2
- **ORM & Database**: SQLAlchemy 2.0 Async with aiosqlite (Dev) / asyncpg (PostgreSQL Prod)
- **Security & Cryptography**:
  - Argon2 password hashing via `pwdlib`
  - JWT (JSON Web Tokens) Bearer token authentication via `PyJWT`

- **Lifespan Management**: Modern async lifespan handlers for clean pool initialization and disposal
- **CORS**: FastAPI `CORSMiddleware` configured with explicit origin whitelisting

---

## Core Capabilities

1. **Hero-Centric SaaS Experience**:
   - Clean, high-impact landing page introducing the platform's core conviction without clutter.
   - Dedicated standalone pages accessible via floating navigation:
     - `/methodology`: Cognitive load testing, rubric calibration, and latency telemetry.
     - `/curriculum`: Track specifications across Distributed Systems, Frontend Architecture, ML Infrastructure, and Leadership.
     - `/pricing`: Transparent candidate and enterprise cohort tiers with annual discounting.

2. **Simulation Chamber Calibration (`/interview/setup`)**:
   - Choose target specialization tracks, seniority brackets, and evaluation rigor tiers.
   - Hardware sensor telemetry checks for 48kHz audio and 1080p video feeds.
   - Demeanor profiles: Rigorous Bar Raiser, Collaborative Staff Engineer, Benchmark Standard.

3. **Live Simulation Arena (`/interview/session`)**:
   - Sub-300ms audio stream simulation with interactive soundwave visualizer.
   - Real-time question delivery with synchronized transcription.
   - Live scratchpad for code/notes and verbatim candidate responses.
   - Instant conceptual framework hints and clean abort dialogs.

4. **Assessment Debrief & Telemetry (`/interview/result/:id`)**:
   - GSAP animated overall conviction index score dial.
   - Four-vector weighted competency progress bars (Technical Rigor, Communication, Problem Decomposition, Edge-Case Conviction).
   - Qualitative AI executive debrief and targeted growth vectors.
   - Question-by-question critique accordion with benchmark model answers.

5. **Telemetry & Longitudinal Analytics (`/analytics`)**:
   - Score evolution curve over time using Recharts area charts with terracotta gradients.
   - Domain competency spectrum horizontal bar charts.
   - Automated AI weakness diagnosis and actionable 7-day protocol.

---

## Design System: Creative Premium Modern + Antique Claymorphism

The platform utilizes a curated color palette and visual tokens designed to feel prestigious, academic, and authoritative:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Canvas / Alabaster** | `#FAF7F2` | Root page background and neutral surface |
| **Glazed Porcelain** | `#FFFFFF` | Foreground cards with dual bevel drop shadows |
| **Deep Lapis Ink** | `#1E1B4B` | Primary typography and authoritative headlines |
| **Terracotta** | `#E05A47` | Primary action triggers, buttons, and active indicators |
| **Venetian Gilt** | `#D97706` / `#B45309` | Badges, category labels, and section headings |
| **Celadon Green** | `#0F766E` | Success badges and active evaluator indicators |

### Typography

- **Headings**: `Fraunces` (Google Fonts, serif, variable optical sizing)
- **Body & Controls**: `Plus Jakarta Sans` / `Geist` (clean geometric modern sans-serif)
- **Telemetry & Numbers**: `Geist Mono` / `JetBrains Mono`

### Strict Zero-Emoji Rule

No emojis are used anywhere in the code, user interface, or documentation. All visual anchors use precision vector icons from Lucide React.

---

## Installation & Quickstart

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+ (Tested through Python 3.14)
- Git

### 1. Clone Repository

```bash
git clone https://github.com/cruzosagnik/PrepAura.git
cd PrepAura
```

### 2. Backend Setup

```bash
cd Backend

# Create and activate virtual environment (optional but recommended)
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
pip install aiosqlite email-validator pwdlib[argon2]

# Configure environment variables
# A default .env is pre-configured for instant zero-config startup:
# DATABASE_URL=sqlite+aiosqlite:///./prepaura.db
# JWT_SECRET_KEY=prepaura_secure_super_secret_jwt_key_2026_x991

# Start the FastAPI server
python run.py
```

The backend will launch at `http://127.0.0.1:8000` (API Docs at `http://127.0.0.1:8000/docs`).

### 3. Frontend Setup

In a separate terminal, navigate to the project root:

```bash
cd PrepAura

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## Environment Configuration

### Backend (`Backend/.env`)

```env
DATABASE_URL=sqlite+aiosqlite:///./prepaura.db
JWT_SECRET_KEY=prepaura_secure_super_secret_jwt_key_2026_x991
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173
```

### Frontend (`.env` or default in `src/services/api.js`)

```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```

---

## API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service health and operational status | No |
| `POST` | `/api/auth/register` | Register new candidate dossier | No |
| `POST` | `/api/auth/login` | Authenticate and issue JWT Bearer token | No |
| `GET` | `/api/auth/me` | Fetch authenticated candidate profile | Yes (Bearer) |
| `GET` | `/api/questions` | List curated interview prompt catalog | Optional |
| `POST` | `/api/interviews/start` | Initialize simulation chamber session | Yes (Bearer) |
| `POST` | `/api/interviews/complete` | Complete session and compile debrief | Yes (Bearer) |
| `GET` | `/api/interviews/history` | Retrieve historical session audit logs | Yes (Bearer) |
| `GET` | `/api/results/:id` | Fetch quantitative telemetry debrief | Yes (Bearer) |
| `GET` | `/api/analytics` | Fetch longitudinal competency metrics | Yes (Bearer) |

---

## Production Build Verification

To validate the production bundle for deployment:

```bash
npm run build
```

Vite compiles all static assets into `dist/` with zero lint or build errors.

---

## Maintainers

- **Author**: Sagnik Ganguly (`@cruzosagnik`)
- **Organization**: PrepAura Systems Corp.
- **License**: MIT
