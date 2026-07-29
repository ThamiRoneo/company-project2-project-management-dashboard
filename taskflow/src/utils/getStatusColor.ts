import type { Project } from "../types/index.ts";



// showing different color based on the status of the project

//  Record<Project["status"], string>  is a TypeScript syntax meaning "an object whose keys must be exactly the values of Project["status"], and whose values are strings." It forces you to handle every possible status
export function getStatusColor (status: Project["status"]): string {

    const colors: Record<Project["status"], string> = {
        active: "bg-green-100 text-green-700",
        completed: "bg-blue-100 text-blue-700",
        on_hold: "bg-yellow-100 text-yellow-700",
    };
    return colors[status];
}

export function getStatusLabel(status: Project["status"]): string {
    const labels: Record<Project["status"], string> = {
        active: "Active",
        completed: "Completed",
        on_hold: "On Hold",
    };
    return labels[status];
}
