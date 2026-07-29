import { getStatusColor, getStatusLabel } from "../../utils/getStatusColor";
import type { Project } from "../../types";
import { getProjectProgress } from "../../utils/projectProgress";

interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void;
}


// the component
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const progress = getProjectProgress(project);


  return (

    // when this div is clicked it will call the onClick functionthat was recieved as a prop, passing in this specific projects id
    <div onClick={() => onClick?.(project.id)} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer bg-white" >

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
        <p className="text-sm text-gray-500 mb-3 line-clamp-2" >{project.description}</p>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-1" >
            {/* The filled portion — its width is set dynamically via inline style (not Tailwind class, since Tailwind can't generate arbitrary percentages like 67% without extra config). If progress is 67, this renders style={{ width: "67%" }}. */}
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        
        {/* the actuall number from filled portion will show up here */}
        <p className="text-xs text-gray-400" >{progress}% complete</p>

    </div>
  );

}
