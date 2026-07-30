import { useMemo, useState } from "react";
import type { Task, TaskStatus } from "../types";

interface UseTaskFiltersReturn {
  /** The filtered list of tasks */
  filteredTasks: Task[];
  /** Current search query */
  search: string;
  /** Set the search query */
  setSearch: (q: string) => void;
  /** Currently selected status filter (or null for all) */
  statusFilter: TaskStatus | null;
  /** Set the status filter */
  setStatusFilter: (s: TaskStatus | null) => void;
  /** Currently selected priority filter (or null for all) */
  priorityFilter: string | null;
  /** Set the priority filter */
  setPriorityFilter: (p: string | null) => void;
  /** Reset all filters */
  resetFilters: () => void;
}

/**
 * Custom hook that provides search + filter logic for tasks.
 * Filters by title/description, status, and priority.
 */
export function useTaskFilters(tasks: Task[]): UseTaskFiltersReturn {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Text search on title + description
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter) {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    return result;
  }, [tasks, search, statusFilter, priorityFilter]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter(null);
    setPriorityFilter(null);
  };

  return {
    filteredTasks,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    resetFilters,
  };
}
