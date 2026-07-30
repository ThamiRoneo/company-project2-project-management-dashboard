import { useNavigate } from "react-router-dom";
import type { Project } from "../../types";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../../utils/formatDate";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((t) => t.status === "completed").length;
  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statusMap: Record<string, "todo" | "in_progress" | "in_review" | "completed"> = {
    active: "in_progress",
    completed: "completed",
    on_hold: "todo",
  };

  return (
    <button
      onClick={() => navigate(`/projects/${project.id}`)}
      className="w-full text-left group"
    >
      <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5 transition-transform hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-text group-hover:text-primary transition-colors truncate">
            {project.name}
          </h3>
          <StatusBadge status={statusMap[project.status]} />
        </div>
        <p className="text-sm text-text-muted line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="w-full bg-background border-2 border-border rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                pct === 100 ? "bg-completed" : "bg-primary"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs font-bold text-text-muted mt-1 text-right tabular-nums">
            {completedTasks}/{totalTasks} tasks · {pct}%
          </p>
        </div>

        {/* Team avatars + deadline */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {project.teamMembers.slice(0, 4).map((m) => (
              <span
                key={m.id}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-text-inverse text-xs font-bold border-2 border-surface"
                title={m.name}
              >
                {m.avatar}
              </span>
            ))}
            {project.teamMembers.length > 4 && (
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-muted text-text-muted text-xs font-bold border-2 border-surface">
                +{project.teamMembers.length - 4}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-text-muted">
            Ends {formatDate(project.endDate)}
          </span>
        </div>
      </div>
    </button>
  );
}
