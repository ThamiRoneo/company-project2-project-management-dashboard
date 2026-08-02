# TaskFlow

A project management dashboard for tracking projects, tasks, and team workload  built as a group project by a five-person development team. TaskFlow lets teams manage multiple projects, track task status across a Kanban-style workflow (To Do → In Progress → In Review → Completed), monitor team workload, and keep an eye on upcoming deadlines  all in one dashboard.

## Features

- **Dashboard** — at-a-glance stats (total tasks, in progress, in review, completed), a filterable task table, project progress bars, team workload breakdown, and upcoming deadlines
- **Projects** — searchable, filterable list of all projects with status, description, and completion progress
- **Project details** — drill into a single project's info, team, deadlines, and activity
- **Tasks** — view, create, and update tasks with status and priority tracking
- **Persistent state** — project and task data persists across page refreshes via localStorage
- **Responsive layout** — sidebar navigation on desktop, bottom nav on mobile

## Tech Stack

- **React** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **React Router** — client-side routing
- Mock async API layer (simulates real network requests with artificial delay)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/ThamiRoneo/company-project2-project-management-dashboard.git
cd company-project2-project-management-dashboard/taskflow
npm install
```

### Running the dev server

```bash
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

## Project Structure

```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components (StatGrid, MyTasksTable, TeamWorkload, etc.)
│   ├── layout/         # App shell — Sidebar, MobileNav, Layout
│   ├── projects/       # Project list, cards, filters, search
│   ├── tasks/          # Task-related components
│   └── ui/              # Shared/reusable UI (badges, states, cards)
├── context/            # ProjectContext — global project/task state
├── data/                # Mock data + simulated API functions
├── hooks/               # Custom hooks (useProjectContext, useLocalStorage, useTaskFilters, useProjects)
├── pages/               # Route-level pages (Home, Dashboard, Projects, ProjectDetails, TaskDetails)
├── types/                # Shared TypeScript types
├── utils/                # Helper functions (date formatting, status colors)
├── App.tsx              # Routes + ProjectProvider
└── main.tsx              # App entry point
```

## Team & Roles

Role | Responsibilities 

Thami Sithole | Project setup, routing, global layout, dashboard shell 

Lesedi Modikwe | Projects list, search/filter, project detail page 

Lerato Thungo | Task list, creation, detail, status workflow 

Gareth Motloutsi | Context API, custom hooks, localStorage persistence 

Galaletsang Modise | Mock data/API layer, shared UI states, lazy loading, responsive polish, deployment 
