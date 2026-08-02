import { useContext } from "react";
import StatGrid from "../components/dashboard/StatGrid";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import { ProjectCtx } from "../context/ProjectContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";

export default function Dashboard() {
  const context = useContext(ProjectCtx);

  if (!context) {
    throw new Error("ProjectContext not found");
  }

  const { projects, loading, error } = context;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (projects.length === 0)
    return <EmptyState message="No projects to display." />;

  return (
    <div className="flex justify-center px-3 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-y-5">
          <StatGrid projects={projects} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <UpcomingDeadlines />
            <ProjectProgress />
          </div>
        </div>
      </div>
    </div>
  );
}
