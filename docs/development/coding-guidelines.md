# Coding Guidelines & Quality Standards

## Python Backend Standards

### 1. Style & Formatting

- Adhere to **PEP 8** style guidelines.
- Maximum line length: 100 characters.
- Use explicit type annotations on all function signatures.

```python

# Correct

async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
    stmt = select(User).where(User.email == email)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()
```

### 2. Dependency Injection

- Never instantiate database sessions or security services directly inside route handlers.
- Always use `Depends(get_db)` and `Depends(get_current_user)`.

### 3. Error Handling

- Use standard `HTTPException` with explicit status codes and informative detail strings.
- Never let unhandled database exceptions leak raw SQL or stack traces to the client.

---

## JavaScript / React Frontend Standards

### 1. Component Architecture

- Use React 19 functional components with hooks.
- One component per file for major views and primitives.
- Co-locate view-specific subcomponents when they are not reused globally.

### 2. Styling Rules

- Use Tailwind CSS utility classes adhering to the claymorphic token hierarchy.
- Never write ad-hoc inline styles (`style={{ ... }}`) for colors or shadows that already exist in `tailwind.config.js`.
- Always wrap interactive elements in accessible button or link tags with distinct focus rings.

### 3. State Management

- Keep global state in `AuthContext` minimal.
- Use local `useState` for component-level form inputs, modal dialogs, and toggle states.
- Always provide sensible default props or fallbacks to prevent `Cannot read properties of undefined` runtime errors.

---

## Iconography & Asset Rules

- Strictly use **Lucide React** SVG icons.
- **Zero emojis** anywhere in code, UI labels, toasts, or comments.
