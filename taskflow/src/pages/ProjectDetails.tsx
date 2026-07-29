import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import { fetchActivitiesByProject } from "../data/api";
import type { Activity } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import TaskList from "../components/tasks/TaskList";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectTeam from "../components/projects/ProjectTeam";
import ProjectDeadlines from "../components/projects/ProjectDeadlines";
import ProjectActivity from "../components/projects/ProjectActivity";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, loading: ctxLoading, error: ctxError, retry } = useProjectContext();

  // Derive project from context — no intermediate state needed
  const project = useMemo(() => (id ? getProjectById(id) ?? null : null), [id, getProjectById]);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  // Fetch activities for this project
  // Initial state is `true` — only flip to false when data arrives
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    fetchActivitiesByProject(id)
      .then((data) => { if (!cancelled) setActivities(data); })
      .catch(() => { if (!cancelled) setActivities([]); })
      .finally(() => { if (!cancelled) setActivitiesLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  // ── Loading (context still fetching) ──
  if (ctxLoading) {
    return <LoadingSpinner message="Loading project..." size="lg" />;
  }

  // ── Context error ──
  if (ctxError) {
    return <ErrorMessage message={ctxError} onRetry={retry} fullPage />;
  }

  // ── Project not found ──
  if (!project) {
    return (
      <ErrorMessage
        message="Project not found. It may have been removed or the link is incorrect."
        fullPage
        onRetry={() => navigate("/projects")}
      />
    );
  }

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-1 text-sm font-bold text-text-muted hover:text-primary transition-colors mb-4"
      >
        ← Back to Projects
      </button>

      {/* Top row: Project Info + Team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ProjectInfo project={project} />
        </div>
        <div>
          <ProjectTeam members={project.teamMembers} />
        </div>
      </div>

      {/* Task section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text uppercase tracking-wider">
            Tasks ({project.tasks.length})
          </h2>
        </div>
        {project.tasks.length === 0 ? (
          <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-8 text-center">
            <p className="text-sm text-text-muted">No tasks in this project yet.</p>
          </div>
        ) : (
          <TaskList tasks={project.tasks} />
        )}
      </div>

      {/* Bottom row: Deadlines + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProjectDeadlines tasks={project.tasks} />
        {activitiesLoading ? (
          <LoadingSpinner message="Loading activity..." size="sm" />
        ) : (
          <ProjectActivity activities={activities} />
        )}
      </div>
    </div>
  );
}
