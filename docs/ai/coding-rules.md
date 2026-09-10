# AI Coding Rules & Constraints

Every AI agent modifying PrepAura must strictly follow these rules:

---

## 1. Absolute Zero-Emoji Mandate

- **Rule**: Absolutely no unicode emojis may be added to any file in this repository.
- **Scope**: Includes JSX markup, string literals, comments, console messages, markdown files, git commit messages, and API responses.
- **Enforcement**: Use Lucide React SVG components for visual accents.

---

## 2. Component Reusability & Minimal Inventions

- **Rule**: Check `src/components/` before writing any new card, button, modal, or badge.
- Use `ClayCard` for elevated cards with glazed porcelain styling.
- Use `Button` for beveled clay action elements.
- Use `Badge` for difficulty, status, and role tags.
- Do NOT introduce redundant component wrappers with identical styling.

---

## 3. Dependency Discipline

- **Rule**: Do not run `npm install` or `pip install` to add new dependencies without explicit justification.
- The project already includes:
  - Frontend: `lucide-react`, `framer-motion`, `gsap`, `recharts`, `axios`, `react-router-dom`, `canvas-confetti`.
  - Backend: `fastapi`, `uvicorn`, `sqlalchemy`, `aiosqlite`, `pydantic`, `pwdlib[argon2]`, `python-jose`.

- Prefer implementing helper utilities with standard JavaScript or Python libraries over pulling in external packages.

---

## 4. Backend Standards

- **Pydantic v2**: Always use modern Pydantic v2 models with type annotations and `ConfigDict` where needed.
- **SQLAlchemy 2.0**: Use standard `Mapped[...]` and `mapped_column(...)` declarative annotations. Never use legacy SQLAlchemy 1.x patterns (such as `Column(Integer, primary_key=True)`).
- **Asynchronous Execution**: All FastAPI route handlers that query the database must use `async def` and `await session.execute(...)`.

---

## 5. Frontend Standards

- **Functional Components**: Use React 19 functional components with hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`).
- **No Class Components**: Class components are forbidden.
- **Defensive Rendering**: Always guard against `undefined` or `null` objects before accessing nested properties (e.g., `user?.full_name ?? 'Candidate'`).
