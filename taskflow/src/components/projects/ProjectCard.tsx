import type { Project } from "../../types/index.ts";
import { getProjectProgress } from "../../utils/projectProgress.ts";

interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void;
}

// showing different color based on the status of the project

//  Record<Project["status"], string>  is a TypeScript syntax meaning "an object whose keys must be exactly the values of Project["status"], and whose values are strings." It forces you to handle every possible status

const statusColors: Record<Project["status"], string> = {
  active: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  on_hold: "bg-yellow-100 text-yellow-700",
};

// changing Projectstatus on index.ts labels from small to capital letters
const statusLabels: Record<Project["status"], string> = {
  active: "Active",
  completed: "Completed",
  on_hold: "On Hold",
};


// the component
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const progress = getProjectProgress(project);


  return (

    <div onClick={() => onClick?.(project.id)}>

        <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>

            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
            </span>
        </div>

        <p>{project.description}</p>

        <div>
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <p>{progress}% complete</p>

    </div>
  );

}