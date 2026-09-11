# ADR-001: Decoupled FastAPI Backend and React 19 SPA

## Status

Accepted

## Context

PrepAura requires high-fidelity audio telemetry, real-time waveform rendering, interactive canvas elements, and rapid evaluation pipelines. We needed to choose an architectural topology:

1. Full-stack monolithic framework (e.g., Next.js with React Server Components or Django with template rendering).
2. Decoupled architecture with a dedicated FastAPI backend and Vite-powered React single page application.

## Decision

We adopted a **decoupled architecture**:

- **Backend**: Python with FastAPI 0.115+.
- **Frontend**: Vite with React 19.

## Rationale

1. **AI and Audio Ecosystem**: Python is the lingua franca of AI, LLM evaluation pipelines, whisper audio processing, and vector mathematics. Using FastAPI allows direct integration with LangChain, LlamaIndex, vLLM, and native PyTorch / ONNX runtimes without inter-process RPC overhead.
2. **Client Performance**: The live simulation chamber requires sub-millisecond audio visualizer updates via the Web Audio API and complex GSAP animation sequences. A pure React SPA running on Vite provides predictable client-side rendering without SSR hydration mismatches or node-server latency.
3. **Developer Velocity**: Frontend engineers can develop and test views independently of backend state using mock fallback modes. Backend engineers can test endpoints directly via OpenAPI interactive docs (`/docs`).

## Consequences

- Requires running two separate development servers (`npm run dev` on port 3000, `python run.py` on port 8000).
- Requires CORS configuration and Vite dev server reverse proxying for `/api` requests.
