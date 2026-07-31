
import type { Project } from "../../types";
import { getStatusColor, getStatusLabel } from "../../utils/getStatusColor";
import { getProjectProgress } from "../../utils/projectProgress";

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  const progress = getProjectProgress(project);

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
          {getStatusLabel(project.status)}
        </span>
      </div>

      <p className="text-gray-500 mb-4">{project.description}</p>

      <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
        <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-gray-400">{progress}% complete</p>
    </div>
  );
}

// lesedi