import type { TaskPriority } from "../../types";

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-priority-low" },
  medium: { label: "Medium", color: "bg-priority-medium" },
  high: { label: "High", color: "bg-priority-high" },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, color } = priorityConfig[priority];

  return (
    <span
      className={`inline-block ${color} text-text-inverse text-xs font-bold px-2.5 py-1 rounded-badge border-2 border-border uppercase tracking-wider`}
    >
      {label}
    </span>
  );
}
