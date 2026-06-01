# Counselor Student Action Center

Mini full-stack assignment built with:
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript

## What it includes
- Student profile summary
- Task list with status updates
- Message summary with unread count
- Urgency metrics/badges
- Loading and error states

## Project structure
```text
counselor-action-center/
  backend/
  frontend/
  API_CONTRACT.md
```

## Run locally

### 1) Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:8000`.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.
By default it calls backend API at `http://localhost:8000/api`.
Optional: set `VITE_API_BASE_URL` in frontend env if you want a different API URL.

## API endpoints
- `GET /api/students/:id/action-center`
- `PATCH /api/tasks/:taskId/status`

Detailed request/response examples are in [API_CONTRACT.md](./API_CONTRACT.md).

## Architecture note (short)
- Backend uses a simple route -> controller -> service structure with in-memory mock data.
- Frontend is component-driven with a custom hook (`useActionCenter`) for fetching and status updates.
- Types are defined in both frontend and backend for safer API integration.

## Assignment checklist
- React + TypeScript + Vite frontend: Yes
- Node + Express + TypeScript backend: Yes
- Required endpoints: Yes
- Uses provided mock data structure/IDs: Yes
