import { useState } from "react";
import { TASK_STATUS_OPTIONS } from "../constants";
import type { TaskStatus } from "../types";
import type { TaskListProps } from "../types";
import {
  formatDueDate,
  getPriorityConfig,
  getStatusBorderColor,
  getStatusIcon,
  isOverdue,
} from "../utils/task";

export const TaskList = ({ tasks, onUpdateStatus }: TaskListProps) => {
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    setUpdatingTaskId(taskId);
    await onUpdateStatus(taskId, newStatus);
    setUpdatingTaskId(null);
  };

  return (
    <>
    <div className="card card-hover border border-slate-200 p-0">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-3xl font-semibold text-slate-900">Tasks</h3>
        <p className="text-sm text-slate-500">
          {tasks.length} total · sorted by priority and due date
        </p>
      </div>

      {tasks.length === 0 ? (
        <p className="py-10 text-center text-slate-500">No tasks assigned</p>
      ) : (
        <div className="space-y-0">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`border-b border-slate-100 p-5 last:border-b-0 ${getStatusBorderColor(task.status)}`}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg font-bold text-slate-500">
                    {getStatusIcon(task.status)}
                  </span>
                  <h4
                    className={`text-xl font-semibold leading-tight ${task.status === "completed" ? "line-through text-slate-500" : "text-slate-900"}`}
                  >
                    {task.title}
                  </h4>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`badge border text-xs font-semibold ${getPriorityConfig(task.priority).bg} ${getPriorityConfig(task.priority).text}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              </div>

              <p className="mb-3 ml-7 text-lg text-slate-700">{task.description}</p>

              <div className="ml-7 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-3 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      isOverdue(task.dueDate, task.status)
                        ? "font-bold text-danger-600"
                        : "text-slate-600"
                    }`}
                  >
                    📅 {formatDueDate(task.dueDate)}
                  </span>
                  {isOverdue(task.dueDate, task.status) && (
                    <span className="badge bg-danger-500 text-xs font-bold text-white">
                      Overdue
                    </span>
                  )}
                </div>

                <div className="flex w-full items-center gap-2 md:w-auto">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value as TaskStatus)
                    }
                    disabled={updatingTaskId === task.id}
                    className="input-field min-w-40 bg-white text-sm"
                  >
                    {TASK_STATUS_OPTIONS.map((statusOption) => (
                      <option key={statusOption.value} value={statusOption.value}>
                        {statusOption.label}
                      </option>
                    ))}
                  </select>
              
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};
