---
name: ralph
description: Autonomous loop execution skill for driving PRD-based iterative development in PrepAura. Use this skill when asked to execute, iterate through, or manage the Ralph development loop.
---

# Ralph Loop Execution Skill

This skill governs the execution of autonomous, test-verified development loops using the Ralph harness in PrepAura.

## When to Use This Skill

Activate this skill when:

- The user requests to run the Ralph loop or implement items from the PRD.
- Working on iterative feature implementation or platform hardening.
- Updating or verifying the status of stories in `scripts/ralph/prd.json`.
- Logging completion notes in `scripts/ralph/progress.txt`.

---

## Workflow Commands

- Inspect backlog status:
  `npm run ralph:status`
- Validate PRD syntax and story integrity:
  `npm run ralph:verify`
- Mark a story as completed:
  `node scripts/ralph/runner.js --mark-passed <STORY-ID>`
- Run the autonomous loop on Windows:
  `powershell -ExecutionPolicy Bypass -File scripts\ralph\ralph.ps1`
- Run the autonomous loop on Bash / Unix / WSL:
  `bash scripts/ralph/ralph.sh`

---

## Execution Protocol (Single Story per Cycle)

When acting within the Ralph workflow, agents must follow this strict cycle:

### 1. State Inspection

1. Read `scripts/ralph/prd.json` and `scripts/ralph/progress.txt`.
2. Identify the first incomplete story where `"passes": false` (ordered by priority).
3. Review its specific acceptance criteria.

### 2. Implementation

1. Review architectural boundaries in `AGENTS.md` and design tokens in `DESIGN.md`.
2. Zero-Emoji Rule: Verify that no emojis are introduced in UI text, code, comments, or documentation.
3. Write clean, idiomatic code adhering to PEP 8 (Python) and React 19 functional hooks.
4. Keep modifications focused strictly on the selected story.

### 3. Automated Verification

Run the relevant automated verification commands:

- Frontend changes:
  - `npm run test`
  - `npm run build`
- Backend changes:
  - `pytest` (from within `Backend/` directory)
  - `python -c "from app.main import app; print('OK')"` (from within `Backend/` directory)

### 4. Progress Logging & Commitment

Only after all tests pass with zero errors:

1. Mark the story as passed:
   `node scripts/ralph/runner.js --mark-passed <STORY-ID>`
2. Append execution notes into `scripts/ralph/progress.txt`:
   - Story ID and Title
   - Modified files
   - Test results
3. Commit the changes cleanly:
   `git add . && git commit -m "feat(chamber): <concise-description>"`
