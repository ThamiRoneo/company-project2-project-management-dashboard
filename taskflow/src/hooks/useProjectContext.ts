import { useContext } from "react";
import { ProjectCtx, type ProjectContextValue } from "../context/ProjectContext";

/**
 * Hook to access the global project/task state.
 * Must be used within a <ProjectProvider>.
 */
export function useProjectContext(): ProjectContextValue {
  const ctx = useContext(ProjectCtx);
  if (!ctx) {
    throw new Error("useProjectContext must be used within a <ProjectProvider>");
  }
  return ctx;
}
