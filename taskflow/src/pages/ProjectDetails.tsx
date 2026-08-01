import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Project } from "../types";
import { mockProjects } from "../data/mockProjects";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectDeadlines from "../components/projects/ProjectDeadlines";
import ProjectTeam from "../components/projects/ProjectTeam";
import ProjectActivity from "../components/projects/ProjectActivity";

export default function ProjectDetails() {
  // pulls the :id segment straight from the url
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // find() returns undefined if the id doesn't match any project — that's how we catch bad urls
      const found = mockProjects.find((p) => p.id === id) ?? null;
      if (!found) {
        setError("Project not found.");
      } else {
        setProject(found);
        setError(null);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
    // re-runs this search if the url changes to a different project id
  }, [id]);

  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading project...</p>;
  }

  if (error || !project) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-3">{error}</p>
        <Link to="/projects" className="text-indigo-500 underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <Link to="/projects" className="text-sm text-indigo-500 underline">
        ← Back to Projects
      </Link>

      <ProjectInfo project={project} />
      <ProjectDeadlines project={project} />
      <ProjectTeam project={project} />

      {/* basic task list for now — Person 3 may build a proper TaskList component to replace this */}
      <div className="border rounded-xl p-5 bg-white shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-3">Tasks</h2>
        {project.tasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {project.tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center text-sm border-b last:border-0 pb-2 last:pb-0"
              >
                <span className="text-gray-700">{task.title}</span>
                <span className="text-xs text-gray-400 capitalize">
                  {task.status.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ProjectActivity project={project} />
    </div>
  );
}

// lesedi