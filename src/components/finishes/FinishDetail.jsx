import React from "react";
import { Check } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { priceLabel } from "./FinishCard";

// A finish up close: bigger photo, a room example, and the details behind a disclosure so
// they are there without crowding the panel. Slides in from the side on desktop and up
// from the bottom on phones.
export default function FinishDetail({ detail, sf, selectedKey, onSelect, onClear, onClose }) {
  const isMobile = useIsMobile();
  const option = detail?.option;
  const selected = option && selectedKey === option.key;

  return (
    <Sheet open={Boolean(option)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`overflow-y-auto p-0 ${isMobile ? "max-h-[88vh] rounded-t-xl" : "w-full sm:max-w-lg"}`}
      >
        {option && (
          <div>
            <img src={option.img.replace("w=640&h=480", "w=1000&h=750")} alt="" className="w-full aspect-[4/3] object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{detail.slotLabel}</p>
              <SheetTitle className="mt-1 font-heading text-2xl font-bold">{option.name}</SheetTitle>
              <SheetDescription className="mt-2 text-base text-foreground/70">{option.desc}</SheetDescription>
              <p className="mt-4 text-sm font-semibold">{priceLabel(option, sf).long}</p>

              {option.room && option.room !== option.img && (
                <figure className="mt-6">
                  <img src={option.room} alt="" className="w-full aspect-[3/2] object-cover rounded-md" />
                  <figcaption className="mt-2 text-xs text-foreground/55">In a room</figcaption>
                </figure>
              )}

              {option.details && (
                <details className="mt-6 group border-t border-border pt-4">
                  <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-semibold min-h-11">
                    Details
                    <span className="text-primary group-open:rotate-45 transition-transform text-lg leading-none" aria-hidden="true">+</span>
                  </summary>
                  <dl className="mt-2 space-y-3 text-sm">
                    {Object.entries(option.details).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-foreground/55">{k}</dt>
                        <dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
              <p className="mt-4 text-xs text-foreground/45">Sample content. HRG confirms products in your project review.</p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    onSelect();
                    onClose();
                  }}
                  className="flex-1 min-h-12 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 text-sm font-semibold uppercase tracking-wide hover:bg-primary/90"
                >
                  {selected && <Check className="w-4 h-4" aria-hidden="true" />}
                  {selected ? "Keep this finish" : "Select this finish"}
                </button>
                {selected && (
                  <button type="button" onClick={onClear} className="min-h-12 px-3 text-sm font-semibold text-foreground/70 hover:text-primary">
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
