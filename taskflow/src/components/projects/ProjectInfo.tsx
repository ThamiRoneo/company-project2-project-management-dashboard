import type { Project } from "../../types";
import { formatDate } from "../../utils/formatDate";

interface ProjectInfoProps {
  project: Project;
}

const statusLabel: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-in-progress" },
  completed: { label: "Completed", color: "bg-completed" },
  on_hold: { label: "On Hold", color: "bg-todo" },
};

export default function ProjectInfo({ project }: ProjectInfoProps) {
  const { label, color } = statusLabel[project.status];
  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter((t) => t.status === "completed").length;
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-text">{project.name}</h2>
        <span
          className={`inline-block ${color} text-text-inverse text-xs font-bold px-2.5 py-1 rounded-badge border-2 border-border uppercase tracking-wider`}
        >
          {label}
        </span>
      </div>

      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-bold text-text">Progress</span>
          <span className="font-bold text-text-muted">{pct}%</span>
        </div>
        <div className="w-full bg-background border-2 border-border rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              pct === 100 ? "bg-completed" : "bg-primary"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs font-bold text-text-muted mt-1">
          {doneTasks} of {totalTasks} tasks completed
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-bold text-text-muted uppercase tracking-wider text-xs mb-0.5">Start</p>
          <p className="font-bold text-text">{formatDate(project.startDate)}</p>
        </div>
        <div>
          <p className="font-bold text-text-muted uppercase tracking-wider text-xs mb-0.5">End</p>
          <p className="font-bold text-text">{formatDate(project.endDate)}</p>
        </div>
      </div>
    </div>
  );
}
