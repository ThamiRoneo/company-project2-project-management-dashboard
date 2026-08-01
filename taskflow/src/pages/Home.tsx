import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">TaskFlow</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Manage your projects, track tasks, and monitor progress — all in one
        place.
      </p>
      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/projects"
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
}