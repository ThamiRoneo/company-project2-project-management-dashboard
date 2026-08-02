import type { Task } from "../../types";
import TaskCard from "./TaskCard";
import EmptyState from "../ui/EmptyState";

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (id: string) => void;
}

export default function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState message="No tasks found." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
}