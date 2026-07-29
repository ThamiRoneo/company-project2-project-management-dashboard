import { relativeDate } from "../../utils/formatDate";
import type { Task } from "../../types";

interface ProjectDeadlinesProps {
  tasks: Task[];
}

export default function ProjectDeadlines({ tasks }: ProjectDeadlinesProps) {
  // Upcoming: tasks that are not completed and have a due date
  const upcoming = tasks
    .filter((t) => t.status !== "completed")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 6);

  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
      <h2 className="text-lg font-bold text-text mb-4 uppercase tracking-wider">
        Upcoming Deadlines
      </h2>
      {upcoming.length === 0 ? (
        <p className="text-sm text-text-muted">All tasks are completed! 🎉</p>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((t) => {
            const label = relativeDate(t.dueDate);
            const isUrgent = label.includes("Today") || label.includes("Tomorrow") || label.includes("Overdue");
            return (
              <li
                key={t.id}
                className="flex items-center justify-between p-2.5 rounded-button border-2 border-border"
              >
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-sm font-bold text-text truncate">{t.title}</p>
                  <p className="text-xs font-semibold text-text-muted">{t.assignee.name}</p>
                </div>
                <span
                  className={`font-bold text-xs flex-shrink-0 tabular-nums ${
                    isUrgent ? "text-danger" : "text-text-muted"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
