import request from "supertest";
import { afterEach, describe, expect, test } from "vitest";
import { app } from "../server";
import { studentService } from "../services/studentService";
import type { TaskStatus } from "../types";

describe.sequential("Action Center API integration", () => {
  const taskId = "tsk_001";
  const originalStatus =
    (studentService.getTaskById(taskId)?.status as TaskStatus | undefined) ?? "todo";

  afterEach(() => {
    studentService.updateTaskStatus(taskId, originalStatus);
  });

  test("GET /api/students/:id/action-center returns student aggregate data", async () => {
    const response = await request(app).get("/api/students/stu_001/action-center");

    expect(response.status).toBe(200);
    expect(response.headers["x-request-id"]).toBeDefined();
    expect(response.body).toHaveProperty("student");
    expect(response.body).toHaveProperty("summary");
    expect(response.body).toHaveProperty("tasks");
    expect(response.body).toHaveProperty("messages");
    expect(response.body.student.id).toBe("stu_001");
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  test("PATCH /api/tasks/:taskId/status updates task status in memory", async () => {
    const response = await request(app)
      .patch(`/api/tasks/${taskId}/status`)
      .send({ status: "completed" });

    expect(response.status).toBe(200);
    expect(response.headers["x-request-id"]).toBeDefined();
    expect(response.body.id).toBe(taskId);
    expect(response.body.status).toBe("completed");
    expect(studentService.getTaskById(taskId)?.status).toBe("completed");
  });
});
