interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-6 text-center">
      <p className="text-red-500 mb-3">{message}</p>
    </div>
  );
}