import type { Activity } from "../types";

// my own temporary mock data, since no one else built activity data yet — projectId values match Person 5's real project ids
export const mockActivity: Activity[] = [
  {
    id: "act-1",
    projectId: "proj-1",
    message: "Lerato updated the homepage hero design",
    timestamp: "2026-07-25T10:00:00Z",
  },
  {
    id: "act-2",
    projectId: "proj-1",
    message: "Thami marked 'Fix nav bar responsiveness' as in progress",
    timestamp: "2026-07-22T09:15:00Z",
  },
  {
    id: "act-3",
    projectId: "proj-2",
    message: "Galaletsang created a new task for the app store listing",
    timestamp: "2026-07-18T14:00:00Z",
  },
  {
    id: "act-4",
    projectId: "proj-3",
    message: "Gareth completed the charts library integration",
    timestamp: "2026-06-20T16:30:00Z",
  },
  {
    id: "act-5",
    projectId: "proj-4",
    message: "Lesedi started work on the multi-step onboarding form",
    timestamp: "2026-07-15T11:00:00Z",
  },
];

// lesedi