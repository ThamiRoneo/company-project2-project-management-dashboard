import type { ProjectStatus } from "../../types";

interface ProjectStatusFilterProps {
  value: ProjectStatus | null;
  onChange: (value: ProjectStatus | null) => void;
}

const options: { label: string; value: ProjectStatus | null }[] = [
  { label: "All", value: null },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
];

export default function ProjectStatusFilter({
  value,
  onChange,
}: ProjectStatusFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.label}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-1.5 rounded-button text-xs font-bold uppercase tracking-wider border-2 transition-all
              ${
                isActive
                  ? "bg-primary text-text-inverse border-primary shadow-brutal-sm"
                  : "bg-surface text-text-muted border-border hover:bg-surface-muted"
              }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
