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

## Run locally (easy steps)

Before you start:
- Install Node.js (LTS version is recommended)
- Open this project folder in your terminal

### Backend (server)
1. Open Terminal window #1
2. Run:
```bash
cd backend
npm install
npm run dev
```
3. Keep this terminal open
4. Backend will run at `http://localhost:8000`

### Frontend (website)
1. Open Terminal window #2
2. Run:
```bash
cd frontend
npm install
npm run dev
```
3. Open `http://localhost:5173` in your browser

The frontend automatically calls backend APIs at `http://localhost:8000/api`.

## API endpoints
- `GET /api/students/:id/action-center`
- `PATCH /api/tasks/:taskId/status`

Detailed request/response examples are in [API_CONTRACT.md](./API_CONTRACT.md).

## Architecture note (short)
- Backend uses a simple route -> controller -> service structure with in-memory mock data.
- Frontend is component-driven with a custom hook (`useActionCenter`) for fetching and status updates.
- Types are defined in both frontend and backend for safer API integration.
