import type { UrgencyLevel } from "../types";

export const getUrgencyConfig = (urgency: UrgencyLevel) => {
  switch (urgency) {
    case "critical":
      return {
        bgColor: "bg-gradient-to-br from-danger-100 to-danger-50",
        borderColor: "border-danger-300",
        textColor: "text-danger-700",
        icon: "🚨",
      };
    case "high":
      return {
        bgColor: "bg-gradient-to-br from-warning-100 to-warning-50",
        borderColor: "border-warning-300",
        textColor: "text-warning-700",
        icon: "⚠️",
      };
    case "medium":
      return {
        bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
        borderColor: "border-blue-300",
        textColor: "text-blue-700",
        icon: "📋",
      };
    default:
      return {
        bgColor: "bg-gradient-to-br from-success-100 to-success-50",
        borderColor: "border-success-300",
        textColor: "text-success-700",
        icon: "✓",
      };
  }
};
