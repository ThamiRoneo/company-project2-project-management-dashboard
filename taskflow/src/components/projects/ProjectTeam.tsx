import type { TeamMember } from "../../types";

interface ProjectTeamProps {
  members: TeamMember[];
}

export default function ProjectTeam({ members }: ProjectTeamProps) {
  return (
    <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-5">
      <h2 className="text-lg font-bold text-text mb-4 uppercase tracking-wider">
        Team ({members.length})
      </h2>
      {members.length === 0 ? (
        <p className="text-sm text-text-muted">No team members assigned.</p>
      ) : (
        <ul className="space-y-3">
          {members.map((m) => (
            <li key={m.id} className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-text-inverse text-sm font-bold border-2 border-border flex-shrink-0">
                {m.avatar}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text truncate">{m.name}</p>
                <p className="text-xs font-semibold text-text-muted">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
