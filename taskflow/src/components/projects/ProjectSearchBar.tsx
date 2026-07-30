import { useRef, useEffect } from "react";

interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ProjectSearchBar({
  value,
  onChange,
  placeholder = "Search projects...",
}: ProjectSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input on mount (useRef practical use case)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
        🔍
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border-2 border-border rounded-button px-10 py-2.5 text-sm font-semibold text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text text-sm leading-none"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
