import { useRef, useEffect } from "react";

// controlled component — doesn't hold its own state, just reports what was typed back up to Projects.tsx
interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProjectSearchBar({ value, onChange }: ProjectSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search projects..."
      className="border rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
}

// lesedi
