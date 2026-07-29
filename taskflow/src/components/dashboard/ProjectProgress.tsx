import { useNavigate } from "react-router-dom";
import type { Project } from "../../types";

interface ProjectProgressProps {
  projects: Project[];
}

export default function ProjectProgress({ projects }: ProjectProgressProps) {
  const navigate = useNavigate();

  // Sort by progress ascending so low-completion projects show first
  const sorted = [...projects]
    .map((p) => {
      const total = p.tasks.length;
      const done = p.tasks.filter((t) => t.status === "completed").length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return { project: p, pct, total, done };
    })
    .sort((a, b) => a.pct - b.pct);

  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
      <h2 className="text-lg font-bold text-text mb-4 uppercase tracking-wider">
        Project Progress
      </h2>
      <ul className="space-y-4">
        {sorted.map(({ project, pct, done, total }) => (
          <li key={project.id}>
            <button
              onClick={() => navigate(`/projects/${project.id}`)}
              className="w-full text-left group"
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-text group-hover:text-primary transition-colors">
                  {project.name}
                </span>
                <span className="text-text-muted font-semibold tabular-nums">
                  {done}/{total} · {pct}%
                </span>
              </div>
              <div className="w-full bg-background border-2 border-border rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    pct === 100
                      ? "bg-completed"
                      : pct > 0
                        ? "bg-primary"
                        : "bg-transparent"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
