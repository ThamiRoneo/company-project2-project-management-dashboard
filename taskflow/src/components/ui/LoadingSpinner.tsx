interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${sizeMap[size]} rounded-full border-border border-t-primary animate-spin`}
      />
      {message && (
        <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {message}
        </p>
      )}
    </div>
  );
}
