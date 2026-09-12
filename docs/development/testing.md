# Verification & Testing Procedures

## Automated & Smoke Testing

### 1. Backend Verification

#### A. Import Smoke Test

Verify that FastAPI, SQLAlchemy models, Pydantic schemas, and security dependencies resolve with zero syntax or runtime errors:

```bash
python -c "from app.main import app; print('Backend loaded successfully')"
```

#### B. API Health Check

Test endpoint connectivity via curl or PowerShell `Invoke-RestMethod`:

```bash
curl -X GET http://127.0.0.1:8000/health
```

Expected output:

```json
{"status":"healthy","version":"1.0.0","service":"prepaura-simulation-api"}
```

#### C. User Registration & Login Smoke Test

Register a test candidate:

```bash
curl -X POST http://127.0.0.1:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test.staff@prepaura.ai","password":"Password123!","full_name":"Test Staff Engineer","target_role":"Staff Systems Architect","seniority_level":"Staff"}'
```

Log in and obtain a JWT bearer token:

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test.staff@prepaura.ai","password":"Password123!"}'
```

Query the authenticated current user profile:

```bash
curl -X GET http://127.0.0.1:8000/api/auth/me \
  -H "Authorization: Bearer <TOKEN_RETURNED_ABOVE>"
```

---

### 2. Frontend Verification

#### A. Production Build Verification

Ensure all React 19 components, JSX syntax, and CSS postprocessing compile without warnings or bundle errors:

```bash
npm run build
```

Expected output:

```text
vite v6.0.5 building for production...
transforming...
[OK] 2840 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.96 kB │ gzip:  0.51 kB
dist/assets/index-*.css          58.62 kB │ gzip: 10.98 kB
dist/assets/index-*.js          738.90 kB │ gzip: 226.40 kB
[OK] built in ~1.2s
```

#### B. End-to-End Visual Verification

Verify the following pages in a Chromium-based browser:

1. `http://localhost:3000/` (Landing Page with Modern Antique Claymorphic hero)
2. `http://localhost:3000/interview/setup` (Setup chamber with sensor checks)
3. `http://localhost:3000/interview/session` (Simulation chamber with waveform animation)
4. `http://localhost:3000/interview/result/demo-session-1` (Debrief view with 4-vector score cards)
5. `http://localhost:3000/analytics` (Recharts trajectory graphs)
6. `http://localhost:3000/profile` (Operator dossier and CV parser)
