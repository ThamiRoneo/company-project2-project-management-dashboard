import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project, ProjectStatus } from "../types";
import { mockProjects } from "../data/mockProjects";
import ProjectCard from "../components/projects/ProjectCard";

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

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as FilterOption);
  };

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
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search projects..."
          className="border rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>
      </div>

      {isLoading && <p className="text-gray-500">Loading projects...</p>}

      {!isLoading && error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && filteredProjects.length === 0 && (
        <p className="text-gray-400">No projects match your search.</p>
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