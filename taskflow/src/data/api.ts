import type { Project, Task, TeamMember } from "../types";
import { mockProjects } from "./mockProjects";
import { mockTasks } from "./mockTasks";
import { mockTeamMembers } from "./mockTeamMembers";

// Simulates real network latency so loading states are actually visible
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Projects ----

export async function getProjects(): Promise<Project[]> {
  await delay(500);
  return mockProjects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  await delay(500);
  return mockProjects.find((p) => p.id === id);
}

// ---- Tasks ----

export async function getTasks(): Promise<Task[]> {
  await delay(500);
  return mockTasks;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  await delay(400);
  return mockTasks.find((t) => t.id === id);
}

export async function getTasksByProjectId(projectId: string): Promise<Task[]> {
  await delay(400);
  return mockTasks.filter((t) => t.projectId === projectId);
}

// ---- Team Members ----

export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay(300);
  return mockTeamMembers;
}