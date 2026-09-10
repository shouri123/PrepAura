# Operations Incident Playbook & Troubleshooting

## Incident Classification & Diagnostic Trees

---

### Incident 1: 502 Bad Gateway on `/api/*`

**Likely Root Cause**:
The Uvicorn / Gunicorn ASGI backend process crashed, failed to bind to port 8000, or encountered an unhandled startup exception.

**Diagnostic Steps**:

1. Check process status:
   ```bash
   ps aux | grep uvicorn
   # or Windows PowerShell:
   Get-Process -Name python -ErrorAction SilentlyContinue
   ```

2. Inspect backend logs:
   Check `Backend/app.log` or standard error output.

3. Test backend directly on localhost:
   ```bash
   curl -I http://127.0.0.1:8000/health
   ```

4. If health check fails with `Connection Refused`, restart the backend server:
   ```bash
   cd Backend && python run.py
   ```

---

### Incident 2: Database Table Lock (`sqlite3.OperationalError: database is locked`)

**Likely Root Cause**:
Multiple processes or unclosed asynchronous sessions attempting concurrent write operations against `prepaura.db`.

**Diagnostic Steps**:

1. Verify no lingering zombie Python processes are locking the SQLite file:
   ```powershell
   Get-Process -Name python | Stop-Process -Force
   ```

2. Ensure all SQLAlchemy routes consume `AsyncSession` via `Depends(get_db)` so transactions commit or rollback deterministically.
3. For multi-worker production deployments, migrate immediately to PostgreSQL using `asyncpg`.

---

### Incident 3: CORS Validation Failure in Browser Console

**Likely Root Cause**:
Frontend requests originating from an unauthorized port or domain (e.g., `http://localhost:5173` instead of `3000`).

**Diagnostic Steps**:

1. Inspect the browser console for `Access-Control-Allow-Origin` error headers.
2. Verify `ALLOWED_ORIGINS` in `Backend/.env` includes the active client origin:
   ```env
   ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173
   ```

3. Restart the backend to reload CORS middleware configuration.
