import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { TaskList } from "../components/TaskList";
import type { TaskListProps } from "../types";

const tasks: TaskListProps["tasks"] = [
  {
    id: "tsk_001",
    studentId: "stu_001",
    title: "Submit FAFSA application",
    description: "Deadline is approaching.",
    status: "todo",
    priority: "urgent",
    dueDate: "2026-06-05",
    createdAt: "2026-05-13T14:00:00Z",
    updatedAt: "2026-05-13T14:00:00Z",
  },
];

describe("TaskList", () => {
  test("changing status from dropdown calls onUpdateStatus", async () => {
    const onUpdateStatus = vi.fn().mockResolvedValue(true);
    const user = userEvent.setup();

    render(<TaskList tasks={tasks} onUpdateStatus={onUpdateStatus} />);

    const statusSelect = screen.getByRole("combobox");
    await user.selectOptions(statusSelect, "completed");

    expect(onUpdateStatus).toHaveBeenCalledWith("tsk_001", "completed");
  });
});
