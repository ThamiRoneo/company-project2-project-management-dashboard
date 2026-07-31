import type { Project } from "../../types";
import { formatDate } from "../../utils/formatDate";

interface ProjectDeadlinesProps {
  project: Project;
}

export default function ProjectDeadlines({ project }: ProjectDeadlinesProps) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h2 className="font-semibold text-gray-700 mb-3">Timeline</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Start Date</p>
          <p className="text-sm text-gray-700">{formatDate(project.startDate)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">End Date</p>
          <p className="text-sm text-gray-700">{formatDate(project.endDate)}</p>
        </div>
      </div>
    </div>
  );
}
// lesedi