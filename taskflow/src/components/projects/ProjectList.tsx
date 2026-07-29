import type { Project } from "../../types";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  search: string;
  statusFilter: string | null;
}

export default function ProjectList({ projects, search, statusFilter }: ProjectListProps) {
  // Client-side filtering
  let filtered = projects;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  if (statusFilter) {
    filtered = filtered.filter((p) => p.status === statusFilter);
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <span className="text-5xl mb-4">📭</span>
        <h3 className="text-xl font-bold text-text mb-1">No projects found</h3>
        <p className="text-sm text-text-muted">
          {search ? "Try a different search or filter." : "No projects match this status."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {filtered.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
