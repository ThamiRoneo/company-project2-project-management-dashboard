import { getStatusColor, getStatusLabel } from "../../utils/getStatusColor.ts";
import type { Project } from "../../types/index.ts";
import { getProjectProgress } from "../../utils/projectProgress.ts";

interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void;
}


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
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>

                {/* prints the readable label/status */}
                {getStatusLabel(project.status)}
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