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

##  Task 2 (Quality and Reliability)

### Backend improvements
- Added request ID middleware (`X-Request-ID` header on every response).
- Added backend request logging (method, path, status, response time, request ID).
- Added centralized error middleware that logs with request ID and returns `{ error, requestId }`.

### Tests
- Backend integration test:
  - `backend/src/tests/api.integration.test.ts`
  - Covers:
    - `GET /api/students/stu_001/action-center` response structure
    - `PATCH /api/tasks/:taskId/status` in-memory task status update
- Frontend tests:
  - `frontend/src/tests/MessageSummary.test.tsx`
  - `frontend/src/tests/TaskList.test.tsx`
  - Covers unread badge rendering and task status dropdown behavior.

### Performance decisions and trade-offs
- Current implementation uses in-memory arrays (`O(N)` filtering/lookup).
- This is fast and simple for assignment-scale data.
- For production scale, we would index data at startup by:
  - `studentId -> tasks[]`
  - `studentId -> messages[]`
  - `taskId -> task`
- This would trade extra memory for faster `O(1)` / near `O(1)` access patterns.

### Test command examples
```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test

# Frontend (Vitest UI for screenshot)
cd frontend
npx vitest --ui
```

### Test evidence
- Use terminal output from:
  - `backend: npm run test`
  - `frontend: npm run test`
- For frontend UI evidence, run `npx vitest --ui` and take a screenshot from the Vitest UI page.
