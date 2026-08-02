import type { TeamMember } from "../../types";

interface TaskAssigneeSelectProps {
  members: TeamMember[];
  value: string;
  onChange: (value: string) => void;
}

export default function TaskAssigneeSelect({
  members,
  value,
  onChange,
}: TaskAssigneeSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="">Unassigned</option>
      {members.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name} — {member.role}
        </option>
      ))}
    </select>
  );
}