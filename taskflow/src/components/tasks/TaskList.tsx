import type { Task } from "../../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  /** Optional column layout — defaults to single-column list */
  columns?: 1 | 2 | 3;
}

export default function TaskList({ tasks, columns = 2 }: TaskListProps) {
  if (tasks.length === 0) {
    return null; // handled by parent
  }

  const gridCols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3`}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
