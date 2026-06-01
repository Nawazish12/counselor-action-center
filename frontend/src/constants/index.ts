import type {
  StudentSelectorOption,
  TaskStatus,
  UrgencyStatCardKey,
} from "../types";

export const STUDENTS: StudentSelectorOption[] = [
  { id: "stu_001", name: "Maya Patel" },
  { id: "stu_002", name: "Jordan Lee" },
  { id: "stu_003", name: "Carlos Rivera" },
];


export const URGENCY_STAT_CARD_CONFIGS: {
  key: UrgencyStatCardKey;
  label: string;
  icon: string;
  className: string;
}[] = [
  {
    key: "openTasks",
    label: "Open Tasks",
    icon: "🕒",
    className: "border-slate-200 bg-white",
  },
  {
    key: "overdueTasks",
    label: "Overdue",
    icon: "⚠",
    className: "border-danger-200 bg-danger-50",
  },
  {
    key: "completedTasks",
    label: "Completed",
    icon: "✓",
    className: "border-success-200 bg-success-50",
  },
  {
    key: "unreadMessages",
    label: "Unread Messages",
    icon: "✉",
    className: "border-primary-200 bg-primary-50",
  },
];

export const TASK_STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
