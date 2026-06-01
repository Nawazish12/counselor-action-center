import type { StudentProfileProps } from "../types";
import {
  getEnrollmentBadgeColor,
  getGPAColor,
  getGradeColor,
  getStudentInitials,
} from "../utils/student";

export const StudentProfile = ({ student }: StudentProfileProps) => {
  const initials = getStudentInitials(student.name);

  return (
    <>
    <div className="card card-hover mb-6 border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-4xl font-bold text-primary-700 shadow-sm">
          {initials}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-3xl font-bold text-slate-900">{student.name}</h2>
            <div
              className={`badge whitespace-nowrap border ${getEnrollmentBadgeColor(student.enrollmentStatus)}`}
            >
              {student.enrollmentStatus === "at_risk" ? "At Risk" : "Active"}
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-600">{student.email}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <p>
              Grade <span className={`font-bold ${getGradeColor(student.grade)}`}>{student.grade}</span>
            </p>
            <p>
              GPA <span className={`font-bold ${getGPAColor(student.gpa)}`}>{student.gpa.toFixed(2)}</span>
            </p>
            <p>
              ID <span className="font-semibold text-slate-800">{student.id}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
