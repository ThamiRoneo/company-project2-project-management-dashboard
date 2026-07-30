import type { Activity } from "../../types";
import { formatDate } from "../../utils/formatDate";

interface ProjectActivityProps {
  activities: Activity[];
}

export default function ProjectActivity({ activities }: ProjectActivityProps) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
      <h2 className="text-lg font-bold text-text mb-4 uppercase tracking-wider">
        Recent Activity
      </h2>
      {sorted.length === 0 ? (
        <p className="text-sm text-text-muted">No recent activity.</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((a) => (
            <li key={a.id} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-text">{a.message}</p>
                <p className="text-xs font-bold text-text-muted mt-0.5">
                  {formatDate(a.timestamp)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
