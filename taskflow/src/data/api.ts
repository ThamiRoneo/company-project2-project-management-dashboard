import { mockProjects } from "./mockProjects";
import { mockTasks } from "./mockTasks";
import { mockTeamMembers } from "./mockTeamMembers";
import { mockActivities } from "./mockProjects";
import type { Project, Task, TeamMember, Activity } from "../types";

// ── Configuration ──
const SIMULATED_DELAY_MS = 400;
const ERROR_RATE = 0.05; // 5% chance of failure (for testing error states)

// ── Helpers ──
function delay(ms: number = SIMULATED_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeThrow(): void {
  if (Math.random() < ERROR_RATE) {
    throw new Error("Simulated network error — please retry.");
  }
}

/** Shallow-clone so callers can mutate without affecting the source */
function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// ── Public API ──

export async function fetchProjects(): Promise<Project[]> {
  await delay();
  maybeThrow();
  return clone(mockProjects);
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  await delay();
  maybeThrow();
  const project = mockProjects.find((p) => p.id === id) ?? null;
  return clone(project);
}

export async function fetchTasks(): Promise<Task[]> {
  await delay();
  maybeThrow();
  return clone(mockTasks);
}

export async function fetchTaskById(id: string): Promise<Task | null> {
  await delay();
  maybeThrow();
  const task = mockTasks.find((t) => t.id === id) ?? null;
  return clone(task);
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  await delay();
  maybeThrow();
  return clone(mockTeamMembers);
}

export async function fetchActivities(): Promise<Activity[]> {
  await delay();
  maybeThrow();
  return clone(mockActivities);
}

export async function fetchActivitiesByProject(
  projectId: string,
): Promise<Activity[]> {
  await delay();
  maybeThrow();
  return clone(mockActivities.filter((a) => a.projectId === projectId));
}

// ── Mutations (simulated — update in-memory only) ──

export async function updateTask(
  taskId: string,
  updates: Partial<Task>,
): Promise<Task> {
  await delay(200);
  maybeThrow();

  const idx = mockTasks.findIndex((t) => t.id === taskId);
  if (idx === -1) throw new Error(`Task "${taskId}" not found`);

  Object.assign(mockTasks[idx], updates);

  // Also update the task inside its parent project (if present)
  const project = mockProjects.find((p) => p.id === mockTasks[idx].projectId);
  if (project) {
    const taskIdx = project.tasks.findIndex((t) => t.id === taskId);
    if (taskIdx !== -1) Object.assign(project.tasks[taskIdx], updates);
  }

  return clone(mockTasks[idx]);
}

export async function createTask(
  task: Omit<Task, "id" | "createdAt">,
): Promise<Task> {
  await delay(200);
  maybeThrow();

  const newTask: Task = {
    ...task,
    id: `t-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };

  mockTasks.push(newTask);

  // Also push into parent project
  const project = mockProjects.find((p) => p.id === newTask.projectId);
  if (project) {
    project.tasks.push(newTask);
  }

  return clone(newTask);
}
