import { ChevronRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const coverage = [
  {
    heading: "What HRG covers at delivery",
    text: "This warranty applies to prefab panels, windows, doors and other materials you purchase from HRG. If we deliver the wrong quantity or an item that differs from your approved specifications, we will correct the order and cover the freight. If the specified item is unavailable, you may approve a substitute in writing or receive a refund for that item.",
  },
  {
    heading: "Manufacturer warranties for factory defects",
    text: "Before you approve a product for purchase, HRG will give you the applicable written warranty or confirm in writing if none applies. The manufacturer or supplier named in that warranty is responsible for covered factory defects. Its terms specify when coverage begins, how long it lasts, who can claim and whether a repair, replacement or refund is available. Exclusions may include normal wear and damage caused by improper storage, alteration, installation or maintenance.",
  },
  {
    heading: "Installation and labor disclaimer",
    text: "The licensed contractor you hire separately is responsible for site work, assembly and installation. Any workmanship warranty for that work comes from the contractor under your construction agreement or applicable law. For a product defect, coverage for freight, removal, reinstallation and repairs to surrounding finishes depends on the product warranty, your signed agreements and applicable law.",
  },
];

export default function MaterialsWarranty() {
  return (
    <article className="bg-background text-foreground">
      <header className="bg-brand-dark text-white">
        <div className="mx-auto max-w-4xl px-6 py-9 md:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/75">
            <Link to="/" className="underline-offset-4 hover:underline">Home</Link>
            <ChevronRight aria-hidden="true" className="size-4" />
            <span aria-current="page">Materials warranty</span>
          </nav>
          <h1 className="mt-6 font-heading text-3xl font-semibold leading-tight md:text-5xl">
            Limited Materials Warranty
          </h1>
          <p className="mt-3 text-lg text-white/85">Product coverage and installation disclaimer</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            The Home Remodel Group LLC · Published <time dateTime="2026-11-23">November 23, 2026</time>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/documents/hrg-prefab-materials-warranty.pdf"
              download="HRG-Prefab-Limited-Materials-Warranty.pdf"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-brand-dark hover:bg-white/90"
            >
              <Download aria-hidden="true" className="size-4" />
              Download warranty (PDF)
            </a>
            <a href="#claims" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
              How to make a claim
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-9 md:py-14">
        <div className="max-w-3xl">
          {coverage.map(({ heading, text }) => (
            <section key={heading} className="mb-7 border-b border-border pb-7">
              <h2 className="font-heading text-xl font-semibold md:text-2xl">{heading}</h2>
              <p className="mt-3 leading-7">{text}</p>
            </section>
          ))}
          <section id="claims" aria-labelledby="claims-heading" className="scroll-mt-28 border-l-4 border-primary bg-card p-5 sm:p-7">
            <h2 id="claims-heading" className="font-heading text-xl font-semibold md:text-2xl">How to make a claim</h2>
            <p className="mt-3 leading-7">
              At delivery, check the packing list. Note visible damage or shortages on the receipt when possible.
              Hold visibly damaged items for inspection before installation. HRG will coordinate transit damage
              claims under your order’s delivery terms. Report hidden defects promptly after discovery and follow
              the product warranty’s notice deadlines.
            </p>
            <p className="mt-4 leading-7">
              Email <a href="mailto:sales@hrgprefab.com" className="font-semibold underline underline-offset-4">sales@hrgprefab.com</a>{" "}
              with your project address, invoice or order number, affected item and a description. Include photos
              or product labels if available. HRG will help you submit the claim. If the manufacturer requires
              HRG to file as the purchaser, we will file it for you.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold">Your legal rights</h2>
            <p className="mt-3 leading-7">
              Your signed materials agreement and applicable implied warranties and remedies remain in effect.
              This warranty gives you specific legal rights, and you may also have other rights which vary from
              state to state.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
