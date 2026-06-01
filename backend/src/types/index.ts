export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type EnrollmentStatus = "at_risk" | "active";

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  gpa: number;
  counselorId: string;
  enrollmentStatus: EnrollmentStatus;
}

export interface Task {
  id: string;
  studentId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  studentId: string;
  from: string;
  subject: string;
  preview: string;
  read: boolean;
  receivedAt: string;
}

export interface ActionCenterSummary {
  unreadMessagesCount: number;
  calculatedUrgency: "low" | "medium" | "high" | "critical";
}

export interface ActionCenterResponse {
  student: Student;
  summary: ActionCenterSummary;
  tasks: Task[];
  messages: Message[];
}

export interface UpdateTaskStatusPayload {
  status: TaskStatus;
}

export interface ErrorResponse {
  error: string;
}
