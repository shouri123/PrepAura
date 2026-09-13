from contextlib import asynccontextmanager

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import analytics, auth, interviews, questions, results, users
from app.core.config import settings
from app.database.base import Base
from app.database.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize all database tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield

    # Dispose pool on shutdown
    await engine.dispose()


app = FastAPI(
    title="PrepAura Backend",
    description="Production-Ready AI Mock Interview Platform API running on Python 3.14.7",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Setup CORS for Vite/React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API subrouters
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(interviews.router, prefix="/api")
app.include_router(questions.router, prefix="/api")
app.include_router(results.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(analytics.dashboard_router, prefix="/api")


@app.get("/health", status_code=status.HTTP_200_OK, tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "PrepAura Backend",
    }