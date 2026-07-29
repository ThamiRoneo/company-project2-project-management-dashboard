import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/projects", label: "Projects", icon: "📁" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="md:hidden bg-text text-text-inverse px-4 py-3 flex items-center justify-between border-b-2 border-border">
      <div className="flex items-center gap-2">
        <span className="text-xl">📋</span>
        <h2 className="text-lg font-bold">TaskFlow</h2>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl leading-none px-2 py-1"
        aria-label="Toggle navigation"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-72 bg-text text-text-inverse border-l-2 border-border z-50 transform transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-border">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h2 className="text-lg font-bold">TaskFlow</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl leading-none px-2 py-1"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-button text-sm font-bold uppercase tracking-wider transition-all border-2
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
      </div>
    </div>
  );
}
