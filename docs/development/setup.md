# Local Development Setup Guide

## Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Python**: v3.10 or higher (tested through Python 3.14)
- **Package Managers**: `npm` (bundled with Node) and `pip` (bundled with Python)

---

## 1. Backend Setup

From the repository root:

```bash

# Navigate to the Backend folder

cd Backend

# Create a Python virtual environment (optional but recommended)

python -m venv venv

# Activate virtual environment:

# Windows (PowerShell):

.\venv\Scripts\Activate.ps1

# macOS / Linux:

source venv/bin/activate

# Install Python dependencies

pip install -r requirements.txt

# Verify environment file exists (auto-created if missing)

# If .env does not exist, copy from .env.example or create one with:

# SECRET_KEY=prepaura-simulation-ultra-secure-key-2026-precision-jwt

# DATABASE_URL=sqlite+aiosqlite:///./prepaura.db

# ENVIRONMENT=development

# Start the FastAPI backend server

python run.py
```

The backend server boots on `http://127.0.0.1:8000`.
Interactive API documentation is accessible at:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

---

## 2. Frontend Setup

From the repository root (in a separate terminal):

```bash

# Install frontend dependencies

npm install

# Start Vite development server

npm run dev
```

The frontend application launches on `http://localhost:3000`.

---

## 3. Port Allocation Summary

| Service | Port | Protocol | Notes |
| :--- | :--- | :--- | :--- |
| **Vite Dev Server** | `3000` | HTTP / WS | Host React 19 SPA with Hot Module Replacement |
| **FastAPI Backend** | `8000` | HTTP / REST | ASGI application serving `/api` endpoints |
| **Vite API Proxy** | `3000/api` | Reverse Proxy | Proxies calls directly to `http://127.0.0.1:8000/api` |
