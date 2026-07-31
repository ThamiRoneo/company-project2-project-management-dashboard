import type { Project } from "../../types";
import { mockActivity } from "../../data/mockActivity";
import { formatDate } from "../../utils/formatDate";

interface ProjectActivityProps {
  project: Project;
}

export default function ProjectActivity({ project }: ProjectActivityProps) {
  const activity = mockActivity.filter((a) => a.projectId === project.id);

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h2 className="font-semibold text-gray-700 mb-3">Recent Activity</h2>

      {activity.length === 0 ? (
        <p className="text-sm text-gray-400">No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {activity.map((item) => (
            <li key={item.id} className="text-sm text-gray-600">
              {item.message}
              <span className="text-xs text-gray-400 block">
                {formatDate(item.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// lesedi