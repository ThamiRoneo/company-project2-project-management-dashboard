import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import { ProjectProvider } from "./context/ProjectContext";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const TaskDetails = lazy(() => import("./pages/TaskDetails"));

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-background">
              <LoadingSpinner message="Loading page..." size="lg" />
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
            </Route>
          </Routes>
        </Suspense>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
