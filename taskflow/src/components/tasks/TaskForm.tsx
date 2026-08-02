import { useState } from "react";
import type { Task, TaskStatus, TaskPriority, TeamMember } from "../../types";
import { createTask, updateTask } from "../../data/api";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskPrioritySelect from "./TaskPrioritySelect";
import TaskAssigneeSelect from "./TaskAssigneeSelect";

interface TaskFormProps {
  projectId: string;
  members: TeamMember[];
  task?: Task;
  onSuccess?: (task: Task) => void;
}

const emptyTask = {
  title: "",
  description: "",
  status: "todo" as TaskStatus,
  priority: "medium" as TaskPriority,
  assignee: { id: "", name: "", avatar: "", role: "" },
  dueDate: "",
};

export default function TaskForm({
  projectId,
  members,
  task,
  onSuccess,
}: TaskFormProps) {
  const isEditing = Boolean(task);

  const [form, setForm] = useState({
    title: task?.title ?? emptyTask.title,
    description: task?.description ?? emptyTask.description,
    status: task?.status ?? emptyTask.status,
    priority: task?.priority ?? emptyTask.priority,
    assignee: task?.assignee ?? emptyTask.assignee,
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : emptyTask.dueDate,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.dueDate) next.dueDate = "Due date is required.";
    if (!form.assignee.id) next.assignee = "Assignee is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      let result: Task;
      if (isEditing && task) {
        result = await updateTask(task.id, {
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          assignee: form.assignee,
          dueDate: new Date(form.dueDate).toISOString(),
        });
      } else {
        result = await createTask({
          projectId,
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          assignee: form.assignee,
          dueDate: new Date(form.dueDate).toISOString(),
        });
      }
      onSuccess?.(result);
    } catch {
      setSubmitError("Failed to save task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    field: string,
    value: string | TaskStatus | TaskPriority | { id: string; name: string; avatar: string; role: string }
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <TaskStatusSelect
            value={form.status}
            onChange={(value) => handleChange("status", value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <TaskPrioritySelect
            value={form.priority}
            onChange={(value) => handleChange("priority", value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assignee
        </label>
        <TaskAssigneeSelect
          members={members}
          value={form.assignee.id}
          onChange={(value) => {
            const member = members.find((m) => m.id === value);
            handleChange(
              "assignee",
              member ?? { id: "", name: "", avatar: "", role: "" }
            );
          }}
        />
        {errors.assignee && (
          <p className="text-red-500 text-xs mt-1">{errors.assignee}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.dueDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
        )}
      </div>

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {submitting ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}