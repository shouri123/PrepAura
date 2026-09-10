# Backend Architecture

## Technology Stack

- **Framework**: FastAPI 0.115+ (Context7: `/websites/fastapi_tiangolo`)
- **Server**: Uvicorn ASGI runner (`run.py`, port 8000)
- **ORM**: SQLAlchemy 2.0 Async (`async_sessionmaker`, `create_async_engine`)
- **Driver**: `aiosqlite` for asynchronous SQLite database access
- **Validation**: Pydantic v2 schemas (`BaseModel`, `EmailStr`, `ConfigDict`)
- **Security**:
  - Argon2id password hashing via `pwdlib[argon2]` (compatible with Python 3.14+)
  - JWT token generation and validation via `python-jose` (HS256)

---

## Directory Organization

Following Context7 best practices for larger applications, the backend is organized into modular functional packages:

```text
Backend/
├── run.py                 # Uvicorn entry point script
├── requirements.txt       # Production dependencies
├── .env                   # Environment variables
├── prepaura.db            # SQLite database file
└── app/
    ├── main.py            # FastAPI app initialization, lifespan, CORS, router mounting
    ├── core/
    │   ├── config.py      # Pydantic BaseSettings (SECRET_KEY, DB_URL, CORS)
    │   ├── database.py    # Async engine, Base declarative class, get_db generator
    │   └── security.py    # Argon2 hashing, verify_password, create_access_token
    ├── models/
    │   ├── user.py        # SQLAlchemy User model
    │   └── interview.py   # SQLAlchemy Interview and Question models
    ├── schemas/
    │   ├── user.py        # Pydantic UserCreate, UserLogin, UserResponse, Token
    │   └── interview.py   # Pydantic InterviewCreate, InterviewResponse, Evaluation
    └── api/
        ├── deps.py        # Dependency injection (get_current_user, get_db)
        └── v1/
            ├── api.py     # Aggregator APIRouter mounting sub-routers
            └── endpoints/
                ├── auth.py       # Authentication routes (/api/auth)
                ├── interviews.py # Simulation lifecycle routes (/api/interviews)
                └── analytics.py  # Performance metrics routes (/api/analytics)
```

---

## Application Lifespan & Initialization

`app/main.py` uses FastAPI's modern async `lifespan` context manager:

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure all database tables exist asynchronously
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: Clean up engine connection pools
    await engine.dispose()

app = FastAPI(
    title="PrepAura Simulation API",
    version="1.0.0",
    lifespan=lifespan
)
```

---

## Dependency Injection Pipeline

The backend relies on FastAPI's `Depends` mechanism for clean separation of concerns:

1. **Database Session (`get_db`)**:
   - Yields an isolated `AsyncSession` per request.
   - Automatically handles transaction rollback on exceptions and commits on successful completion.

2. **Current User (`get_current_user`)**:
   - Extracts the HTTP Bearer token from the `Authorization` header.
   - Validates JWT signature and expiration.
   - Queries the database for the matching user record, raising an HTTP 401 Unauthorized status if invalid.
