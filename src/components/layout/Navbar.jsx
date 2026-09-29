import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Most Popular", to: "/adu-models" },
  { label: "Builds", to: "/collection" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "Pools", to: "/pools" },
  { label: "Financing", to: "/financing" },
  { label: "Why HRG", to: "/why-hrg" },
  { label: "Contact", to: "/contact" },
];

const linkClass = "text-xs font-semibold uppercase tracking-wide text-foreground/60 hover:text-foreground transition-colors";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center shrink-0" aria-label="HRG Prefab home">
          <img src="/assets/logo-01-sm.png" alt="HRG Prefab" className="h-12 w-auto object-contain dark:hidden" />
          <img src="/assets/logo-02-sm.png" alt="" aria-hidden="true" className="h-12 w-auto object-contain hidden dark:block" />
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? "text-primary" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/#build"
            className="bg-primary text-primary-foreground px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            Build my project
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 py-4 space-y-3 border-t border-border">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? "text-primary" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/#build"
              onClick={() => setOpen(false)}
              className="flex-1 text-center bg-primary text-primary-foreground px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wide"
            >
              Build my project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}