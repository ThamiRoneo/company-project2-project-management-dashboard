import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">TaskFlow</h1>
        <p className="mx-auto mb-8 max-w-md text-gray-500">
          Manage your projects, track tasks, and monitor progress — all in one
          place.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/dashboard"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/projects"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
