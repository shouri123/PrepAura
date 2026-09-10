# Product Requirements & Evaluation Engine

## Functional Requirements

### 1. Simulation Setup Chamber (`/interview/setup`)

- The candidate must configure:
  - Role Track: Distributed Systems, Frontend Architecture, AI & ML Infrastructure, Engineering Leadership.
  - Seniority Level: Junior, Mid-Level, Senior, Staff/Principal.
  - Evaluation Rigor: Standard (Easy), Elevated (Medium), Stress-Test (Hard).
  - Interviewer Demeanor: Rigorous Bar Raiser, Collaborative Staff Engineer, Benchmark Standard.

- Sensor Telemetry:
  - Must verify Web Audio API microphone stream availability.
  - Must display real-time decibel or audio capture indicator before initiating the session.
  - Camera verification option (1080p preview capability).

### 2. Live Simulation Chamber (`/interview/session`)

- Active audio telemetry with real-time animated waveform synthesis.
- Synchronized interview timer with per-question countdown.
- Live scratchpad supporting verbatim voice-to-text transcription and keystroke logging with auto-persistence.
- Contextual hint triggers that introduce realistic interviewer nudges without terminating the session.
- Graceful session completion or abort handling with confirmation safeguards.

### 3. Assessment Telemetry & Debrief (`/interview/result/:id`)

- Scoring Engine computes four primary competency vectors (scale: 0-100):
  - **Technical Rigor (30%)**: Correctness of distributed algorithms, consistency model selections, trade-off depth.
  - **Structured Delivery (25%)**: Adherence to STAR or First Principles frameworks, communication economy, lack of filler words.
  - **Problem Decomposition (25%)**: Ability to break down ambiguous business requirements into isolated services and contracts.
  - **Edge-Case Conviction (20%)**: Handling network partitions, poison pills, concurrency race conditions, and graceful degradation.

- Qualitative AI Debrief:
  - Executive summary summarizing the candidate's performance.
  - Verified demonstrated strengths with specific transcript citations.
  - Targeted growth vectors with concrete technical recommendations.
  - Question-by-question critique accordion with side-by-side benchmark model answers.

### 4. Longitudinal Performance Telemetry (`/analytics`)

- Longitudinal area chart tracking historical session conviction scores over time.
- Categorical radar or bar chart representing relative strength across the four competency vectors.
- Automated 7-day remediation regimen outlining targeted papers, design patterns, and mock topics to review based on detected deficiencies.

---

## Business Rules & Edge Cases

1. **Session Interruption**:
   - If a candidate accidentally navigates away during a live session, the scratchpad content is preserved in browser local storage for immediate recovery.

2. **Dual-Mode Backend Resilience**:
   - If the FastAPI backend is running, all telemetry and evaluation results persist to `prepaura.db`.
   - If the backend is unreachable, the frontend falls back seamlessly to client-side evaluation models without blocking the candidate or generating console errors.

3. **Scoring Bounds**:
   - Scores must always reside within the integer range `[0, 100]`.
   - Weighted overall score is computed as:
     `Overall = (Rigor * 0.30) + (Structure * 0.25) + (Decomposition * 0.25) + (EdgeCases * 0.20)`
