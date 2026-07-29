<<<<<<< HEAD
import type { Project, Task, TaskStatus, TeamMember } from "../types";
import { mockProjects } from "./mockProjects";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Projects ----

export async function fetchProjects(): Promise<Project[]> {
  await delay(500);
  return mockProjects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  await delay(500);
  return mockProjects.find((p) => p.id === id);
}

// ---- Tasks ----
// Tasks live inside each project's `tasks` array (per mockProjects.ts),
// so these helpers search/mutate across all projects.

export async function updateTask(
  taskId: string,
  updates: Partial<Task>
): Promise<Task> {
  await delay(300);

  for (const project of mockProjects) {
    const task = project.tasks.find((t) => t.id === taskId);
    if (task) {
      Object.assign(task, updates);
      return task;
    }
  }

  throw new Error(`Task with id ${taskId} not found`);
}

export async function createTask(input: {
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  assignee: TeamMember;
  dueDate: string;
}): Promise<Task> {
  await delay(300);

  const project = mockProjects.find((p) => p.id === input.projectId);
  if (!project) {
    throw new Error(`Project with id ${input.projectId} not found`);
  }

  const newTask: Task = {
    ...input,
    id: `task-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  project.tasks.push(newTask);
  return newTask;
}
=======
>>>>>>> parent of 17983dc (feat: add mock data for tasks and team members, implement custom hooks for local storage and project context, enhance dashboard and project pages with loading and error handling, and improve task filtering functionality)
