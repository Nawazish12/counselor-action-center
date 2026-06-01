import { students, tasks, messages } from "../data/mockData";
import {
  Student,
  Task,
  Message,
  ActionCenterSummary,
  TaskStatus,
} from "../types";

export class StudentService {
  private getUrgencyLevelFromScore(
    urgencyScore: number
  ): "low" | "medium" | "high" | "critical" {
    switch (true) {
      case urgencyScore >= 8:
        return "critical";
      case urgencyScore >= 5:
        return "high";
      case urgencyScore >= 2:
        return "medium";
      default:
        return "low";
    }
  }

  getStudentById(id: string): Student | undefined {
    return students.find((student) => student.id === id);
  }


  getStudentTasks(studentId: string): Task[] {
    return tasks.filter((task) => task.studentId === studentId);
  }


  getStudentMessages(studentId: string): Message[] {
    return messages.filter((message) => message.studentId === studentId);
  }


  calculateUrgency(
    enrollmentStatus: string,
    studentTasks: Task[],
    studentMessages: Message[]
  ): "low" | "medium" | "high" | "critical" {
    let urgencyScore = 0;

    if (enrollmentStatus === "at_risk") {
      urgencyScore += 3;
    } else {
      urgencyScore += 1;
    }

    const urgentTasks = studentTasks.filter(
      (task) =>
        task.status !== "completed" &&
        (task.priority === "urgent" || task.priority === "high")
    );
    urgencyScore += urgentTasks.length * 2;

    const unreadMessages = studentMessages.filter((msg) => !msg.read);
    urgencyScore += unreadMessages.length;

    return this.getUrgencyLevelFromScore(urgencyScore);
  }


  getActionCenterSummary(
    studentId: string
  ): ActionCenterSummary | null {
    const student = this.getStudentById(studentId);
    if (!student) return null;

    const studentTasks = this.getStudentTasks(studentId);
    const studentMessages = this.getStudentMessages(studentId);

    return {
      unreadMessagesCount: studentMessages.filter((msg) => !msg.read).length,
      calculatedUrgency: this.calculateUrgency(
        student.enrollmentStatus,
        studentTasks,
        studentMessages
      ),
    };
  }

 
  updateTaskStatus(taskId: string, newStatus: TaskStatus): Task | null {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return null;

    task.status = newStatus;
    task.updatedAt = new Date().toISOString();

    return task;
  }

 
  getTaskById(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
  }
}

export const studentService = new StudentService();
