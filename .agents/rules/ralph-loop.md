# Mandatory Planning and Ralph Loop Execution Protocol

This rule governs all AI coding sessions on PrepAura when planning and executing changes.

---

## The Protocol

Whenever the user asks to fix an issue, refactor existing code, or build a new feature:

### Phase 1: Planning & User Alignment
1. **Analyze & Formulate**:
   - Deeply inspect existing implementation and architectural boundaries.
   - Formulate an implementation plan covering exact file changes, data schema alignment, and test verification strategies.
2. **Obtain Approval**:
   - Present the implementation plan to the user.
   - Wait for user approval before making modifications to source code.

### Phase 2: Autonomous Ralph Loop Execution
Once the user approves the plan ("proceed", "approve", "continue"):
1. **PRD Alignment**:
   - Ensure the plan's tasks are broken down into atomic, priority-ranked stories with testable acceptance criteria in `scripts/ralph/prd.json`.
   - Run `npm run ralph:verify` to confirm schema integrity.
2. **Iterative Execution Loop**:
   - Execute tasks in sequential priority order (`passes: false`).
   - For each task:
     a. Implement the minimal idiomatic code changes.
     b. Run automated verification gates:
        - Frontend: `npm run test` and `npm run build`.
        - Backend: `pytest` and `python -c "from app.main import app; print('OK')"`.
     c. Verify that zero emojis were introduced.
     d. Only after all checks pass with zero errors, mark the story as passed:
        `node scripts/ralph/runner.js --mark-passed <STORY-ID>`
     e. Append execution log and verification evidence into `scripts/ralph/progress.txt`.
     f. Create a clean git commit without emojis.
3. **Completion Validation**:
   - Run `npm run ralph:status` to verify that all stories in the queue are completed and passing.
   - Present a concise debrief of verified changes to the user.
