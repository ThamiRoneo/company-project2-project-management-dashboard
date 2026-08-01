import StatCard from "../ui/StatCard";
import type { Project } from "../../types";

interface Stat {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface StatGridProps {
  projects: Project[];
}

export default function StatGrid({ projects }: StatGridProps) {
  const allTasks = projects.flatMap((p) => p.tasks);
  const now = new Date();

  const stats: Stat[] = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: "📁",
      color: "bg-blue-500",
    },
    {
      title: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      icon: "🚀",
      color: "bg-green-500",
    },
    {
      title: "Completed Projects",
      value: projects.filter((p) => p.status === "completed").length,
      icon: "✅",
      color: "bg-purple-500",
    },
    {
      title: "Total Tasks",
      value: allTasks.length,
      icon: "📋",
      color: "bg-indigo-500",
    },
    {
      title: "Completed Tasks",
      value: allTasks.filter((t) => t.status === "completed").length,
      icon: "🎯",
      color: "bg-teal-500",
    },
    {
      title: "Overdue Tasks",
      value: allTasks.filter(
        (t) => new Date(t.dueDate) < now && t.status !== "completed"
      ).length,
      icon: "⚠️",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
    </div>
  );
}