import { useMemo } from "react";
import type { Project } from "../types";

interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  upcomingDeadlines: Project[];
}

/**
 * Custom hook that derives dashboard statistics from the projects array.
 * Uses useMemo for performance — only recalculates when projects change.
 */
export function useProjects(projects: Project[]): ProjectStats {
  return useMemo(() => {
    const now = new Date();
    const allTasks = projects.flatMap((p) => p.tasks);

    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const completedProjects = projects.filter((p) => p.status === "completed").length;
    const onHoldProjects = projects.filter((p) => p.status === "on_hold").length;

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((t) => t.status === "completed").length;

    // Overdue: not completed AND due date is in the past
    const overdueTasks = allTasks.filter(
      (t) => t.status !== "completed" && new Date(t.dueDate) < now,
    ).length;

    // Upcoming deadlines: active projects sorted by soonest end date
    const upcomingDeadlines = [...projects]
      .filter((p) => p.status === "active" && new Date(p.endDate) >= now)
      .sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      )
      .slice(0, 5);

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      onHoldProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
      upcomingDeadlines,
    };
  }, [projects]);
}
