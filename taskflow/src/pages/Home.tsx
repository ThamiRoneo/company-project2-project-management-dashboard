import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../hooks/useProjectContext";
import { useProjects } from "../hooks/useProjects";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";

export default function Home() {
  const navigate = useNavigate();
  const { projects, loading } = useProjectContext();
  const stats = useProjects(projects);

  // Grab the most active projects (up to 3) for a quick preview
  const activeProjectsPreview = projects
    .filter((p) => p.status === "active")
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Hero Section ── */}
      <section className="mb-12 pt-4 md:pt-10">
        <div className="bg-surface border-2 border-border rounded-card shadow-brutal-lg p-8 md:p-12">
          <span className="text-5xl block mb-4">📋</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text uppercase tracking-tight mb-4">
            TaskFlow
          </h1>
          <p className="text-lg text-text-muted max-w-xl mb-8 leading-relaxed">
            A powerful, frontend-only project management dashboard built with
            React, TypeScript & Tailwind CSS. Track projects, manage tasks,
            monitor deadlines, and visualize progress — all in a fast,
            responsive UI
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate("/dashboard")} size="lg">
              📊 View Dashboard
            </Button>
            <Button
              onClick={() => navigate("/projects")}
              size="lg"
              variant="secondary"
            >
              📁 Browse Projects
            </Button>
          </div>
        </div>
      </section>

      {/* ── Quick Stats (loading-aware) ── */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-text uppercase tracking-wider mb-4">
          At a Glance
        </h2>
        {loading ? (
          <LoadingSpinner message="Loading stats..." size="sm" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="md" className="text-center">
              <p className="text-3xl font-bold text-text">
                {stats.totalProjects}
              </p>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mt-1">
                Projects
              </p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-3xl font-bold text-text">{stats.totalTasks}</p>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mt-1">
                Tasks
              </p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-3xl font-bold text-completed">
                {stats.completedTasks}
              </p>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mt-1">
                Completed
              </p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-3xl font-bold text-danger">
                {stats.overdueTasks}
              </p>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mt-1">
                Overdue
              </p>
            </Card>
          </div>
        )}
      </section>

      {/* ── Active Projects Preview ── */}
      {!loading && activeProjectsPreview.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-text uppercase tracking-wider mb-4">
            Active Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeProjectsPreview.map((p) => {
              const total = p.tasks.length;
              const done = p.tasks.filter(
                (t) => t.status === "completed",
              ).length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="text-left group"
                >
                  <Card padding="md">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-text group-hover:text-primary transition-colors truncate">
                        {p.name}
                      </h3>
                      <StatusBadge status="in_progress" />
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2 mb-3">
                      {p.description}
                    </p>
                    <div className="w-full bg-background border-2 border-border rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs font-bold text-text-muted mt-1 text-right tabular-nums">
                      {pct}% · {done}/{total} tasks
                    </p>
                  </Card>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={() => navigate("/projects")}
              variant="secondary"
              size="sm"
            >
              View all projects →
            </Button>
          </div>
        </section>
      )}

      {/* ── Feature Summary ── */}
      <section className="mb-8">
        <div className="bg-surface border-2 border-border rounded-card shadow-brutal p-6">
          <h2 className="text-lg font-bold text-text uppercase tracking-wider mb-4">
            Built With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { icon: "⚛️", label: "React 19" },
              { icon: "📘", label: "TypeScript" },
              { icon: "🎨", label: "Tailwind CSS v4" },
              { icon: "🧭", label: "React Router" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="font-bold text-text">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
