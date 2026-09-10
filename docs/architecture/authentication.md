# Authentication & Security Architecture

## Authentication Pipeline

PrepAura implements a token-based authentication mechanism using modern cryptographic standards:

```text
  Client (React SPA)                              Server (FastAPI)
         |                                               |
         | --- POST /api/auth/login (email, pass) -----> |
         |                                               |
         |                                    [ Verify Argon2id Hash ]
         |                                    [ Generate JWT (HS256) ]
         |                                               |
         | <--- Return { access_token, user } ---------- |
         |                                               |
  [ Store in localStorage ]                              |
  [ Attach to Axios Headers ]                            |
         |                                               |
         | --- GET /api/interviews (Bearer Token) -----> |
         |                                               |
         |                                    [ Validate JWT Signature ]
         |                                    [ Extract user_id Claim ]
         |                                    [ Load User from DB ]
         |                                               |
         | <--- Return Protected Data ------------------ |
```

---

## Cryptographic Specifications

### 1. Password Hashing: Argon2id via `pwdlib[argon2]`

- **Algorithm**: Argon2id (memory-hard, resistant to GPU/ASIC cracking).
- **Library**: `pwdlib[argon2]`.
- **Rationale**: Python 3.14 deprecates and breaks older `passlib` modules (due to the removal of `crypt`). `pwdlib` is the modern, officially recommended replacement in the FastAPI ecosystem.
- **Salt & Pepper**: Handled automatically per-hash with secure cryptographic random salts.

### 2. Token Standards: JSON Web Token (JWT)

- **Algorithm**: HMAC-SHA256 (`HS256`).
- **Library**: `python-jose[cryptography]`.
- **Payload Claims**:
  - `sub`: Subject identifier (user email string or user ID).
  - `exp`: Expiration timestamp (default: 7 days / 10,080 minutes).

- **Secret Key**: Configured via `SECRET_KEY` in `Backend/.env`.

---

## Dual-Mode Frontend Resiliency

In modern AI and full-stack development, developer environments may intermittently run only the frontend dev server without the backend active.

To prevent white screens or broken navigation:

1. **Network Probe**: `AuthContext.jsx` queries `/api/auth/me` on initial mount.
2. **Online State**: If the backend responds `200 OK`, user state is synchronized with the database.
3. **Offline Fallback**: If the network call fails with a connection error (`ERR_CONNECTION_REFUSED` or `ECONNREFUSED`):
   - The application does not crash.
   - It maintains a graceful mock operator identity (`Staff Candidate`).
   - The user can still practice interviews, view the claymorphic interface, test audio waveforms, and inspect scoring rubrics.
   - When the backend is booted, the user can log in and resume live database synchronization.
