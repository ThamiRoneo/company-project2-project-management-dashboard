import type { ProjectStatus } from "../../types";

type FilterOption = "all" | ProjectStatus;

// same controlled pattern as ProjectSearchBar — reports the selected status back up, holds nothing itself
interface ProjectStatusFilterProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
}

export default function ProjectStatusFilter({ value, onChange }: ProjectStatusFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as FilterOption)}
      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="all">All statuses</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
      <option value="on_hold">On Hold</option>
    </select>
  );
}

// lesedi