import { useEffect, useState } from "react";
import StatCard from "../components/ui/StatCard";
import type { Project } from "../types";
// Temporary — swap for useContext once Person #4 delivers it
// import { mockProjects } from "../data/mockProjects";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch — Person #5 will replace with the real data layer
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return <div className="p-8 text-gray-400">Loading dashboard...</div>;

  const allTasks = projects.flatMap((p) => p.tasks);
  const now = new Date();

  const stats = [
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
        (t) => new Date(t.dueDate) < now && t.status !== "completed",
      ).length,
      icon: "⚠️",
      color: "bg-red-500",
    },
  ];

  // Upcoming deadlines — next 5 soonest
  const upcoming = [...projects]
    .filter((p) => new Date(p.endDate) >= now)
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-400">No upcoming deadlines.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((p) => {
                const days = Math.ceil(
                  (new Date(p.endDate).getTime() - now.getTime()) / 86400000,
                );
                return (
                  <li key={p.id} className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{p.name}</span>
                    <span
                      className={`text-sm font-semibold ${days <= 3 ? "text-red-500" : "text-gray-500"}`}
                    >
                      {days}d left
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Project Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
          <ul className="space-y-4">
            {projects.map((p) => {
              const total = p.tasks.length;
              const done = p.tasks.filter(
                (t) => t.status === "completed",
              ).length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <li key={p.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{p.name}</span>
                    <span className="text-gray-500">{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
