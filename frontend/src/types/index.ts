export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type EnrollmentStatus = "at_risk" | "active";
export type UrgencyLevel = "low" | "medium" | "high" | "critical";

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
  calculatedUrgency: UrgencyLevel;
}

export interface ActionCenterResponse {
  student: Student;
  summary: ActionCenterSummary;
  tasks: Task[];
  messages: Message[];
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface UpdateTaskStatusResponse {
  id: string;
  studentId: string;
  status: TaskStatus;
  updatedAt: string;
}

export interface StudentProfileProps {
  student: Student;
}

export interface TaskListProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => Promise<boolean>;
}

export interface UrgencyMetricsProps {
  summary: ActionCenterSummary;
  tasks: Task[];
}

export interface MessageSummaryProps {
  messages: Message[];
}

export interface StudentSelectorOption {
  id: string;
  name: string;
}

export interface StudentSelectorProps {
  selectedStudentId: string;
  onSelectStudent: (studentId: string) => void;
  students: StudentSelectorOption[];
  isLoading?: boolean;
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export type UrgencyStatCardKey =
  | "openTasks"
  | "overdueTasks"
  | "completedTasks"
  | "unreadMessages";

  export interface UseActionCenterState {
    data: ActionCenterResponse | null;
    loading: boolean;
    isRefreshing: boolean;
    error: string | null;
  }
  