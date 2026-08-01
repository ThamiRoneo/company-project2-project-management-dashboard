import { useState, useEffect } from "react";
import { fetchProjects } from "../data/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import StatGrid from "../components/dashboard/StatGrid";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import type { Project } from "../types";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load dashboard data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (projects.length === 0) return <EmptyState message="No projects to display." />;

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
