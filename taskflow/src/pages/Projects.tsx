import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project, ProjectStatus } from "../types";
import { fetchProjects } from "../data/api";
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

  useEffect(() => {
    setIsLoading(true);

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
        <ProjectSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <ProjectStatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {isLoading && (
        <p className="text-gray-500">Loading projects...</p>
      )}

      {!isLoading && error && (
        <p className="text-red-500">{error}</p>
      )}

      {!isLoading && !error && filteredProjects.length === 0 && (
        <p className="text-gray-400">
          No projects match your search.
        </p>
      )}

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