import React from "react";
import { ArrowRight, Check, ChevronUp, Circle } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { money } from "@/lib/projectPricing";

export const rangeText = (range) => `${money(range.low)} – ${money(range.high)}`;

// What the choices do to the budget, in words: verified upgrades change it, everything
// else is waiting on pricing and changes nothing yet.
function BudgetImpact({ estimate }) {
  const verified = estimate.upgrades;
  const pending = estimate.pendingPricing;
  return (
    <div className="rounded-md bg-secondary/60 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">Estimated project budget</div>
      <div className="mt-1 font-heading text-2xl font-bold text-primary">{rangeText(estimate.range)}</div>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/65">Finish upgrades in budget</dt>
          <dd className="font-semibold">{verified ? `+${money(verified)}` : "$0"}</dd>
        </div>
        {pending > 0 && (
          <div className="flex justify-between gap-4">
            <dt className="text-foreground/65">Pricing to be confirmed</dt>
            <dd className="font-semibold">
              {pending} choice{pending > 1 ? "s" : ""}
            </dd>
          </div>
        )}
      </dl>
      <p className="mt-3 text-xs text-foreground/55 leading-relaxed">
        The budget changes only when an upgrade's price is confirmed for your home's size.
      </p>
    </div>
  );
}

// Every slot in the categories shown: what is chosen, or that it is still open.
function SelectionList({ rows, onJump, withImages = false }) {
  return (
    <ul className="divide-y divide-border">
      {rows.map((r) => (
        <li key={r.slot.key} className="py-3 flex items-center gap-3">
          {withImages && (
            <img src={(r.option || r.included).img} alt="" className={`w-14 h-11 rounded object-cover shrink-0 ${r.option ? "" : "opacity-40"}`} />
          )}
          {r.option ? (
            <Check className="w-4 h-4 text-primary shrink-0" aria-label="Chosen" />
          ) : (
            <Circle className="w-4 h-4 text-foreground/30 shrink-0" aria-label="Not chosen yet" />
          )}
          <div className="min-w-0 flex-1">
            <div className="text-xs text-foreground/55">{r.slot.label}</div>
            <div className={`text-sm ${r.option ? "font-semibold" : "text-foreground/55"}`}>
              {r.option ? r.option.name : "Not chosen yet"}
            </div>
            {!r.option && <div className="text-xs text-foreground/45">Standard: {r.included.name}</div>}
          </div>
          <button
            type="button"
            onClick={() => onJump(r.category)}
            className="min-h-11 px-2 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            {r.option ? "Change" : "Choose"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Actions({ onSave, onReview, onHelp, showReview = true }) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onSave}
        className="w-full min-h-12 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 text-sm font-semibold uppercase tracking-wide hover:bg-primary/90"
      >
        Save and continue
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
      <div className="flex gap-2">
        {showReview && (
          <button type="button" onClick={onReview} className="flex-1 min-h-11 rounded-md border border-foreground/25 text-sm font-semibold hover:border-primary hover:text-primary">
            Review selections
          </button>
        )}
        <button type="button" onClick={onHelp} className="flex-1 min-h-11 rounded-md text-sm font-semibold text-primary hover:underline">
          Help me choose
        </button>
      </div>
    </div>
  );
}

// Desktop: a sticky card beside the catalogue.
export function SelectionsAside({ rows, estimate, onJump, ...actions }) {
  const chosen = rows.filter((r) => r.option).length;
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-heading text-lg font-bold">Your selections</h2>
      <p className="text-sm text-foreground/60">
        {chosen} of {rows.length} chosen
      </p>
      <div className="mt-2 max-h-[38vh] overflow-y-auto pr-1">
        <SelectionList rows={rows} onJump={onJump} />
      </div>
      <div className="mt-4">
        <BudgetImpact estimate={estimate} />
      </div>
      <div className="mt-4">
        <Actions {...actions} />
      </div>
    </div>
  );
}

// Phones: a slim bar that opens the full review.
export function SelectionsBar({ rows, estimate, onReview, onSave }) {
  const chosen = rows.filter((r) => r.option).length;
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <button type="button" onClick={onReview} aria-label="Open your selections" className="w-full min-h-11 flex items-center justify-between gap-3 text-left">
        <span className="min-w-0">
          <span className="block text-xs font-semibold text-foreground/60">
            Your selections · {chosen} of {rows.length}
          </span>
          <span className="block font-heading font-bold text-primary truncate">{rangeText(estimate.range)}</span>
        </span>
        <ChevronUp className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onSave}
        className="mt-1 w-full min-h-12 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wide"
      >
        Save and continue
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// "Review selections" (and the phone summary): everything on one panel.
export function ReviewSheet({ open, onOpenChange, rows, estimate, onJump, ...actions }) {
  const isMobile = useIsMobile();
  const chosen = rows.filter((r) => r.option).length;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`overflow-y-auto ${isMobile ? "max-h-[88vh] rounded-t-xl" : "w-full sm:max-w-md"}`}
      >
        <SheetTitle className="font-heading text-2xl font-bold">Your selections</SheetTitle>
        <SheetDescription className="text-sm text-foreground/60">
          {chosen} of {rows.length} chosen. Anything left open gets the standard finish.
        </SheetDescription>
        <div className="mt-2">
          <SelectionList
            rows={rows}
            withImages
            onJump={(c) => {
              onOpenChange(false);
              onJump(c);
            }}
          />
        </div>
        <div className="mt-4">
          <BudgetImpact estimate={estimate} />
        </div>
        <div className="mt-4">
          <Actions {...actions} showReview={false} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
