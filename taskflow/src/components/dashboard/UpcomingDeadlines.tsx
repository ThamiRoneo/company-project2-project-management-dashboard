import { useState, useEffect } from "react";
import { fetchProjects } from "../../data/api";
import type { Project } from "../../types";

export default function UpcomingDeadlines() {
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
        setError("Failed to load deadlines.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const now = new Date();
  const upcoming = projects
    .filter((p) => new Date(p.endDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, 5);

  if (loading) return null;
  if (error) return null;
  if (upcoming.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
      <ul className="space-y-3">
        {upcoming.map((p) => {
          const days = Math.ceil(
            (new Date(p.endDate).getTime() - now.getTime()) / 86400000
          );
          return (
            <li key={p.id} className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{p.name}</span>
              <span
                className={`text-sm font-semibold ${
                  days <= 3 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {days}d left
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}