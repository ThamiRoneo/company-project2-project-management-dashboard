import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project, ProjectStatus } from "../types";
import { mockProjects } from "../data/mockProjects";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectSearchBar from "../components/projects/ProjectSearchBar";
import ProjectStatusFilter from "../components/projects/ProjectStatusFilter";

// "all" isn't a real ProjectStatus, it's just for the dropdown's default option
type FilterOption = "all" | ProjectStatus;

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<FilterOption>("all");

  // fake network delay so loading state is actually visible, instead of flashing instantly
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        setProjects(mockProjects);
        setError(null);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setIsLoading(false);
      }
    }, 700);

    // cancels the pending update if the component unmounts before the timer finishes
    return () => clearTimeout(timer);
  }, []);

  // runs on every render, recalculates the visible list based on current search + filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Projects</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <ProjectSearchBar value={searchTerm} onChange={setSearchTerm} />
        <ProjectStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {isLoading && <p className="text-gray-500">Loading projects...</p>}

      {!isLoading && error && <p className="text-red-500">{error}</p>}

      {/* nothing matched the search/filter, but data loaded fine */}
      {!isLoading && !error && filteredProjects.length === 0 && (
        <p className="text-gray-400">No projects match your search.</p>
      )}

      {/* only show the grid once loading is done, no error, and results actually exist */}
      {!isLoading && !error && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={(id) => navigate(`/projects/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// lesedi

