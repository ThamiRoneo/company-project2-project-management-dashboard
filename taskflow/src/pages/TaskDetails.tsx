import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjects, updateTask } from "../data/api";
import type { Task, Project } from "../types";
import TaskStatusSelect from "../components/tasks/TaskStatusSelect";
import TaskPrioritySelect from "../components/tasks/TaskPrioritySelect";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then((projects) => {
        const foundProject = projects.find((p) =>
          p.tasks.some((t) => t.id === id)
        );
        const foundTask = foundProject?.tasks.find((t) => t.id === id) ?? null;
        if (!foundTask || !foundProject) {
          setError("Task not found.");
        } else {
          setTask(foundTask);
          setProject(foundProject);
          setError(null);
        }
      })
      .catch(() => {
        setError("Failed to load task details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleStatusChange = async (newStatus: Task["status"]) => {
    if (!task) return;
    setSaving(true);
    try {
      const updated = await updateTask(task.id, { status: newStatus });
      setTask(updated);
    } catch {
      setError("Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  const handlePriorityChange = async (newPriority: Task["priority"]) => {
    if (!task) return;
    setSaving(true);
    try {
      const updated = await updateTask(task.id, { priority: newPriority });
      setTask(updated);
    } catch {
      setError("Failed to update priority.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading task...</p>;
  }

  if (error || !task || !project) {
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
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to={`/projects/${project.id}`}
        className="text-sm text-indigo-500 underline mb-4 inline-block"
      >
        ← Back to {project.name}
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <p className="text-gray-500 mt-2">{task.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <TaskStatusSelect
              value={task.status}
              onChange={handleStatusChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <TaskPrioritySelect
              value={task.priority}
              onChange={handlePriorityChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Assignee:</span>{" "}
            <span className="font-medium text-gray-800">
              {task.assignee.name}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Due Date:</span>{" "}
            <span className="font-medium text-gray-800">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {saving && (
          <p className="text-sm text-gray-500">Saving changes...</p>
        )}
      </div>
    </div>
  );
}