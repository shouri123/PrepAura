# PrepAura Documentation Directory

Welcome to the **PrepAura** documentation architecture.

To prevent documentation from becoming an unstructured monolithic dumping ground, PrepAura follows an **AI-native, multi-layered documentation hierarchy** where each document serves a distinct purpose and answers questions that the code itself cannot answer easily.

---

## Documentation Map

```text
PrepAura/
├── AGENTS.md                  # Authoritative instructions and rules for AI agents
├── README.md                  # Production overview, quickstart, and developer guide
├── DESIGN.md                  # Visual theme token specifications
│
├── docs/
│   ├── product/
│   │   ├── vision.md          # Core problem space, why LeetCode is broken, value pillars
│   │   ├── requirements.md    # 4-phase evaluation engine, rubrics, business rules
│   │   ├── user-stories.md    # Candidate & interviewer user stories & personas
│   │   └── roadmap.md         # Phase 1 through Phase 4 evolution plan
│   │
│   ├── architecture/
│   │   ├── overview.md        # System topology and decoupled client-server architecture
│   │   ├── frontend.md        # React 19, Vite, routing hierarchy, AuthContext
│   │   ├── backend.md         # FastAPI lifespan, APIRouter layout, dependency injection
│   │   ├── database.md        # SQLite Async with aiosqlite, schema, PostgreSQL migration
│   │   ├── api.md             # Complete OpenAPI specifications and endpoint contracts
│   │   └── authentication.md  # Argon2id hashing, JWT token lifecycle, offline fallback
│   │
│   ├── design/
│   │   ├── design-system.md   # Modern Antique Claymorphic tokens, bevels, typography
│   │   ├── ui-guidelines.md   # Anti-slop principles, strict zero-emoji mandate
│   │   └── screens.md         # Inventory of all 12 core application screens
│   │
│   ├── decisions/
│   │   ├── ADR-001-architecture.md   # Decoupled FastAPI + React 19 architecture
│   │   ├── ADR-002-database.md       # Async SQLite with SQLAlchemy 2.0 & PostgreSQL path
│   │   └── ADR-003-auth-argon2-jwt.md# Argon2id pwdlib + JWT for Python 3.14 stability
│   │
│   ├── development/
│   │   ├── setup.md           # Local environment setup and port allocations
│   │   ├── coding-guidelines.md # Python & JavaScript quality and style standards
│   │   ├── testing.md         # Verification procedures, curl checks, and build tests
│   │   └── debugging.md       # Troubleshooting common errors (ports, Python 3.14, audio)
│   │
│   ├── operations/
│   │   ├── deployment.md      # Containerization, NGINX config, and Gunicorn workers
│   │   ├── environment.md     # Environment variables breakdown across tiers
│   │   └── troubleshooting.md # Incident playbook (502 Gateway, SQLite locks, CORS)
│   │
│   ├── ai/
│   │   ├── context.md         # AI mental model and domain invariants
│   │   ├── instructions.md    # Actionable recipes for modifying tracks, APIs, views
│   │   ├── coding-rules.md    # Strict coding constraints for AI agents
│   │   └── change-protocol.md # 5-step protocol for modifying code
│   │
│   ├── changelog.md           # Cumulative patch notes and release history
│   └── known-issues.md        # Known edge cases, technical debt, and scheduled fixes
│
└── stitch_screens/
    ├── references/            # Original logos, vector assets, and design references
    ├── generated/             # Stitch-generated screen HTML and screenshots
    └── README.md              # Workflow catalog (reference -> generated -> implemented)
```

---

## Quick Navigation

### 1. For AI Coding Agents (Cursor, Claude Code, Gemini, Codex)

- Read [AGENTS.md](../AGENTS.md) for authoritative rules, zero-emoji policy, and before-and-after change protocols.
- Read [docs/ai/context.md](docs/ai/context.md) for system invariants and domain models.
- Read [docs/ai/coding-rules.md](docs/ai/coding-rules.md) for code generation constraints.

### 2. For Product & Domain Questions ("What are we building?")

- Read [docs/product/vision.md](docs/product/vision.md) to understand why traditional platforms fail senior candidates.
- Read [docs/product/requirements.md](docs/product/requirements.md) for scoring rubrics and evaluation vectors.
- Read [docs/product/roadmap.md](docs/product/roadmap.md) for upcoming milestones.

### 3. For Technical Architecture ("How is it built?")

- Read [docs/architecture/overview.md](docs/architecture/overview.md) for end-to-end topology.
- Read [docs/architecture/frontend.md](docs/architecture/frontend.md) for React 19 and Vite details.
- Read [docs/architecture/backend.md](docs/architecture/backend.md) for FastAPI and APIRouter structure.
- Read [docs/architecture/database.md](docs/architecture/database.md) for SQLAlchemy 2.0 Async and schema maps.
- Read [docs/architecture/api.md](docs/architecture/api.md) for OpenAPI request/response contracts.
- Read [docs/architecture/authentication.md](docs/architecture/authentication.md) for Argon2id and JWT details.

### 4. For Design & UI ("How should it look and behave?")

- Read [docs/design/design-system.md](docs/design/design-system.md) for color palettes, shadows, and bevel tokens.
- Read [docs/design/ui-guidelines.md](docs/design/ui-guidelines.md) for the zero-emoji directive and component styling.
- Read [docs/design/screens.md](docs/design/screens.md) for the 12-screen route catalog.

### 5. For Architecture Decisions ("Why did we build it this way?")

- Read [docs/decisions/ADR-001-architecture.md](docs/decisions/ADR-001-architecture.md).
- Read [docs/decisions/ADR-002-database.md](docs/decisions/ADR-002-database.md).
- Read [docs/decisions/ADR-003-auth-argon2-jwt.md](docs/decisions/ADR-003-auth-argon2-jwt.md).

### 6. For Developers & Operations ("How do I run and test this?")

- Read [docs/development/setup.md](docs/development/setup.md) for local environment setup.
- Read [docs/development/testing.md](docs/development/testing.md) for verification and curl checks.
- Read [docs/development/debugging.md](docs/development/debugging.md) for troubleshooting.
