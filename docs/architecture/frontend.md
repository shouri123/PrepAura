# Frontend Architecture

## Technology Stack

- **Framework**: React 19.0.0 (Context7: `/reactjs/react.dev`)
- **Build Tool**: Vite 6.0.5 (ESM, HMR, port 3000)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS 3.4.16 with PostCSS and custom claymorphic utilities
- **Iconography**: Lucide React (feather-style SVG vectors)
- **Animation**: Framer Motion 11 and GSAP 3 (ScrollTrigger, TweenLite)
- **Visualization**: Recharts 2.15 (responsive area and bar charts)
- **Audio Synthesis**: Native Web Audio API (`AudioContext`, `AnalyserNode`, Canvas rendering)

---

## Directory Organization

```text
src/
├── main.jsx             # React root mount and strict mode configuration
├── App.jsx              # Routing table, layout shell, AuthProvider injection
├── index.css            # Custom fonts, clay utility classes, scrollbar styling
├── components/          # Reusable UI primitives
│   ├── Navbar.jsx       # Header bar with session state and route links
│   ├── Footer.jsx       # Platform footer
│   ├── ClayCard.jsx     # Porcelain card primitive with double bevel and outer shadow
│   ├── Button.jsx       # Beveled action button with active depression state
│   └── Badge.jsx        # Semantic status and difficulty indicator
├── context/
│   └── AuthContext.jsx  # Global session state, login/register/logout handlers
├── pages/               # Top-level route views
│   ├── LandingPage.jsx  # Hero-centric SaaS introduction
│   ├── FeaturesPage.jsx # Platform capability breakdown
│   ├── MethodologyPage.jsx # 4-phase evaluation engine explanation
│   ├── PricingPage.jsx  # Tiered subscription plans
│   ├── Dashboard.jsx    # Candidate mission control
│   ├── InterviewSetup.jsx # Role, seniority, rigor, and sensor checks
│   ├── InterviewSession.jsx # Live simulation chamber
│   ├── InterviewResult.jsx  # Score debrief and model answers
│   ├── QuestionBank.jsx # Curated prompt repository
│   ├── History.jsx      # Historical simulation logs
│   ├── Analytics.jsx    # Trajectory charts and 7-day regimen
│   ├── Profile.jsx      # Operator credentials and CV upload
│   ├── Settings.jsx     # AI engine and BYOK API keys
│   ├── Login.jsx        # Sign-in portal
│   └── Register.jsx     # Account creation portal
└── services/
    └── api.js           # Centralized Axios client with automatic Bearer token injection
```

---

## Route Hierarchy

| Route Path | View Component | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | Public | Hero-centric SaaS overview and CTA |
| `/features` | `FeaturesPage` | Public | Breakdown of simulation capabilities |
| `/methodology` | `MethodologyPage` | Public | 4-phase evaluation rubric details |
| `/pricing` | `PricingPage` | Public | Subscription tiers and enterprise options |
| `/login` | `Login` | Public | Operator sign-in portal |
| `/register` | `Register` | Public | Operator registration portal |
| `/dashboard` | `Dashboard` | Authenticated | Mission control and readiness meters |
| `/interview/setup` | `InterviewSetup` | Authenticated | Pre-simulation parameter and sensor configuration |
| `/interview/session` | `InterviewSession` | Authenticated | Live simulation with audio telemetry |
| `/interview/result/:id` | `InterviewResult` | Authenticated | Score debrief, 4-vector telemetry, and model answers |
| `/questions` | `QuestionBank` | Authenticated | Curated system design and architecture prompts |
| `/history` | `History` | Authenticated | Historical simulation audit logs |
| `/analytics` | `Analytics` | Authenticated | Longitudinal score trajectories and 7-day regimen |
| `/profile` | `Profile` | Authenticated | Operator credentials and skill vector inventory |
| `/settings` | `Settings` | Authenticated | AI engine selection and API key configuration |

---

## State Management Architecture

### Authentication Context (`AuthContext.jsx`)

The application manages session state via a lightweight React Context provider:

- `user`: Currently authenticated user object (`id`, `email`, `full_name`, `target_role`, `seniority_level`).
- `token`: Stored in `localStorage` under `prepaura_token`.
- `isAuthenticated`: Derived boolean.
- `login(email, password)`: Submits credentials to `/api/auth/login`. On success, sets token and loads user profile. If backend is unavailable, initiates a fallback mock session to ensure uninterrupted candidate evaluation.
- `register(userData)`: Submits registration to `/api/auth/register`.
- `logout()`: Clears token and user state, redirecting cleanly to `/login`.

---

## Styling & Claymorphic System

Tailwind CSS is customized with semantic theme tokens:

- **Alabaster Canvas**: `#FAF7F2` (`bg-antique-alabaster`)
- **Glazed Porcelain**: `#FFFFFF` (`bg-white` with multi-layered bevels)
- **Deep Lapis**: `#1E1B4B` (`text-antique-lapis`, `bg-antique-lapis`)
- **Terracotta Accent**: `#E05A47` (`bg-antique-terracotta`, `text-antique-terracotta`)
- **Venetian Gilt**: `#D97706` (`text-antique-gilt`)
- **Celadon Emerald**: `#0F766E` (`text-antique-celadon`)
