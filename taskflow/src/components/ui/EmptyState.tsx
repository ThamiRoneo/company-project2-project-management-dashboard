interface EmptyStateProps {
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: string;
}

export default function EmptyState({
  title,
  message,
  action,
  icon = "📭",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-xl font-bold text-text mb-1">{title}</h3>
      {message && (
        <p className="text-sm text-text-muted mb-6 max-w-md text-center">
          {message}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary text-text-inverse font-bold px-6 py-2.5 rounded-button border-2 border-border shadow-brutal-sm hover:bg-primary-dark transition-colors uppercase tracking-wider text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
