import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/shared/PageHero";
import { planningGuides } from "@/lib/planningGuides";
import PageNotFound from "@/lib/PageNotFound";
export default function PlanningGuides() {
 const { slug } = useParams();
 const guide = planningGuides.find(g => g.slug === slug);
 if (slug && !guide) return <PageNotFound />;
 return <><PageHero image={null} breadcrumb="Planning guides" label="Plan with clarity" title={guide?.title || "A clearer path to your prefab project."} subtitle={guide?.intro || "Compare costs, project scopes and property requirements before choosing your next step."} />
 <section className="py-16 bg-brand-cream"><div className="max-w-3xl mx-auto px-6">
 {guide ? <article><p className="text-sm text-foreground/60 mb-8">By HRG Prefab · Updated November 13, 2026</p>{guide.sections.map(([title, paragraphs]) => <section className="mb-12" key={title}><h2 className="font-heading text-2xl font-semibold mb-4">{title}</h2>{paragraphs.map(p => <p className="mb-4 leading-relaxed text-foreground/80" key={p}>{p}</p>)}</section>)}</article> : null}
 <nav aria-label="Planning guides" className="space-y-6">{planningGuides.filter(g=>g.slug !== slug).map(g=><article key={g.slug}><h2 className="font-heading text-xl font-semibold"><Link className="underline" to={`/guides/${g.slug}`}>{g.title}</Link></h2><p className="mt-2 text-foreground/70">{g.description}</p></article>)}</nav>
 <aside className="mt-12 border-t border-border pt-8"><h2 className="font-heading text-2xl font-semibold mb-4">Start with your property.</h2><p className="mb-6">Tell us your address, preferred size and target budget. We will help identify the next step.</p><div className="flex flex-wrap gap-5"><Link className="bg-brand-dark text-white px-6 py-3 rounded" to="/see-what-fits">Check my property</Link><Link className="underline py-3" to="/collection">Explore floor plans</Link><Link className="underline py-3" to="/faq">Project FAQs</Link></div></aside>
 </div></section></>;
}
