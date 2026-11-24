import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/shared/PageHero";
import { planningGuides } from "@/lib/planningGuides";
import PageNotFound from "@/lib/PageNotFound";
export default function PlanningGuides() {
 const { slug } = useParams();
 const guide = planningGuides.find(g => g.slug === slug);
 const updated = guide && new Intl.DateTimeFormat("en-US", {
   month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
 }).format(new Date(guide.dateModified || guide.datePublished || "2026-11-13"));
 if (slug && !guide) return <PageNotFound />;
 return <><PageHero image={null} breadcrumb="Planning guides" label="Plan with clarity" title={guide?.title || "A clearer path to your prefab project."} subtitle={guide?.intro || "Compare costs, project scopes and property requirements before choosing your next step."} />
 <section className="py-16 bg-brand-cream"><div className="max-w-3xl mx-auto px-6">
 {guide ? <article><p className="text-sm text-foreground/60 mb-8">By HRG Prefab · Updated {updated}</p>{guide.sections.map(([title, paragraphs]) => <section className="mb-12" key={title}><h2 className="font-heading text-2xl font-semibold mb-4">{title}</h2>{paragraphs.map(p => <p className="mb-4 leading-relaxed text-foreground/80" key={p}>{p}</p>)}</section>)}{guide.sources?.length ? <section className="mb-12"><h2 className="font-heading text-2xl font-semibold mb-4">Official sources</h2><p className="mb-4">Reviewed November 15, 2026. Confirm current scope with each provider.</p><ul className="list-disc pl-6 space-y-2">{guide.sources.map(([label,href])=><li key={href}><a className="underline break-words" href={href}>{label}</a></li>)}</ul></section> : null}
 {["prefab-adu-cost", "prefab-adu-kits-own-contractor"].includes(guide.slug) &&
    <p className="mb-10"><a className="underline" href="/#build">Estimate my ADU materials, delivery and site work in Project Builder</a></p>}
 </article> : null}
 <nav aria-label="Planning guides" className="space-y-6">{planningGuides.filter(g=>g.slug !== slug).map(g=><article key={g.slug}><h2 className="font-heading text-xl font-semibold"><Link className="underline" to={`/guides/${g.slug}`}>{g.title}</Link></h2><p className="mt-2 text-foreground/70">{g.description}</p></article>)}</nav>
 <aside className="mt-12 border-t border-border pt-8"><h2 className="font-heading text-2xl font-semibold mb-4">Start with your property.</h2><p className="mb-6">Tell us your address, preferred size and target budget. We will help identify the next step.</p><div className="flex flex-wrap gap-5"><Link className="bg-brand-dark text-white px-6 py-3 rounded" to="/see-what-fits">Check my property</Link><Link className="underline py-3" to="/collection">Explore floor plans</Link><Link className="underline py-3" to="/faq">Project FAQs</Link></div></aside>
 </div></section></>;
}
