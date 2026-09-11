# Deployment & Operations Guide

## Production Architecture

In production, PrepAura runs as a high-performance decoupled service:

```text
               HTTPS (Port 443)
                      |
                      v
             [ NGINX / Cloudflare ]
             /                    \
     /api/* (Proxy)             /* (Static)
            |                             |
            v                             v
[ FastAPI ASGI (Gunicorn/Uvicorn) ]   [ Vite SPA Static Bundle ]
       Port: 8000                          Port: 80 / CDN
            |
            v
[ Managed PostgreSQL (asyncpg) ]
```

---

## 1. Frontend Production Build

The frontend compiles to static HTML, CSS, and JavaScript:

```bash

# Clean install and build

npm ci
npm run build
```

The resulting assets in `dist/` can be served by:

- NGINX or Caddy
- Cloudflare Pages / AWS S3 + CloudFront / Vercel

### NGINX Static Single Page Application Configuration:

```nginx
server {
    listen 80;
    server_name prepaura.ai;
    root /var/www/prepaura/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 2. Backend Production Deployment

Run FastAPI with Gunicorn using Uvicorn worker classes:

```bash
cd Backend
pip install -r requirements.txt
pip install gunicorn

gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --access-logfile - \
  --error-logfile -
```

---

## 3. Database Migration for Production

To switch from local SQLite to PostgreSQL in production:

1. Update `Backend/.env`:
   ```env
   DATABASE_URL=postgresql+asyncpg://prepaura_user:secret@postgres-cluster:5432/prepaura_prod
   ```

2. Ensure `asyncpg` is installed:
   ```bash
   pip install asyncpg
   ```

3. The application lifespan context will automatically initialize tables on startup.
