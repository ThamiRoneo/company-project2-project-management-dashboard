import { useProjectContext } from "../hooks/useProjectContext";
import { useProjects } from "../hooks/useProjects";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import StatGrid from "../components/dashboard/StatGrid";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";

export default function Dashboard() {
  const { projects, loading, error, retry } = useProjectContext();
  const stats = useProjects(projects);

  // ── Loading state ──
  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." size="lg" />;
  }

  // ── Error state ──
  if (error) {
    return <ErrorMessage message={error} onRetry={retry} fullPage />;
  }

  // ── Empty state ──
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        message="Create a project to get started with your dashboard."
        icon="📊"
      />
    );
  }

  // ── Stat card definitions ──
  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: "📁",
      color: "bg-primary",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: "🚀",
      color: "bg-in-progress",
    },
    {
      title: "Completed Projects",
      value: stats.completedProjects,
      icon: "✅",
      color: "bg-completed",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: "📋",
      color: "bg-primary-light",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: "🎯",
      color: "bg-secondary",
    },
    {
      title: "Overdue Tasks",
      value: stats.overdueTasks,
      icon: "⚠️",
      color: "bg-danger",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text uppercase tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Overview of all projects and tasks
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mb-8">
        <StatGrid stats={statCards} />
      </div>

      {/* Bottom row: deadlines + progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingDeadlines deadlines={stats.upcomingDeadlines} />
        <ProjectProgress projects={projects} />
      </div>
    </div>
  );
}
