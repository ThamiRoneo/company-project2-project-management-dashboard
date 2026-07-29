import type { TaskStatus } from "../../types";

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: "To Do", color: "bg-todo" },
  in_progress: { label: "In Progress", color: "bg-in-progress" },
  in_review: { label: "In Review", color: "bg-in-review" },
  completed: { label: "Completed", color: "bg-completed" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, color } = statusConfig[status];

  return (
    <span
      className={`inline-block ${color} text-text-inverse text-xs font-bold px-2.5 py-1 rounded-badge border-2 border-border uppercase tracking-wider`}
    >
      {label}
    </span>
  );
}
