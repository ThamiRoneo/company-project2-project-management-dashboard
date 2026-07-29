<<<<<<< HEAD
import type { Task } from "../types";
import { mockTeamMembers } from "./mockTeamMembers";

const [Lerato, Thami, Galaletsang, Lesedi, Gareth] = mockTeamMembers;

export const mockTasks: Task[] = [
  {
    id: "task-1",
    projectId: "proj-1",
    title: "Design homepage hero",
    description: "New hero section with updated branding.",
    status: "in_progress",
    priority: "high",
    assignee: Lerato,
    dueDate: "2026-08-01T00:00:00Z",
    createdAt: "2026-07-01T00:00:00Z",
  },
  {
    id: "task-2",
    projectId: "proj-1",
    title: "Fix nav bar responsiveness",
    description: "Nav breaks on tablet widths.",
    status: "todo",
    priority: "medium",
    assignee: Thami,
    dueDate: "2026-08-05T00:00:00Z",
    createdAt: "2026-07-02T00:00:00Z",
  },
  {
    id: "task-3",
    projectId: "proj-2",
    title: "Set up app store listing",
    description: "Draft copy and screenshots for launch.",
    status: "todo",
    priority: "low",
    assignee: Galaletsang,
    dueDate: "2026-08-20T00:00:00Z",
    createdAt: "2026-07-10T00:00:00Z",
  },
  {
    id: "task-4",
    projectId: "proj-3",
    title: "Integrate charts library",
    description: "Add recharts for stats visualizations.",
    status: "completed",
    priority: "medium",
    assignee: Gareth,
    dueDate: "2026-06-20T00:00:00Z",
    createdAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "task-5",
    projectId: "proj-4",
    title: "Build multi-step form",
    description: "3-step onboarding form with validation.",
    status: "in_review",
    priority: "high",
    assignee: Lesedi,
    dueDate: "2026-08-10T00:00:00Z",
    createdAt: "2026-07-15T00:00:00Z",
  },
];
=======
>>>>>>> parent of 17983dc (feat: add mock data for tasks and team members, implement custom hooks for local storage and project context, enhance dashboard and project pages with loading and error handling, and improve task filtering functionality)
