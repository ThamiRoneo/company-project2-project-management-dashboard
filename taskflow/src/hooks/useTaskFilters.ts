import { useState, useMemo } from "react";
import type { Project, ProjectStatus } from "../types";

type FilterOption = "all" | ProjectStatus;

interface UseTaskFiltersResult {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: FilterOption;
  setStatusFilter: (value: FilterOption) => void;
  filteredProjects: Project[];
}

export default function useTaskFilters(
  projects: Project[]
): UseTaskFiltersResult {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<FilterOption>("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredProjects,
  };
}