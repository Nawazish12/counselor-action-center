import { NextFunction, Request, Response } from "express";
import { studentService } from "../services/studentService";
import {
  TaskStatus,
  ActionCenterResponse,
  UpdateTaskStatusPayload,
} from "../types";
import { AppError } from "../utils/appError";

export class StudentController {
  async getActionCenter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const student = studentService.getStudentById(id);
      if (!student) {
        throw new AppError("Student not found", 404);
      }

      const studentTasks = studentService.getStudentTasks(id);
      const studentMessages = studentService.getStudentMessages(id);
      const summary = studentService.getActionCenterSummary(id);

      if (!summary) {
        throw new AppError("Student not found", 404);
      }

      const response: ActionCenterResponse = {
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          grade: student.grade,
          gpa: student.gpa,
          counselorId: student.counselorId,
          enrollmentStatus: student.enrollmentStatus,
        },
        summary,
        tasks: studentTasks,
        messages: studentMessages,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const { status } = req.body as UpdateTaskStatusPayload;

      if (!status) {
        throw new AppError("Status is required", 400);
      }

      const validStatuses: TaskStatus[] = ["todo", "in_progress", "completed"];
      if (!validStatuses.includes(status as TaskStatus)) {
        throw new AppError("Invalid status value provided", 400);
      }

      const updatedTask = studentService.updateTaskStatus(taskId, status as TaskStatus);

      if (!updatedTask) {
        throw new AppError("Task not found", 404);
      }

      res.status(200).json({
        id: updatedTask.id,
        studentId: updatedTask.studentId,
        status: updatedTask.status,
        updatedAt: updatedTask.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const studentController = new StudentController();
