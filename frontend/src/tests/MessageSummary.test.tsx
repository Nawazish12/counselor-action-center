import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MessageSummary } from "../components/MessageSummary";
import type { MessageSummaryProps } from "../types";

const messages: MessageSummaryProps["messages"] = [
  {
    id: "msg_001",
    studentId: "stu_001",
    from: "Mrs. Thompson (Math)",
    subject: "Maya missing assignments",
    preview: "Maya has not submitted the last three homework sets...",
    read: false,
    receivedAt: "2026-05-30T08:30:00Z",
  },
  {
    id: "msg_002",
    studentId: "stu_001",
    from: "Attendance Office",
    subject: "Absence notification",
    preview: "Maya was marked absent on May 25. Please follow up...",
    read: true,
    receivedAt: "2026-05-25T09:00:00Z",
  },
];

describe("MessageSummary", () => {
  test("renders unread count and new badge", () => {
    render(<MessageSummary messages={messages} />);

    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("1 unread")).toBeInTheDocument();
    expect(screen.getByText("1 new")).toBeInTheDocument();
  });
});
