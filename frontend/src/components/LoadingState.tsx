export const LoadingState = () => {
  return (
    <>
    <div className="min-h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-700">
          Loading student data...
        </p>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-2/5 animate-pulse rounded bg-slate-200"></div>
        <div className="h-16 w-full animate-pulse rounded bg-slate-200"></div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded bg-slate-200"
            ></div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};
