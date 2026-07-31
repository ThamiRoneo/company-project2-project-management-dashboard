import type { Project } from "../types/index.ts";


// The helper to calculate progress on the dashboard

// declaring a function  project matching Project interface from types that will return a number which is the progress percentage and if the project has zero tasks return 0%

export function getProjectProgress(project: Project): number {
    if (project.tasks.length ===0) return 0;

    // .filter() loops through every task and keep the ones where status is === completed .length will count how many tasks are done
    const completed = project.tasks.filter((t) => t.status === "completed").length;

    // percentage calculation. Math.round will round off everything to a whole number
    return Math.round((completed / project.tasks.length) * 100);
}
// lesedi