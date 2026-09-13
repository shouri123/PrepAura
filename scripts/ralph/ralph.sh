#!/usr/bin/env bash
# ==============================================================================
# Ralph Autonomous Loop Runner (Bash / Unix / WSL / macOS)
# Project: PrepAura
# Objective: Repeatedly run AI coding agent until all PRD stories pass.
# Strict Rule: Zero emoji policy.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
PRD_FILE="${SCRIPT_DIR}/prd.json"
PROMPT_FILE="${SCRIPT_DIR}/prompt.md"
PROGRESS_FILE="${SCRIPT_DIR}/progress.txt"
LOG_FILE="${SCRIPT_DIR}/ralph.log"

MAX_ITERATIONS=20
TOOL="claude"

# Parse CLI flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --max-iterations|-n)
      MAX_ITERATIONS="$2"
      shift 2
      ;;
    --tool|-t)
      TOOL="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: ./ralph.sh [--max-iterations N] [--tool claude|amp]"
      exit 0
      ;;
    *)
      echo "Unknown flag: $1"
      exit 1
      ;;
  esac
done

if [[ ! -f "$PRD_FILE" ]]; then
  echo "[ERROR] PRD file not found at: $PRD_FILE"
  exit 1
fi

if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "[ERROR] Prompt file not found at: $PROMPT_FILE"
  exit 1
fi

cd "$PROJECT_ROOT"

echo "================================================================================"
echo "[RALPH] Starting PrepAura Autonomous Development Loop"
echo "[RALPH] Project Root: $PROJECT_ROOT"
echo "[RALPH] Selected Tool: $TOOL"
echo "[RALPH] Max Iterations: $MAX_ITERATIONS"
echo "================================================================================"

# Helper to check if all PRD stories pass
check_completion() {
  node -e '
    const fs = require("fs");
    const prd = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const pending = prd.userStories.filter(s => !s.passes);
    if (pending.length === 0) {
      process.exit(0);
    } else {
      console.log(`[RALPH] Pending stories remaining: ${pending.length} (Next: ${pending[0].id} - ${pending[0].title})`);
      process.exit(1);
    }
  ' "$PRD_FILE"
}

for ((i = 1; i <= MAX_ITERATIONS; i++)); do
  echo ""
  echo "--------------------------------------------------------------------------------"
  echo "[RALPH] Iteration $i of $MAX_ITERATIONS - $(date '+%Y-%m-%d %H:%M:%S')"
  echo "--------------------------------------------------------------------------------"

  # Check if already complete before running
  if check_completion; then
    echo ""
    echo "================================================================================"
    echo "[RALPH] SUCCESS: All user stories in PRD have passed!"
    echo "================================================================================"
    exit 0
  fi

  PROMPT_CONTENT=$(cat "$PROMPT_FILE")

  echo "[RALPH] Invoking $TOOL with prompt..."
  case "$TOOL" in
    claude)
      if ! command -v claude &> /dev/null; then
        echo "[ERROR] 'claude' CLI command not found. Please ensure Claude Code is installed and in your PATH."
        exit 1
      fi
      claude --print "$PROMPT_CONTENT" 2>&1 | tee -a "$LOG_FILE"
      ;;
    amp)
      if ! command -v amp &> /dev/null; then
        echo "[ERROR] 'amp' CLI command not found. Please ensure Amp CLI is installed and in your PATH."
        exit 1
      fi
      amp run "$PROMPT_CONTENT" 2>&1 | tee -a "$LOG_FILE"
      ;;
    *)
      echo "[ERROR] Unsupported tool '$TOOL'. Supported tools: claude, amp"
      exit 1
      ;;
  esac

  # Verify if the completion marker was emitted
  if check_completion; then
    echo ""
    echo "================================================================================"
    echo "[RALPH] SUCCESS: All user stories completed after iteration $i!"
    echo "================================================================================"
    exit 0
  fi

  echo "[RALPH] Iteration $i finished. Cooling down for 3 seconds..."
  sleep 3
done

echo ""
echo "================================================================================"
echo "[RALPH] WARNING: Reached max iteration limit ($MAX_ITERATIONS). Check progress.txt."
echo "================================================================================"
exit 1
