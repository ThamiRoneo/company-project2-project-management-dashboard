import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages are lazy loaded so each one ships as its own chunk and is only
// downloaded when the user navigates to it.
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const TaskDetails = lazy(() => import("./pages/TaskDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

// TODO: swap for <LoadingSpinner /> once components/ui/LoadingSpinner.tsx lands.
function PageFallback() {
  return (
    <div className="flex items-center justify-center p-12">
      <p className="text-sm text-gray-500">Loading…</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Layout renders the sidebar/nav once and swaps pages through <Outlet /> */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
