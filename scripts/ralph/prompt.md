# Ralph Autonomous Agent Directive

You are working on **PrepAura**, an AI-powered technical interview simulation platform.
Your objective in this cycle is to implement and thoroughly verify the single next incomplete user story from the project PRD.

---

## Strict Behavioral Rules

1. **Zero Emoji Policy (Mandatory)**:
   - Do NOT use emojis anywhere in the codebase.
   - No emojis in UI text, labels, buttons, tooltips, toasts, modals, or notifications.
   - No emojis in code comments, commit messages, logs, or documentation.
   - Use Lucide React SVG icons for visual indicators.

2. **Design System & Aesthetics**:
   - Maintain the Modern Antique Claymorphic aesthetic defined in `DESIGN.md`.
   - Palette: Alabaster `#FAF7F2`, Glazed Porcelain `#FFFFFF`, Terracotta `#E05A47`, Deep Lapis `#1E1B4B`, Venetian Gilt `#D97706`, Celadon `#0F766E`.
   - Typography: Fraunces (serif display), Plus Jakarta Sans (body).

3. **Architectural Boundaries**:
   - Route all network calls through `src/services/` modules.
   - Maintain dual-mode resilience (graceful client-side fallback if backend is offline).
   - Ensure backend schemas in `Backend/app/schemas/` and SQLAlchemy models in `Backend/app/models/` remain synchronized.

---

## Execution Protocol for This Iteration

Follow this sequence in order:

### 1. Inspect State

- Read `scripts/ralph/prd.json`.
- Read the latest entries in `scripts/ralph/progress.txt`.
- Identify the first user story with `"passes": false` (ordered by priority).
- If **all** user stories in `prd.json` have `"passes": true`, output:
  `ALL USER STORIES COMPLETED. <RALPH_COMPLETE>`
  and finish immediately.

### 2. Implement the Selected Story

- Inspect the affected files in `src/` or `Backend/`.
- Make the minimal idiomatic code changes required to satisfy all acceptance criteria for that single story.
- Do NOT attempt multiple stories in a single cycle. Focus entirely on the selected story.

### 3. Verify Changes

- Run automated verification:
  - If frontend files were modified:
    - Run: `npm run test`
    - Run: `npm run build`
  - If backend files were modified:
    - Run: `pytest` (from within `Backend/` directory)
    - Run: `python -c "from app.main import app; print('OK')"` (from within `Backend/` directory)
- Verify zero emojis were introduced.

### 4. Record Progress & Commit

- Only after all automated checks pass cleanly:
  - Update `scripts/ralph/prd.json`: change the completed story's `"passes"` field to `true`.
  - Append an entry to `scripts/ralph/progress.txt` detailing:
    - Story ID and title
    - Files modified/created
    - Test results
  - Create a git commit with a descriptive message (no emojis), e.g.:
    `git add . && git commit -m "feat(chamber): <concise-description-of-change>"`

### 5. Exit

- Output a concise summary of what was completed and verified.
