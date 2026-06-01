import type { EnrollmentStatus } from "../types";

export const getStudentInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("");

export const getEnrollmentBadgeColor = (status: EnrollmentStatus) => {
  if (status === "at_risk") {
    return "bg-danger-100 text-danger-700 border-danger-300";
  }
  return "bg-success-100 text-success-700 border-success-300";
};

export const getGradeColor = (grade: number) => {
  if (grade >= 11) return "text-success-600";
  if (grade >= 9) return "text-primary-600";
  return "text-warning-600";
};

export const getGPAColor = (gpa: number) => {
  if (gpa >= 3.5) return "text-success-600";
  if (gpa >= 3.0) return "text-primary-600";
  if (gpa >= 2.5) return "text-warning-600";
  return "text-danger-600";
};
