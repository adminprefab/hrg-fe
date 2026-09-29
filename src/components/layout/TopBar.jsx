import React from "react";

export default function TopBar() {
  return (
    <div className="bg-brand-dark text-white/70 text-xs tracking-wide hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <p className="font-body">
          Prefab additions &amp; ADUs, engineered off-site and assembled on your property.
        </p>
        <div className="flex items-center gap-6">
          <a href="tel:+19096161182" className="hover:text-white transition-colors">
            (909) 616-1182
          </a>
          <a href="tel:+19092740272" className="hover:text-white transition-colors">
            (909) 274-0272
          </a>
          <a href="tel:+19175595056" className="hover:text-white transition-colors">
            (917) 559-5056
          </a>
        </div>
      </div>
    </div>
  );
}