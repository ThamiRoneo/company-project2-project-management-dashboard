import { useNavigate } from "react-router-dom";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onClick?: (id: string) => void;
}

const statusColors: Record<string, string> = {
  todo: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  in_review: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-orange-100 text-orange-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(task.id);
    } else {
      navigate(`/tasks/${task.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight pr-2">
          {task.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            statusColors[task.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            priorityColors[task.priority] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{task.assignee.name}</span>
        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}