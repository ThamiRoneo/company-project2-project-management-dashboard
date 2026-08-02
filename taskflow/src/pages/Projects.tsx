import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { fetchProjects } from "../data/api";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectSearchBar from "../components/projects/ProjectSearchBar";
import ProjectStatusFilter from "../components/projects/ProjectStatusFilter";
import useTaskFilters from "../hooks/useTaskFilters";

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load projects.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { filteredProjects, ...filterProps } = useTaskFilters(projects);

  return (
    <div className="flex justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-800">Projects</h1>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <ProjectSearchBar
            value={filterProps.searchTerm}
            onChange={filterProps.setSearchTerm}
          />
          <ProjectStatusFilter
            value={filterProps.statusFilter}
            onChange={filterProps.setStatusFilter}
          />
        </div>

        {isLoading && <p className="text-gray-500">Loading projects...</p>}

        {!isLoading && error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && filteredProjects.length === 0 && (
          <p className="text-gray-400">No projects match your search.</p>
        )}

        {!isLoading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
