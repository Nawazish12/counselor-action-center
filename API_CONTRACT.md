# API Contract (Short)

Base URL: `http://localhost:8000/api`

## Endpoints

### 1) GET `/students/:id/action-center`
Returns unified data for one student:
- `student` profile
- `summary` (unread count + calculated urgency)
- `tasks`
- `messages`

Example:
```bash
curl http://localhost:8000/api/students/stu_001/action-center
```

Success response shape (`200`):
```json
{
  "student": {},
  "summary": {
    "unreadMessagesCount": 2,
    "calculatedUrgency": "high"
  },
  "tasks": [],
  "messages": []
}
```

Errors:
- `404` student not found
- `500` internal server error

### 2) PATCH `/tasks/:taskId/status`
Updates a task status.

Request body:
```json
{
  "status": "in_progress"
}
```

Allowed `status` values:
- `todo`
- `in_progress`
- `completed`

Example:
```bash
curl -X PATCH http://localhost:8000/api/tasks/tsk_001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

Success response shape (`200`):
```json
{
  "id": "tsk_001",
  "studentId": "stu_001",
  "status": "completed",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

Errors:
- `400` missing/invalid status
- `404` task not found
- `500` internal server error

## Notes
- Data source is in-memory mock data in `backend/src/data/mockData.ts`.
- Endpoint definitions are in `backend/src/routes/api.ts`.

## Folder Structure

### Frontend
```text
frontend/
  src/
    components/         # UI building blocks (profile, tasks, messages, states)
    hooks/              # Data/state hooks (useActionCenter)
    constants/          # Reusable static config (dropdown options, card configs)
    types/              # Frontend TypeScript models/interfaces
    utils/              # UI/helper functions (formatting, color/status helpers)
    pages/              # Page-level layout (ActionCenter)
    App.tsx             # Root app component
    main.tsx            # React entry point
    index.css           # Global styles and Tailwind layers
  vite.config.ts        # Vite config + /api proxy to backend
  tailwind.config.js    # Tailwind theme tokens/config
```

### Backend
```text
backend/
  src/
    data/
      mockData.ts       # Assignment mock data (students, tasks, messages)
    types/
      index.ts          # Backend request/response/domain types
    services/
      studentService.ts # Business logic (aggregation, urgency, status update)
    controllers/
      studentController.ts # HTTP handlers + validation
    routes/
      api.ts            # API route definitions
    server.ts           # Express app/bootstrap and middleware
```
