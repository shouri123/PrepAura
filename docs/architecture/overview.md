# System Architecture Overview

## High-Level Topology

PrepAura employs a fully decoupled client-server architecture designed for high responsiveness, resilient local development, and clean cloud deployment:

```text
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|                                                                         |
|   React 19 SPA (Vite, Tailwind CSS, Lucide Icons, GSAP, Recharts)       |
|   Port: 3000 (Local Development)                                        |
|                                                                         |
|   +-------------------+  +-------------------+  +-------------------+   |
|   |   Public Pages    |  |    Chamber UI     |  |   Auth & State    |   |
|   |  - Landing (Hero) |  |  - Setup Chamber  |  |  - AuthContext    |   |
|   |  - Features       |  |  - Live Session   |  |  - Token Storage  |   |
|   |  - Methodology    |  |  - Result Debrief |  |  - Dual Fallback  |   |
|   |  - Pricing        |  |  - History/Charts |  |  - Axios Client   |   |
|   +-------------------+  +-------------------+  +-------------------+   |
+-------------------------------------------------------------------------+
                                    |
                    REST / JSON HTTP (Bearer JWT)
                    Proxy: /api -> http://127.0.0.1:8000
                                    v
+-------------------------------------------------------------------------+
|                              SERVER TIER                                |
|                                                                         |
|   FastAPI Application (Python 3.10+, Uvicorn ASGI Server)               |
|   Port: 8000 (Local Development)                                        |
|                                                                         |
|   +-----------------------------------------------------------------+   |
|   |                        Lifespan Context                         |   |
|   |        (Database Table Creation, Logging Initialization)        |   |
|   +-----------------------------------------------------------------+   |
|                                    |                                    |
|   +-------------------+  +-------------------+  +-------------------+   |
|   |   Auth Router     |  | Interview Router  |  | Analytics Router  |   |
|   |  - Register       |  |  - Create Session |  |  - Metrics Traj.  |   |
|   |  - Login (Token)  |  |  - Submit Answer  |  |  - Radar Vectors  |   |
|   |  - Current User   |  |  - Evaluate       |  |  - Regimen Audit  |   |
|   +-------------------+  +-------------------+  +-------------------+   |
|                                    |                                    |
|   +-----------------------------------------------------------------+   |
|   |                 Security & Data Access Layer                    |   |
|   |        - Argon2id Password Hashing via pwdlib[argon2]           |   |
|   |        - JWT Bearer Token Validation via python-jose            |   |
|   |        - SQLAlchemy 2.0 Async Sessions (aiosqlite)              |   |
|   +-----------------------------------------------------------------+   |
+-------------------------------------------------------------------------+
                                    |
                         Async I/O File Access
                                    v
+-------------------------------------------------------------------------+
|                            PERSISTENCE TIER                             |
|                                                                         |
|   SQLite 3 Database (`prepaura.db` via aiosqlite)                       |
|   Production Ready for PostgreSQL via asyncpg swap                      |
+-------------------------------------------------------------------------+
```

---

## Architectural Principles

1. **Decoupled Independence**: The frontend and backend can be developed, built, and scaled independently. The Vite proxy forwards `/api` calls directly to the FastAPI server.
2. **Dual-Mode Graceful Degradation**: If the backend is undergoing maintenance or running in an offline environment, the frontend client seamlessly maintains operator state locally via `localStorage` without generating unhandled runtime exceptions.
3. **Strict Boundary Contracts**: All HTTP boundaries are strictly validated using Pydantic v2 schemas on the backend and typed response parsers on the frontend.
4. **Context7 Framework Compliance**:
   - Backend structure complies with Context7 FastAPI application design guidelines (`/websites/fastapi_tiangolo`).
   - Frontend structure adheres to Context7 React 19 component composition guidelines (`/reactjs/react.dev`).
