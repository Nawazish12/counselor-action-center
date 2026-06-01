import { useState } from "react";
import { useActionCenter } from "../hooks/useActionCenter";
import { StudentSelector } from "../components/StudentSelector";
import { StudentProfile } from "../components/StudentProfile";
import { UrgencyMetrics } from "../components/UrgencyMetrics";
import { TaskList } from "../components/TaskList";
import { MessageSummary } from "../components/MessageSummary";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { STUDENTS } from "../constants";
import type { TaskStatus } from "../types";

export default function ActionCenter() {
  const [selectedStudentId, setSelectedStudentId] = useState("stu_001");
  const { data, loading, isRefreshing, error, updateTaskStatus, refetch } =
    useActionCenter(selectedStudentId);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const success = await updateTaskStatus(taskId, newStatus);
    return success;
  };

  return (
    <>
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-12 text-white shadow-lg sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-4xl">🎓</span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Counselor Action Center
            </h1>
          </div>
          <p className="text-lg text-purple-100">
            Unified view of student priorities, tasks, and communication
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="xl:sticky xl:top-6 xl:self-start">
              <StudentSelector
                selectedStudentId={selectedStudentId}
                onSelectStudent={setSelectedStudentId}
                students={STUDENTS}
                isLoading={isRefreshing}
              />
            </aside>

            <section>
              {loading && !data && <LoadingState />}

              {error && !data && <ErrorState message={error} onRetry={refetch} />}

              {data && (
                <div>
                  {error && (
                    <div className="mb-4 rounded-lg border border-danger-300 bg-danger-50 px-4 py-3 text-sm text-danger-700">
                      Unable to refresh latest data: {error}
                    </div>
                  )}
                  <StudentProfile student={data.student} />
                  <UrgencyMetrics summary={data.summary} tasks={data.tasks} />
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                      <TaskList
                        tasks={data.tasks}
                        onUpdateStatus={handleStatusChange}
                      />
                    </div>

                    <div>
                      <MessageSummary messages={data.messages} />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-300 bg-slate-900 px-4 py-6 text-center text-sm text-slate-400">
        <p>
          © 2026 Counselor Action Center 
          Express
        </p>
      </footer>
    </div>
    </>
  );
}
