import { Request, Response } from "express";
import { studentService } from "../services/studentService";
import { TaskStatus, ActionCenterResponse, ErrorResponse, UpdateTaskStatusPayload } from "../types";

export class StudentController {

  async getActionCenter(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const student = studentService.getStudentById(id);
      if (!student) {
        res.status(404).json({ error: "Student not found" } as ErrorResponse);
        return;
      }

      const studentTasks = studentService.getStudentTasks(id);
      const studentMessages = studentService.getStudentMessages(id);
      const summary = studentService.getActionCenterSummary(id);

      if (!summary) {
        res.status(404).json({ error: "Student not found" } as ErrorResponse);
        return;
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
      console.error("Error in getActionCenter:", error);
      res.status(500).json({ error: "Internal server error" } as ErrorResponse);
    }
  }


  async updateTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const { status } = req.body as UpdateTaskStatusPayload;

      if (!status) {
        res.status(400).json({ error: "Status is required" } as ErrorResponse);
        return;
      }

      const validStatuses: TaskStatus[] = ["todo", "in_progress", "completed"];
      if (!validStatuses.includes(status as TaskStatus)) {
        res.status(400).json({ error: "Invalid status value provided" } as ErrorResponse);
        return;
      }

      const updatedTask = studentService.updateTaskStatus(taskId, status as TaskStatus);

      if (!updatedTask) {
        res.status(404).json({ error: "Task not found" } as ErrorResponse);
        return;
      }

      res.status(200).json({
        id: updatedTask.id,
        studentId: updatedTask.studentId,
        status: updatedTask.status,
        updatedAt: updatedTask.updatedAt,
      });
    } catch (error) {
      console.error("Error in updateTaskStatus:", error);
      res.status(500).json({ error: "Internal server error" } as ErrorResponse);
    }
  }
}

export const studentController = new StudentController();
