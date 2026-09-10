# AI Change Protocol

Follow this 5-step operational protocol whenever you make modifications to the PrepAura repository:

---

## Step 1: Read & Understand

1. Review `AGENTS.md` at the root.
2. Read the relevant documentation in `docs/` (e.g., `docs/architecture/api.md` if changing an endpoint, or `docs/design/design-system.md` if modifying UI styling).
3. Review related Architecture Decision Records (ADRs) in `docs/decisions/`.

---

## Step 2: Locate Existing Patterns

1. Search the codebase for similar existing implementations before writing new logic.
2. If modifying a backend endpoint, inspect `Backend/app/api/v1/endpoints/`.
3. If modifying a frontend page, inspect `src/pages/` and verify how shared components are consumed.

---

## Step 3: Implement Smallest Viable Delta

1. Make targeted, surgical edits rather than replacing entire files unnecessarily.
2. Maintain existing indentation, formatting, and docstrings.
3. Ensure no emojis are added.

---

## Step 4: Validate & Verify

1. **Frontend Build**: Run `npm run build` to verify JSX compilation and bundling.
2. **Backend Syntax & Lifespan**: Run `python -c "from app.main import app; print('OK')"` inside `Backend/`.
3. **Smoke Test Endpoints**: Verify affected endpoints using curl or browser automation.
4. **Inspect Visual Rendering**: Check the browser to verify there are no layout shifts or console errors.

---

## Step 5: Update Documentation & Patch Notes

1. If the API contract changed, update `docs/architecture/api.md`.
2. If a new page or component was created, update `docs/design/screens.md` and `AGENTS.md`.
3. Record your modifications in `docs/changelog.md`.
