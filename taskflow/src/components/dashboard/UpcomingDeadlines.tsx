import { useNavigate } from "react-router-dom";
import { relativeDate } from "../../utils/formatDate";
import type { Project } from "../../types";

interface UpcomingDeadlinesProps {
  deadlines: Project[];
}

export default function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  const navigate = useNavigate();

  if (deadlines.length === 0) {
    return (
      <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
        <h2 className="text-lg font-bold text-text mb-4 uppercase tracking-wider">
          Upcoming Deadlines
        </h2>
        <p className="text-text-muted text-sm">No upcoming deadlines.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
      <h2 className="text-lg font-bold text-text mb-4 uppercase tracking-wider">
        Upcoming Deadlines
      </h2>
      <ul className="space-y-3">
        {deadlines.map((p) => {
          const label = relativeDate(p.endDate);
          const isUrgent = label.includes("Today") || label.includes("Tomorrow") || label.includes("Overdue");

          return (
            <li key={p.id}>
              <button
                onClick={() => navigate(`/projects/${p.id}`)}
                className="w-full text-left group flex items-center justify-between p-3 rounded-button border-2 border-border hover:bg-surface-muted transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    p.status === "active" ? "bg-in-progress" : "bg-completed"
                  }`} />
                  <span className="font-bold text-text truncate group-hover:text-primary transition-colors">
                    {p.name}
                  </span>
                </div>
                <span
                  className={`font-bold text-sm flex-shrink-0 ml-3 tabular-nums ${
                    isUrgent ? "text-danger" : "text-text-muted"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
