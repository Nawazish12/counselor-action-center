import type { UrgencyMetricsProps } from "../types";
import { URGENCY_STAT_CARD_CONFIGS } from "../constants";
import { getUrgencyConfig } from "../utils/urgency";
import { isOverdue } from "../utils/task";

export const UrgencyMetrics = ({ summary, tasks }: UrgencyMetricsProps) => {
  const urgencyConfig = getUrgencyConfig(summary.calculatedUrgency);
  const openTasks = tasks.filter((task) => task.status !== "completed").length;
  const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate, task.status)).length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  const statCardValues = {
    openTasks,
    overdueTasks,
    completedTasks,
    unreadMessages: summary.unreadMessagesCount,
  };

  return (
    <>
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {URGENCY_STAT_CARD_CONFIGS.map((card) => (
          <div key={card.label} className={`card p-4 ${card.className}`}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                {card.label}
              </p>
              <span className="text-base text-gray-500">{card.icon}</span>
            </div>
            <p className="text-4xl font-bold leading-none text-slate-900">
              {statCardValues[card.key]}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`card card-hover border ${urgencyConfig.borderColor} ${urgencyConfig.bgColor}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              Calculated Urgency
            </p>
            <p className={`mt-1 text-xl font-bold ${urgencyConfig.textColor}`}>
              {summary.calculatedUrgency.charAt(0).toUpperCase() +
                summary.calculatedUrgency.slice(1)}
            </p>
          </div>
          <span className="text-2xl">{urgencyConfig.icon}</span>
        </div>
      </div>
    </div>
    </>
  );
};
