import React from "react";
import { Link } from "react-router-dom";

const SITE_LINKS = [
  { label: "Most Popular", to: "/adu-models" },
  { label: "Builds", to: "/collection" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "Pools", to: "/pools" },
  { label: "Financing", to: "/financing" },
  { label: "Why HRG", to: "/why-hrg" },
  { label: "Contact", to: "/contact" },
];

const CONTACTS = [
  { phone: "909.274.0272", email: "sales@hrgprefab.com" },
  { phone: null, email: "jason@hrgprefab.com" },
  { phone: null, email: "michael@hrgprefab.com" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <img src="/assets/logo-02-sm.png" alt="HRG Prefab" className="h-12 w-auto object-contain mb-4" />
          <p className="text-sm leading-relaxed max-w-xs">
            Prefab additions &amp; ADUs, engineered off-site and assembled on your property.
          </p>
        </div>

        <div>
          <h4 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Menu</h4>
          <ul className="space-y-2 text-sm text-white">
            {SITE_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Call</h4>
          <ul className="space-y-3 text-sm text-white">
            {CONTACTS.filter((c) => c.phone).map((c) => (
              <li key={c.email}>
                <a href={`tel:+1${c.phone.replace(/\D/g, "")}`} className="hover:text-primary transition-colors">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Email</h4>
          <ul className="space-y-3 text-sm text-white">
            {CONTACTS.map((c) => (
              <li key={c.email}>
                <a href={`mailto:${c.email}`} className="hover:text-primary transition-colors">
                  {c.email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Visit</h4>
          <ul className="space-y-2 text-sm text-white">
            <li>
              <span className="block text-xs text-white/50">An extension of</span>
              <a href="https://thehomeremodelgroup.com" className="hover:text-primary transition-colors">
                The Home Remodel Group
              </a>
            </li>
            <li>
              <a href="/estimate" className="hover:text-primary transition-colors">
                Remodel cost planner
              </a>
            </li>
            <li>Mon – Fri, 8am – 5pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-white/50">
          © {new Date().getFullYear()} HRG Prefab. Expected Project Budgets are planning
          estimates, not contracts or bids.
        </div>
      </div>
    </footer>
  );
}