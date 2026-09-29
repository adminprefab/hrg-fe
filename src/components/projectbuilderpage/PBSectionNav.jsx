import React from "react";
import { Link } from "react-router-dom";

const ANCHOR_LINKS = [
  { label: "What We Handle", href: "#scopes" },
  { label: "Project Builder", href: "#build" },
  { label: "How It Works", href: "#how" },
];

export default function PBSectionNav() {
  const linkClass =
    "text-xs font-bold uppercase tracking-[0.15em] text-foreground/60 hover:text-primary transition-colors";

  return (
    <nav className="sticky top-[76px] z-30 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-4">
        {ANCHOR_LINKS.map((l) => (
          <a key={l.label} href={l.href} className={linkClass}>
            {l.label}
          </a>
        ))}
        <Link to="/contact" className={linkClass}>
          Contact
        </Link>
      </div>
    </nav>
  );
}