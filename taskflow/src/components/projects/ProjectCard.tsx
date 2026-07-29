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

    // when this div is clicked it will call the onClick functionthat was recieved as a prop, passing in this specific projects id
    <div onClick={() => onClick?.(project.id)}>

        <div className="flex justify-between items-start mb-2">

            {/* the actual project name */}
            <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>

            {/* this template literal will look up the right color classes based on the specific project current status  */}
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[project.status]}`}>

                {/* prints the readable label */}
                {statusLabels[project.status]}
            </span>
        </div>

        {/* project description */}
        <p>{project.description}</p>

        <div>
            {/* The filled portion — its width is set dynamically via inline style (not Tailwind class, since Tailwind can't generate arbitrary percentages like 67% without extra config). If progress is 67, this renders style={{ width: "67%" }}. */}
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        
        {/* the actuall number from filled portion will show up here */}
        <p>{progress}% complete</p>

    </div>
  );

}