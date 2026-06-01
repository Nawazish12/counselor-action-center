import type { StudentSelectorProps } from "../types";

export const StudentSelector = ({
  selectedStudentId,
  onSelectStudent,
  students,
  isLoading = false,
}: StudentSelectorProps) => {

  return (
    <>
    
    <div className="card mb-0 border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-800">My Students</h3>
        <p className="text-sm text-slate-500">{students.length} assigned</p>
      </div>

      <label
        htmlFor="student-select"
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
      >
        Student
      </label>
      <div className="relative">
        <select
          id="student-select"
          value={selectedStudentId}
          onChange={(e) => onSelectStudent(e.target.value)}
          disabled={isLoading}
          className="input-field appearance-none pr-10 text-sm font-medium"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
    
      </div>

    </div>
    </>
  );
};
