# Troubleshooting & Debugging Guide

## Common Issues & Resolutions

### 1. Port Conflicts (Port 3000 or Port 8000 in Use)

**Symptom**:

- `Error: listen EADDRINUSE: address already in use :::3000` or `[Errno 10048] error while attempting to bind on address ('127.0.0.1', 8000)`.

**Resolution**:

- Identify and terminate the offending process on Windows:
  ```powershell
  Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object OwningProcess
  Stop-Process -Id <PID> -Force
  ```

- Or on macOS / Linux:
  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

---

### 2. Password Hashing Errors on Python 3.14

**Symptom**:

- `ModuleNotFoundError: No module named 'crypt'` or `AttributeError: module 'passlib' has no attribute 'context'`.

**Cause**:

- Python 3.14 removed the deprecated Unix `crypt` module from the standard library. Older libraries like `passlib` crash upon import.

**Resolution**:

- PrepAura uses `pwdlib[argon2]` in `Backend/app/core/security.py`. Ensure `pwdlib` is installed:
  ```bash
  pip install "pwdlib[argon2]"
  ```

---

### 3. Frontend Displays Offline Session Fallback

**Symptom**:

- Console shows network connection warnings and the dashboard indicates local session mode.

**Cause**:

- The FastAPI backend on port 8000 is not running or the reverse proxy path `/api` is unreachable.

**Resolution**:

- Start the backend via `cd Backend && python run.py`.
- Verify `http://127.0.0.1:8000/health` responds with `{"status":"healthy"}`.
- Check `vite.config.js` proxy configuration:
  ```javascript
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
  ```

---

### 4. Microphones or Audio Waveforms Not Moving

**Symptom**:

- Live simulation waveform displays a flat line during speech.

**Cause**:

- The browser requires explicit permission to access `navigator.mediaDevices.getUserMedia({ audio: true })`.

**Resolution**:

- Ensure the browser URL is `http://localhost:3000` (which is treated as a secure origin by Chromium).
- Click the camera/microphone icon in the browser address bar and set Microphone access to **Allow**.
- If no physical microphone is attached, PrepAura runs an autonomous simulated waveform animation to allow testing the UI state without audio hardware.
