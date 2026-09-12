---
name: prd
description: Product Requirements Document skill for authoring, grooming, and validating structured prd.json backlogs for autonomous development loops. Use this skill when creating or updating PRDs.
---

# PRD Skill

This skill defines the format, authoring rules, and grooming guidelines for Product Requirements Documents (`prd.json`) driving autonomous loops in PrepAura.

## When to Use This Skill

Activate this skill when:

- Creating a new PRD backlog for a feature or refactoring milestone.
- Breaking down high-level requirements into small, testable user stories.
- Grooming acceptance criteria for incomplete tasks.
- Validating the structural integrity of `scripts/ralph/prd.json`.

---

## PRD Schema Specification

A valid `prd.json` must adhere to the following schema:

```json
{
  "project": "PrepAura",
  "branchName": "feature/branch-name",
  "description": "High-level goal of this milestone",
  "userStories": [
    {
      "id": "STORY-001",
      "title": "Concise imperative summary of the change",
      "description": "Detailed context, technical problem, and desired outcome.",
      "priority": 1,
      "passes": false,
      "acceptanceCriteria": [
        "Concrete testable condition 1",
        "Concrete testable condition 2",
        "Automated verification command passes"
      ]
    }
  ]
}
```

---

## Authoring Guidelines

1. **Atomic Story Sizing**:
   - Each story must be small enough for an AI agent to implement, verify, and commit within a single execution cycle (typically 1 to 5 files modified).
   - If a story touches both DB schemas, multiple backend routes, and full frontend UI, decompose it into 2–3 sequenced stories.

2. **Deterministic Acceptance Criteria**:
   - Every story must specify unambiguous, verifiable criteria.
   - Mention the exact files, expected HTTP status codes, function names, and verification commands (`npm test`, `pytest`, `npm run build`).

3. **Priority Ordering**:
   - Number priorities sequentially starting at `1`.
   - Critical bugs and backend dependencies must always precede frontend consumer views.

4. **Zero Emoji Rule**:
   - Do NOT include emojis in story titles, descriptions, or acceptance criteria.

5. **Validation**:
   - Always validate the file after editing:
     `npm run ralph:verify`
