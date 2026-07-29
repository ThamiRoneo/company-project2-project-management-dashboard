import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import type { ProjectStatus } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import ProjectSearchBar from "../components/projects/ProjectSearchBar";
import ProjectStatusFilter from "../components/projects/ProjectStatusFilter";
import ProjectList from "../components/projects/ProjectList";

export default function Projects() {
  const { projects, loading, error, retry } = useProjectContext();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | null>(null);

  if (loading) {
    return <LoadingSpinner message="Loading projects..." size="lg" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} fullPage />;
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        message="Projects will appear here once they are created."
        icon="📁"
        action={{ label: "Refresh", onClick: retry }}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text uppercase tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {projects.length} project{projects.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <ProjectSearchBar value={search} onChange={setSearch} />
        </div>
        <ProjectStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Results count when filtered */}
      {projects.length > 0 && (
        <ProjectList
          projects={projects}
          search={search}
          statusFilter={statusFilter}
        />
      )}
    </div>
  );
}
