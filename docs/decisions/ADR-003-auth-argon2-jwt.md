# ADR-003: Argon2id Password Hashing via pwdlib and JWT Authentication

## Status

Accepted

## Context

User authentication requires secure password hashing and stateless token issuance.
Historically, Python projects relied heavily on `passlib` (with bcrypt). However:

1. Python 3.14 removed the standard library `crypt` module, which caused hard `ImportError: cannot import name 'crypt'` failures in unmaintained `passlib` releases.
2. OWASP recommends Argon2id as the primary password hashing standard, superseding legacy bcrypt and PBKDF2 due to its resistance against GPU-accelerated side-channel and memory-tradeoff attacks.

## Decision

We adopted:

1. **Password Hashing**: `pwdlib[argon2]` (modern standard password library maintained by the FastAPI/Encode community).
2. **Token Format**: Stateless JSON Web Tokens (JWT) signed with HMAC-SHA256 (`HS256`) via `python-jose`.

## Rationale

1. **Future-Proof Stability**: `pwdlib` does not depend on deprecated standard library modules and runs reliably across Python 3.10 through Python 3.14+.
2. **Cryptographic Rigor**: Argon2id enforces high memory hardness and configurable time cost, providing state-of-the-art defense against credential attacks.
3. **Stateless Authorization**: JWTs contain the user's subject identifier and expiration timestamp, enabling horizontal scaling without requiring a centralized session cache in the immediate phase.

## Consequences

- Passwords cannot be decrypted; lost credentials must follow an asynchronous reset workflow.
- JWT tokens cannot be individually revoked before expiration unless a token-denylist cache (e.g., Redis) is introduced.
