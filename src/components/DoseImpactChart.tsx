/**
 * DOSE impact chart — a per-vector infographic showing which of the four brain
 * chemicals a strain HIJACKS (floods through one artificial door, then depletes)
 * versus which it STARVES (crowds out the natural inputs that pay them out).
 *
 * Deliberately a server component with inline SVG + CSS only: no client JS, so
 * the whole thing is in the raw HTML for crawlers and LLMs, and it costs nothing
 * to render. Colours come from the vector accent so each page stays on-theme.
 */

import { Zap, HeartHandshake, Sun, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DoseImpact } from "@/data/vector-depth";
import type { AccentKey } from "@/data/vectors";
import { ACCENTS } from "@/lib/vector-styles";

const META: Record<
  DoseImpact["chemical"],
  { icon: LucideIcon; letter: string; role: string; earn: string }
> = {
  Dopamine: {
    icon: Zap,
    letter: "D",
    role: "Drive · motivation · anticipation",
    earn: "Earn it back: morning light, brisk walking, cold water, finishing hard things.",
  },
  Oxytocin: {
    icon: HeartHandshake,
    letter: "O",
    role: "Bonding · trust · safety",
    earn: "Earn it back: sitting in a room with people, calling someone, service.",
  },
  Serotonin: {
    icon: Sun,
    letter: "S",
    role: "Baseline mood · calm",
    earn: "Earn it back: sleep, daylight, fibre and fermented food (the gut makes most of it).",
  },
  Endorphins: {
    icon: Flame,
    letter: "E",
    role: "Pain relief · natural high",
    earn: "Earn it back: hard physical effort, heat, deep laughter.",
  },
};

/** Fixed display order so every vector page reads D-O-S-E top to bottom. */
const ORDER: DoseImpact["chemical"][] = ["Dopamine", "Oxytocin", "Serotonin", "Endorphins"];

export default function DoseImpactChart({
  items,
  accent,
}: {
  items: DoseImpact[];
  accent: AccentKey;
}) {
  const c = ACCENTS[accent];
  const byChemical = new Map(items.map((i) => [i.chemical, i]));

  return (
    <div className="flex flex-col gap-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] font-bold uppercase tracking-widest mb-1">
        <span className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-sm ${c.dot}`} />
          <span className={c.text}>Hijacked — flooded, then depleted</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-neutral-700" />
          <span className="text-neutral-500">Starved — natural inputs crowded out</span>
        </span>
      </div>

      {ORDER.map((chemical) => {
        const item = byChemical.get(chemical);
        if (!item) return null;
        const m = META[chemical];
        const Icon = m.icon;
        const hijacked = item.mode === "hijacked";

        return (
          <div
            key={chemical}
            className={`bg-[#0a0a0a] border rounded-2xl p-6 relative overflow-hidden ${
              hijacked ? c.border : "border-white/10"
            }`}
          >
            {/* Severity rail: hijacked reads as the acute damage, starved as chronic. */}
            <div
              className={`absolute top-0 left-0 h-full w-1 ${hijacked ? c.dot : "bg-neutral-700"}`}
              aria-hidden="true"
            />

            <div className="flex flex-col sm:flex-row sm:items-start gap-5 pl-2">
              <div
                className={`shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center ${
                  hijacked ? `${c.bg} ${c.border} ${c.text}` : "bg-white/[0.03] border-white/10 text-neutral-500"
                }`}
              >
                <Icon size={26} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="text-white font-black uppercase tracking-tight text-lg">
                    <span className={hijacked ? c.text : "text-neutral-500"}>{m.letter}</span>
                    {chemical.slice(1)}
                  </h3>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      hijacked
                        ? `${c.bg} ${c.border} ${c.text}`
                        : "bg-white/[0.03] border-white/10 text-neutral-500"
                    }`}
                  >
                    {hijacked ? "Hijacked" : "Starved"}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-600 mb-3">
                  {m.role}
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-3">{item.body}</p>

                <p className="text-neutral-500 text-xs leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                  {m.earn}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
