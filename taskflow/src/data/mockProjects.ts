import type { Project, Activity } from "../types";
import { mockTasks } from "./mockTasks";
import { mockTeamMembers } from "./mockTeamMembers";

const now = new Date();
const daysAgo = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};
const daysFromNow = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

const allProjectData: Omit<Project, "tasks">[] = [
  {
    id: "p-1",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company website with a modern design system, improved accessibility, and better performance across all devices.",
    status: "active",
    startDate: daysAgo(30),
    endDate: daysFromNow(14),
    teamMembers: [
      mockTeamMembers[0], // Alice
      mockTeamMembers[1], // Bob
      mockTeamMembers[2], // Catherine
      mockTeamMembers[4], // Elena
    ],
  },
  {
    id: "p-2",
    name: "Mobile App v2",
    description:
      "Major version update for the mobile application including dark mode, push notification overhaul, and redesigned onboarding.",
    status: "active",
    startDate: daysAgo(20),
    endDate: daysFromNow(21),
    teamMembers: [
      mockTeamMembers[1], // Bob
      mockTeamMembers[2], // Catherine
      mockTeamMembers[4], // Elena
      mockTeamMembers[5], // Thabo
    ],
  },
  {
    id: "p-3",
    name: "API Integration Platform",
    description:
      "Build a unified API integration layer connecting third-party services with our core platform.",
    status: "active",
    startDate: daysAgo(25),
    endDate: daysFromNow(18),
    teamMembers: [
      mockTeamMembers[1], // Bob
      mockTeamMembers[4], // Elena
      mockTeamMembers[5], // Thabo
    ],
  },
  {
    id: "p-4",
    name: "Internal Tools Suite",
    description:
      "A collection of internal productivity tools including employee directory, time-off management, and reporting dashboards.",
    status: "active",
    startDate: daysAgo(15),
    endDate: daysFromNow(12),
    teamMembers: [
      mockTeamMembers[0], // Alice
      mockTeamMembers[3], // David
      mockTeamMembers[4], // Elena
    ],
  },
  {
    id: "p-5",
    name: "Legacy System Migration",
    description:
      "Migrate legacy infrastructure and databases to modern cloud-native solutions. Final phase includes decommissioning old servers.",
    status: "completed",
    startDate: daysAgo(60),
    endDate: daysAgo(1),
    teamMembers: [
      mockTeamMembers[1], // Bob
      mockTeamMembers[3], // David
      mockTeamMembers[4], // Elena
      mockTeamMembers[5], // Thabo
    ],
  },
  {
    id: "p-6",
    name: "Documentation Portal",
    description:
      "A centralized documentation hub for developers, featuring searchable API docs, guides, and interactive examples.",
    status: "on_hold",
    startDate: daysAgo(45),
    endDate: daysFromNow(30),
    teamMembers: [
      mockTeamMembers[2], // Catherine
      mockTeamMembers[3], // David
      mockTeamMembers[5], // Thabo
    ],
  },
];

/** Assemble full Project objects by attaching their tasks */
export const mockProjects: Project[] = allProjectData.map((proj) => ({
  ...proj,
  tasks: mockTasks.filter((t) => t.projectId === proj.id),
}));

/** Pre-computed activity feed */
export const mockActivities: Activity[] = [
  {
    id: "a-1",
    projectId: "p-1",
    message: "Catherine completed 'Design homepage hero section'",
    timestamp: daysAgo(1),
  },
  {
    id: "a-2",
    projectId: "p-1",
    message: "Alice started 'Implement responsive navigation'",
    timestamp: daysAgo(2),
  },
  {
    id: "a-3",
    projectId: "p-2",
    message: "Thabo pushed dark mode branch for review",
    timestamp: daysAgo(1),
  },
  {
    id: "a-4",
    projectId: "p-2",
    message: "Catherine submitted onboarding redesign for review",
    timestamp: daysAgo(3),
  },
  {
    id: "a-5",
    projectId: "p-3",
    message: "Bob finalised API contract specifications",
    timestamp: daysAgo(4),
  },
  {
    id: "a-6",
    projectId: "p-4",
    message: "Alice deployed employee directory to staging",
    timestamp: daysAgo(2),
  },
  {
    id: "a-7",
    projectId: "p-5",
    message: "Elena confirmed data integrity — all checks passed",
    timestamp: daysAgo(1),
  },
  {
    id: "a-8",
    projectId: "p-5",
    message: "Legacy migration phase 3 completed successfully",
    timestamp: daysAgo(3),
  },
  {
    id: "a-9",
    projectId: "p-6",
    message: "Project paused pending stakeholder review",
    timestamp: daysAgo(10),
  },
];
