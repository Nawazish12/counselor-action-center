export function ActionCenterHeader() {
  return (
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
  );
}
