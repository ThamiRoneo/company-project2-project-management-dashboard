interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export default function ErrorMessage({
  message,
  onRetry,
  fullPage = false,
}: ErrorMessageProps) {
  const container = fullPage
    ? "flex flex-col items-center justify-center min-h-[60vh] px-4"
    : "flex flex-col items-center justify-center py-12 px-4";

  return (
    <div className={container}>
      <span className="text-5xl mb-4">⚠️</span>
      <h3 className="text-xl font-bold text-danger mb-1">Something went wrong</h3>
      <p className="text-sm text-text-muted mb-6 max-w-md text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-danger text-text-inverse font-bold px-6 py-2.5 rounded-button border-2 border-border shadow-brutal-sm hover:bg-danger-dark transition-colors uppercase tracking-wider text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
