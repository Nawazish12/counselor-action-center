import type { TaskPriority, TaskStatus } from "../types";

export const getPriorityConfig = (priority: TaskPriority) => {
  switch (priority) {
    case "urgent":
      return { bg: "bg-danger-500", text: "text-white" };
    case "high":
      return { bg: "bg-orange-500", text: "text-white" };
    case "medium":
      return { bg: "bg-yellow-500", text: "text-white" };
    default:
      return { bg: "bg-green-500", text: "text-white" };
  }
};

export const getStatusBorderColor = (status: TaskStatus) => {
  switch (status) {
    case "completed":
      return "border-l-4 border-l-success-500 bg-success-50";
    case "in_progress":
      return "border-l-4 border-l-primary-500 bg-blue-50";
    default:
      return "border-l-4 border-l-gray-400 bg-gray-50";
  }
};

export const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case "completed":
      return "✓";
    case "in_progress":
      return "⟳";
    default:
      return "○";
  }
};

export const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const isOverdue = (dateString: string, status: TaskStatus) => {
  if (status === "completed") return false;
  return new Date(dateString) < new Date();
};
