import { useState, useEffect } from "react";
import { fetchProjects } from "../../data/api";
import type { Project } from "../../types";

export default function ProjectProgress() {
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
        setError("Failed to load project progress.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error) return null;
  if (projects.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
      <ul className="space-y-4">
        {projects.map((p) => {
          const total = p.tasks.length;
          const done = p.tasks.filter(
            (t) => t.status === "completed"
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
  );
}