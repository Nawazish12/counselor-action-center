import type { ErrorStateProps } from "../types";

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <>
    <div className="flex min-h-80 items-center justify-center rounded-lg bg-gradient-to-br from-danger-50 to-danger-100">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-5xl">⚠️</div>
        <h3 className="text-lg font-bold text-danger-700">Something went wrong</h3>
        <p className="max-w-xs text-sm text-danger-600">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-primary mt-2 text-sm font-semibold"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
    </>
  );
};
