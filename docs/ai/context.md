# AI Mental Model & System Context

This document equips AI coding agents (Claude, Gemini, Cursor, Codex) with the mental model required to reason about PrepAura's architecture and design.

---

## 1. Core Domain Context

PrepAura is NOT a generic coding bootcamp or quiz app. It is an **AI-driven flight simulator for senior engineering interviews**.

- Target users: Senior Engineers, Staff Engineers, Principal Architects, and Engineering Managers.
- Problem domain: System design, high-scale distributed systems, trade-offs under CAP theorem, operational failures, and executive leadership loops.
- Tone: Rigorous, calm, antique academic craftsmanship, authoritative.

---

## 2. State & Data Flow Mental Model

```text
[ Browser Event: Start Simulation ]
             |
             v
[ React View: InterviewSetup.jsx ]
  - Gathers track, seniority, rigor, interviewer demeanor
  - Verifies Web Audio API microphone stream
             |
             v
[ Axios Service: services/api.js ]
  - Checks for JWT bearer token in localStorage
  - Sends POST /api/interviews
             |
             +---> [ Backend Online? ]
                      |
                      +-- YES --> [ FastAPI app/api/v1/endpoints/interviews.py ]
                      |             - Generates structured session ID in prepaura.db
                      |             - Returns first question prompt
                      |
                      +-- NO ---> [ Graceful Fallback Mode in Client ]
                                    - Returns curated senior architecture prompt
                                    - Emits zero unhandled console exceptions
             |
             v
[ React View: InterviewSession.jsx ]
  - Starts synchronized countdown timer
  - Mounts native Web Audio API AnalyserNode
  - Renders dynamic canvas audio waveform
  - Records speech transcription into auto-persisting scratchpad
             |
             v
[ Simulation Complete: POST /api/interviews/{id}/evaluate ]
             |
             v
[ React View: InterviewResult.jsx ]
  - Triggers GSAP animated score counters (0 -> Conviction Index)
  - Displays 4-vector breakdown cards:
      1. Technical Rigor
      2. Structured Delivery
      3. Problem Decomposition
      4. Edge-Case Conviction
  - Displays qualitative debrief and model answers
```

---

## 3. Critical Invariants

1. **Never Break the Offline Mode**: The frontend must always remain operable even if the Python process terminates. Any new API interaction in `src/pages/` or `src/services/` must have a fallback path.
2. **Never Inject Cartoon Assets or Emojis**: The user interface is strictly styled using vector icons (Lucide React) and classical typography (`Fraunces` + `Plus Jakarta Sans`).
3. **Keep Tokens Synchronized**: When adjusting color or shadows, update `tailwind.config.js`, `DESIGN.md`, and `docs/design/design-system.md` concurrently.
