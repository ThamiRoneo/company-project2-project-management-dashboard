import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/projects", label: "Projects", icon: "📁" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-text text-text-inverse p-6 border-r-2 border-border">
      <div className="flex items-center gap-3 mb-10">
        <span className="text-2xl">📋</span>
        <h2 className="text-xl font-bold tracking-tight">TaskFlow</h2>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-button text-sm font-bold uppercase tracking-wider transition-all border-2
              ${isActive
                ? "bg-primary text-text-inverse border-primary shadow-brutal-sm"
                : "text-text-inverse/70 border-transparent hover:bg-white/10 hover:text-text-inverse hover:border-border"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
