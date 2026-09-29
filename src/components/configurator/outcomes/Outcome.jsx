import React, { useState } from "react";
import { CheckCircle, Compass, MapPin, Wallet, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";
import BookingCalendar from "@/components/configurator/outcomes/BookingCalendar";
import { STARTING_RANGE } from "@/lib/leadQualification";

const fmt = (n) => "$" + n.toLocaleString("en-US");

const GUIDE = [
  {
    icon: MapPin,
    title: "Check your zoning",
    text: "Ask your city or county what your property allows: setbacks, unit size, height, and parking.",
  },
  {
    icon: Compass,
    title: "Locate your utilities",
    text: "Know where your water, sewer, and power connections are, and whether the property is on well or septic.",
  },
  {
    icon: Wallet,
    title: "Set a realistic budget",
    text: "Include planning, permits, site work, and construction, not just the structure itself.",
  },
  {
    icon: FileText,
    title: "Gather property documents",
    text: "A survey or plat map of your property speeds up every later step of planning and permitting.",
  },
];

const lightButton =
  "px-6 py-3 rounded-md bg-config-field text-foreground font-semibold text-sm hover:bg-config-muted transition-colors";

export default function Outcome({ category, leadId, sizeChoice }) {
  const [state, setState] = useState("");

  const updateLead = (data) =>
    leadId
      ? base44.entities.Lead.update(leadId, data).catch(() => {})
      : Promise.resolve();

  if (category === "ready_prospect") {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="w-14 h-14 text-config-blue mx-auto mb-5" />
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          You're ready for your project call.
        </h3>
        <p className="mt-3 text-foreground/60 leading-relaxed">
          Pick a time below and we'll come prepared with options, budget guidance, and next steps for your property.
        </p>
        {state ? (
          <div className="mt-8 bg-config-muted border border-config-field rounded-lg p-6">
            <p className="font-semibold text-foreground">Your project call is booked.</p>
            <p className="text-sm text-foreground/60 mt-1">{state}</p>
            <p className="text-xs text-foreground/50 mt-3">
              We'll send a confirmation with what to have ready for the call.
            </p>
          </div>
        ) : (
          <div className="mt-8 text-left">
            <BookingCalendar
              onConfirm={async (slot) => {
                await updateLead({ booked_slot: slot });
                setState(slot);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  if (category === "needs_review") {
    return (
      <div className="max-w-xl mx-auto text-center">
        <CheckCircle className="w-14 h-14 text-config-blue mx-auto mb-5" />
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Your request is with our team.
        </h3>
        <p className="mt-3 text-foreground/60 leading-relaxed">
          Thanks — we're reviewing your answers now. We'll reach out within one business day to schedule your
          project call and talk through the right next step for your situation.
        </p>
      </div>
    );
  }

  if (category === "early_research") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Your planning guide is ready.</h3>
          <p className="mt-3 text-foreground/60 leading-relaxed">
            While you're researching, here's what to line up before your project call.
          </p>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {GUIDE.map((g) => (
            <div key={g.title} className="bg-config-muted border border-config-field rounded-lg p-5 text-left">
              <g.icon className="w-5 h-5 text-config-blue mb-3" />
              <p className="font-semibold text-foreground">{g.title}</p>
              <p className="text-sm text-foreground/60 mt-1.5 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          {state ? (
            <p className="text-sm text-foreground/60">
              Thanks — we'll check in when you're ready. We've noted your request for follow-up.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => updateLead({ followup_requested: true }).then(() => setState("requested"))}
              className="px-8 py-3.5 rounded-md bg-config-navy text-white font-semibold text-sm hover:opacity-90 transition-all"
            >
              Request follow-up
            </button>
          )}
        </div>
      </div>
    );
  }

  // budget_mismatch
  const start = STARTING_RANGE[sizeChoice];
  return (
    <div className="max-w-xl mx-auto text-center">
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
        Let's make sure your budget and scope line up.
      </h3>
      <p className="mt-3 text-foreground/60 leading-relaxed">
        HRG's confirmed starting range for a {sizeChoice} project is about {fmt(start)}, including planning, permits,
        site work, and construction. Many of our clients adjust one side or the other to make the project work.
      </p>
      {state ? (
        <p className="mt-8 text-sm text-foreground/60">
          Thanks — we've noted that. A member of our team will follow up to walk through the options with you.
        </p>
      ) : (
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => updateLead({ mismatch_response: "Open to adjusting budget" }).then(() => setState("budget"))}
            className={lightButton}
          >
            I'm open to adjusting my budget
          </button>
          <button
            type="button"
            onClick={() => updateLead({ mismatch_response: "Open to adjusting scope" }).then(() => setState("scope"))}
            className={lightButton}
          >
            I'm open to a different size
          </button>
        </div>
      )}
    </div>
  );
}