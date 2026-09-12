# Ralph Autonomous Workflow Guide for PrepAura

Ralph is an autonomous development harness that drives AI coding agents (Claude Code, Amp, Antigravity) through an iterative implementation loop against a structured Product Requirements Document (`prd.json`).

---

## Directory Structure

```text
scripts/ralph/
├── prd.json         # Structured backlog of user stories and acceptance criteria
├── progress.txt     # Append-only audit log tracking changes and test verifications
├── prompt.md        # Core prompt directing the agent's behavior during each cycle
├── CLAUDE.md        # Quick reference guidelines, build commands, and rules for Claude Code
├── ralph.sh         # Bash runner for Linux, macOS, WSL, or Git Bash
├── ralph.ps1        # Native Windows PowerShell runner
└── README.md        # This workflow documentation
```

---

## How It Works

1. **Inspection**: In each iteration, the runner checks `prd.json` for stories where `"passes": false`.
2. **Selection**: The agent selects the highest-priority incomplete story and makes the required code changes.
3. **Verification**: The agent executes tests (`npm test`, `npm run build`, and `pytest`).
4. **Progression**: Only when tests pass cleanly does the agent update `prd.json` to `"passes": true`, record notes in `progress.txt`, and create a git commit.
5. **Termination**: When all stories pass, the loop exits automatically.

---

## Usage Instructions

### Running on Windows (PowerShell)

Open PowerShell in the project root:

```powershell
# Run with default settings (Claude Code, up to 20 iterations)
powershell -ExecutionPolicy Bypass -File scripts\ralph\ralph.ps1

# Run with Amp CLI
powershell -ExecutionPolicy Bypass -File scripts\ralph\ralph.ps1 -Tool amp

# Set a custom iteration limit
powershell -ExecutionPolicy Bypass -File scripts\ralph\ralph.ps1 -MaxIterations 10
```

### Running on Unix / WSL / Git Bash

```bash
# Ensure execution permissions
chmod +x scripts/ralph/ralph.sh

# Run with Claude Code
./scripts/ralph/ralph.sh

# Run with Amp
./scripts/ralph/ralph.sh --tool amp

# Run with custom iteration limit
./scripts/ralph/ralph.sh --max-iterations 10
```

---

## Seeded Task Backlog in `prd.json`

| Story ID | Priority | Description |
| :--- | :--- | :--- |
| `STORY-001` | 1 | Fix Hugging Face URL syntax and missing `HTTPException` import in Backend |
| `STORY-002` | 2 | Implement backend `/api/dashboard` endpoint |
| `STORY-003` | 3 | Align Question Bank API routes and query parameters |
| `STORY-004` | 4 | Normalize interview result retrieval and frontend result debrief schema |
| `STORY-005` | 5 | Upgrade database model and evaluation engine to 4-vector scoring |
| `STORY-006` | 6 | Implement real Web Audio API waveform telemetry in Interview chamber |
| `STORY-007` | 7 | Implement Web Speech API transcription in scratchpad |
| `STORY-008` | 8 | Implement session crash recovery in `InterviewContext` |
| `STORY-009` | 9 | Connect Analytics view to live backend overview endpoint |
| `STORY-010` | 10 | Implement user profile persistence and settings storage |

---

## Rules & Constraints

- **Zero Emoji Policy**: Strictly enforced across all code, prompts, commits, and logs.
- **Continuous Validation**: Never mark a story as passing in `prd.json` without running both frontend and backend verification tests.
- **Dual-Mode Architecture**: Preserve graceful fallbacks in services if the backend server is unreachable.
