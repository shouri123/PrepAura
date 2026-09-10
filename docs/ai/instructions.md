# AI Agent Operational Instructions

This document provides explicit execution instructions for autonomous AI agents (Claude Code, Gemini, Cursor, Codex) operating on PrepAura.

---

## 1. Operating Assumptions

- The workspace root contains:
  - Frontend code in `src/`
  - Backend code in `Backend/`
  - Modular documentation in `docs/`
  - Visual references and generated screens in `stitch_screens/`

- Zero-emoji policy is strictly mandatory across all files.

---

## 2. Standard Modification Recipes

### Recipe A: Adding a New Interview Question Track

1. Open `src/pages/InterviewSetup.jsx`.
2. Locate the `tracks` array.
3. Add the new specialization object with `id`, `title`, `description`, `icon` (Lucide React SVG component), and `sampleQuestions`.
4. Ensure no emojis are used in the description or title.
5. Update `docs/product/requirements.md` to reflect the new specialization track.

### Recipe B: Adding a Backend API Route

1. Define the Pydantic request/response schema in `Backend/app/schemas/`.
2. Implement the route handler in `Backend/app/api/routes/` with `Depends(get_db)` and `Depends(get_current_user)` if protected.
3. Register the route with the appropriate APIRouter tag.
4. Update `src/services/api.js` to expose the new method.
5. Document the route contract in `docs/architecture/api.md`.

### Recipe C: Adding a New Page View

1. Create `src/pages/NewPage.jsx` using `ClayCard`, `Button`, and Lucide icons.
2. Mount the route in `src/App.jsx`.
3. Add a navigation link to `src/components/Navbar.jsx` or `src/components/Footer.jsx`.
4. Run `npm test` and `npm run build` to verify clean compilation.
5. Register the screen in `docs/design/screens.md`.
