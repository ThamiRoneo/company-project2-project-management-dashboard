interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="p-6 text-center">
      <p className="text-gray-400">{message}</p>
    </div>
  );
}