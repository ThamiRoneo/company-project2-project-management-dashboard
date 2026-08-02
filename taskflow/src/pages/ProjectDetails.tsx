import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { mockProjects } from "../data/mockProjects";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectDeadlines from "../components/projects/ProjectDeadlines";
import ProjectTeam from "../components/projects/ProjectTeam";
import ProjectActivity from "../components/projects/ProjectActivity";
import TaskList from "../components/tasks/TaskList";

export default function ProjectDetails() {
  // pulls the :id segment straight from the url
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

      <TaskList
        tasks={project.tasks}
        onTaskClick={(id) => navigate(`/tasks/${id}`)}
      />

      <ProjectActivity project={project} />
    </div>
  );
}

// lesedi