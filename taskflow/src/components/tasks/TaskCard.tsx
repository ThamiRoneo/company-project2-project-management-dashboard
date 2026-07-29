import { useNavigate } from "react-router-dom";
import type { Task } from "../../types";
import StatusBadge from "../ui/StatusBadge";
import PriorityBadge from "../ui/PriorityBadge";
import { shortDate } from "../../utils/formatDate";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="w-full text-left group"
    >
      <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-4 transition-transform hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-text group-hover:text-primary transition-colors truncate text-sm">
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>
        <p className="text-xs text-text-muted line-clamp-2 mb-3">
          {task.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-text-inverse text-[10px] font-bold border border-surface">
              {task.assignee.avatar}
            </span>
            <span className="text-xs font-semibold text-text-muted truncate max-w-[100px]">
              {task.assignee.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={task.status} />
            <span className="text-[10px] font-bold text-text-muted tabular-nums">
              {shortDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
