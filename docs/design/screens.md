# Application Screen Catalog

PrepAura comprises 12 primary view screens, structured to transition candidates from initial orientation to full-fidelity simulation and longitudinal analysis.

---

## Screen Inventory

| Screen # | Route | Component File | Purpose & Primary Interactions |
| :--- | :--- | :--- | :--- |
| **01** | `/` | `src/pages/LandingPage.jsx` | Hero-centric SaaS introduction, platform value pillars, dynamic demo triggers, and quick entry into simulation. |
| **02** | `/login` | `src/pages/Login.jsx` | Operator sign-in portal with Argon2 authentication, session persistence, and offline fallback notice. |
| **03** | `/register` | `src/pages/Register.jsx` | Candidate registration with target track, seniority level, and credential creation. |
| **04** | `/interview/setup` | `src/pages/InterviewSetup.jsx` | Chamber parameter calibration: role specialization, seniority bracket, evaluation rigor, demeanor, and audio sensor test. |
| **05** | `/interview/session` | `src/pages/InterviewSession.jsx` | Live simulation chamber: Web Audio API waveform visualizer, synchronized question timer, verbatim scratchpad, and hint triggers. |
| **06** | `/interview/result/:id` | `src/pages/InterviewResult.jsx` | Assessment debrief: overall conviction score, 4-vector breakdown, qualitative AI critique, demonstrated strengths, and benchmark model answers. |
| **07** | `/dashboard` | `src/pages/Dashboard.jsx` | Operator mission control: current readiness index, recent simulation history, upcoming sessions, and quick actions. |
| **08** | `/questions` | `src/pages/QuestionBank.jsx` | Curated catalog of system design, architecture, and behavioral prompts with search and track filtering. |
| **09** | `/history` | `src/pages/History.jsx` | Chronological simulation archives with score trajectories, status indicators, and one-click debrief inspection. |
| **10** | `/analytics` | `src/pages/Analytics.jsx` | Longitudinal analytics: Recharts score evolution area chart, competency vector breakdown, and 7-day actionable remediation regimen. |
| **11** | `/profile` | `src/pages/Profile.jsx` | Operator dossier: credentials management, target role configuration, skill vector inventory, and CV upload parser. |
| **12** | `/settings` | `src/pages/Settings.jsx` | Chamber preferences: AI engine selector (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro), temperature slider, and local BYOK API keys. |
