import {
  createContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Project, Task, TaskStatus, TeamMember } from "../types";
import {
  fetchProjects,
  updateTask as apiUpdateTask,
  createTask as apiCreateTask,
} from "../data/api";

// ── Context shape ──
export interface ProjectContextValue {
  /** All projects (loading → loaded/error) */
  projects: Project[];
  /** Loading flag for initial fetch */
  loading: boolean;
  /** Error message, if any */
  error: string | null;
  /** Retry the initial fetch after an error */
  retry: () => void;

  /** Find a project by ID */
  getProjectById: (id: string) => Project | undefined;
  /** Find a task by ID (searches across all projects) */
  getTaskById: (id: string) => Task | undefined;

  /** Update a task's fields */
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  /** Convenience: update just the status */
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  /** Create a new task and add it to the parent project */
  createTask: (task: {
    projectId: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: "low" | "medium" | "high";
    assignee: TeamMember;
    dueDate: string;
  }) => Promise<void>;
}

export const ProjectCtx = createContext<ProjectContextValue | null>(null);

// ── Provider ──
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial fetch — runs once on mount
  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProjects();
        if (!cancelled) setProjects(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load projects",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Retry function (called from error state)
  const retry = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load projects",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getProjectById = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects],
  );

  const getTaskById = useCallback(
    (id: string) => projects.flatMap((p) => p.tasks).find((t) => t.id === id),
    [projects],
  );

  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Task>) => {
      const updated = await apiUpdateTask(taskId, updates);
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          tasks: p.tasks.map((t) => (t.id === taskId ? updated : t)),
        })),
      );
    },
    [],
  );

  const updateTaskStatus = useCallback(
    async (taskId: string, status: TaskStatus) => {
      await updateTask(taskId, { status });
    },
    [updateTask],
  );

  const createTask = useCallback(
    async (input: {
      projectId: string;
      title: string;
      description: string;
      status: TaskStatus;
      priority: "low" | "medium" | "high";
      assignee: TeamMember;
      dueDate: string;
    }) => {
      const newTask = await apiCreateTask(input);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === input.projectId
            ? { ...p, tasks: [...p.tasks, newTask] }
            : p,
        ),
      );
    },
    [],
  );

  return (
    <ProjectCtx.Provider
      value={{
        projects,
        loading,
        error,
        retry,
        getProjectById,
        getTaskById,
        updateTask,
        updateTaskStatus,
        createTask,
      }}
    >
      {children}
    </ProjectCtx.Provider>
  );
}
