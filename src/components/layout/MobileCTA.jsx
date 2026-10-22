import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileCTA() {
  const { pathname, search } = useLocation();

  // The homepage hosts the project builder and shows its own live budget bar.
  if (pathname === "/") return null;
  // "Build yours" and the builder it hands a model to have their own price bar and form;
  // this button would send the visitor to a blank builder and lose their choices.
  if (pathname.endsWith("/build") || (pathname === "/see-what-fits" && search.includes("model="))) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-brand-dark/95 backdrop-blur-sm border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Link
        to="/#build"
        className="block w-full text-center bg-primary text-primary-foreground px-5 py-3.5 rounded-md font-semibold uppercase tracking-wide text-sm"
      >
        Start With My Property
      </Link>
    </div>
  );
}