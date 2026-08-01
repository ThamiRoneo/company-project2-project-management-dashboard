import type { Project } from "../../types";

interface ProjectTeamProps {
  project: Project;
}

export default function ProjectTeam({ project }: ProjectTeamProps) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h2 className="font-semibold text-gray-700 mb-3">Team Members</h2>

      {project.teamMembers.length === 0 ? (
        <p className="text-sm text-gray-400">No team members assigned.</p>
      ) : (
        // teamMembers already holds full TeamMember objects from Person 5's data, no extra lookup needed
        <ul className="space-y-3">
          {project.teamMembers.map((member) => (
            <li key={member.id} className="flex items-center gap-3">
              {/* avatar is just initials text (e.g. "LT"), not an image url */}
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// lesedi