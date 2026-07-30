import type { TaskStatus, TaskPriority } from "../types";

/**
 * Maps a task status to its corresponding Tailwind bg class.
 */
export function getStatusBg(status: TaskStatus): string {
  const map: Record<TaskStatus, string> = {
    todo: "bg-todo",
    in_progress: "bg-in-progress",
    in_review: "bg-in-review",
    completed: "bg-completed",
  };
  return map[status];
}

/**
 * Maps a task priority to its corresponding Tailwind bg class.
 */
export function getPriorityBg(priority: TaskPriority): string {
  const map: Record<TaskPriority, string> = {
    low: "bg-priority-low",
    medium: "bg-priority-medium",
    high: "bg-priority-high",
  };
  return map[priority];
}
