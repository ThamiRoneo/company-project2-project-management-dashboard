<<<<<<< HEAD
import type { Project } from "../types";
import { mockTeamMembers } from "./mockTeamMembers";
import { mockTasks } from "./mockTasks";

const [Lerato, Thami, Galaletsang, Lesedi, Gareth] = mockTeamMembers;

const tasksFor = (projectId: string) =>
  mockTasks.filter((t) => t.projectId === projectId);

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Website Redesign",
    description: "Full redesign of the marketing site.",
    status: "active",
    startDate: "2026-06-01T00:00:00Z",
    endDate: "2026-08-15T00:00:00Z",
    teamMembers: [Lerato, Thami],
    tasks: tasksFor("proj-1"),
  },
  {
    id: "proj-2",
    name: "Mobile App Launch",
    description: "Prepare app for public release.",
    status: "on_hold",
    startDate: "2026-06-15T00:00:00Z",
    endDate: "2026-09-01T00:00:00Z",
    teamMembers: [Galaletsang],
    tasks: tasksFor("proj-2"),
  },
  {
    id: "proj-3",
    name: "Internal Dashboard Revamp",
    description: "Upgrade admin dashboard with new analytics.",
    status: "completed",
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-06-30T00:00:00Z",
    teamMembers: [Lerato, Gareth],
    tasks: tasksFor("proj-3"),
  },
  {
    id: "proj-4",
    name: "Client Onboarding Flow",
    description: "Streamline new client sign-up process.",
    status: "active",
    startDate: "2026-07-01T00:00:00Z",
    endDate: "2026-09-15T00:00:00Z",
    teamMembers: [Lesedi, Gareth],
    tasks: tasksFor("proj-4"),
  },
];
=======
>>>>>>> parent of 17983dc (feat: add mock data for tasks and team members, implement custom hooks for local storage and project context, enhance dashboard and project pages with loading and error handling, and improve task filtering functionality)
