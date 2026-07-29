// Creating temporary mock data that will be replaced by Galaletsang's real data (this is just for me to keep on working instead of waiting for everyone)
import type { Project, Activity } from "../types/index";

// projects
export const mockProjects: Project[] = [
    {
        id: "p1",
        name: "Bakery Website Redesign",
        description: "Rebuild the marketing site with a modern component library.",
        status: "active",
        startDate: "2026-06-01",
        endDate: "2026-08-15",
        teamMembers: [
            { id: "u1", name: "Naledi", avatar: "", role: "Frontend" },
            { id: "u2", name: "Sipho", avatar: "", role: "Designer" },
        ],
        tasks: [

            {
                id: "t1",
                projectId: "p1",
                title: "Build hero section",
                description: "Homepage hero with call-to-action",
                status: "completed",
                priority: "high",
                assignee: { id: "u1", name: "Naledi", avatar: "", role: "Frontend" },
                dueDate: "2026-07-10",
                createdAt: "2026-06-01",
            },
            {
                id: "t2",
                projectId: "p1",
                title: "Style footer",
                description: "Dark themed footer with links",
                status: "in_progress",
                priority: "medium",
                assignee: { id: "u2", name: "Sipho", avatar: "", role: "Designer" },
                dueDate: "2026-08-01",
                createdAt: "2026-06-05",
            },
        ],
    },
    {
        id: "p2",
        name: "Internal Analytics Dashboard",
        description: "Dashboard for tracking sales and inventory metrics.",
        status: "on_hold",
        startDate: "2026-05-01",
        endDate: "2026-09-01",
        teamMembers: [{ id: "u3", name: "Thabo", avatar: "", role: "Backend" }],
        tasks: [],
    },
];


// mock activity
export const mockActivity: Activity[] = [
    {
        id: "a1",
        projectId: "p1",
        message: "Naledi updated the hero section",
        timestamp: "2026-07-25T10:00:00Z"
    },

    {
        id: "a2",
        projectId: "p1",
        message: "Sipho completed the footer redesign",
        timestamp: "2026-07-20T14:30:00Z",
    },
];
