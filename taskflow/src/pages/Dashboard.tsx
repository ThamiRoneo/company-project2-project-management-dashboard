import { useContext } from "react";
import StatGrid from "../components/dashboard/StatGrid";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import { ProjectCtx } from "../context/ProjectContext";

export default function Dashboard() {
  const context = useContext(ProjectCtx);

  if (!context) {
    throw new Error("ProjectContext not found");
  }

  const { projects, loading, error } = context;

  // this will render once the ui component is fully implemented
  // if (loading) return <LoadingSpinner />;
  // if (error) return <ErrorMessage message={error} />;
  // if (projects.length === 0) return <EmptyState message="No projects to display." />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <StatGrid projects={projects} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingDeadlines />
        <ProjectProgress />
      </div>
    </div>
  );
}