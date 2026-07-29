import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/projects", label: "Projects" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
      <h2 className="text-lg font-bold">TaskFlow</h2>
      <button onClick={() => setOpen(!open)} className="text-2xl">
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav className="absolute top-14 left-0 w-full bg-gray-900 p-4 flex flex-col gap-2 z-50">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded hover:bg-gray-800"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
