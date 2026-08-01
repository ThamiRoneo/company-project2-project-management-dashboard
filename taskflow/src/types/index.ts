export type TaskStatus = "todo" | "in_progress" | "in_review" | "completed";
export type TaskPriority = "low" | "medium" | "high";
export type ProjectStatus = "active" | "completed" | "on_hold";

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: TeamMember;
  dueDate: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  teamMembers: TeamMember[];
  tasks: Task[];
}

export interface Activity {
  id: string;
  projectId: string;
  message: string;
  timestamp: string;
}

