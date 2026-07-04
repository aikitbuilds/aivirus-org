"use client";

// Cross-links to the other live Fiends Grid properties. Added 2026-07-03 —
// aivirus.org previously had zero outbound links to anything, including the
// app it exists to funnel people toward. AAfiends.com and RaceFiends.com get
// the matching version of this component; keep the three in sync.
const PROPERTIES = [
  {
    name: "AAfiends.com",
    tagline: "The daily dashboard. Data Over Denial.",
    href: "https://aafiendscom.web.app",
    dot: "bg-[#00FF00]",
  },
  {
    name: "RaceFiends.com",
    tagline: "The pavement. Carry the standard.",
    href: "https://racefiends.com",
    dot: "bg-red-500",
  },
  {
    name: "AIVirus.org",
    tagline: "The threat. Run the diagnostic.",
    href: "/",
    dot: "bg-red-500 animate-pulse",
    current: true,
  },
];

export default function EcosystemFooter() {
  return (
    <div className="w-full max-w-4xl mx-auto my-4">
      <div className="border border-white/10 rounded-xl p-6 md:p-8 bg-[#0A0A0A]">
        <div className="text-[10px] font-mono font-black text-neutral-500 uppercase tracking-widest mb-5 text-center">
          The Fiends Grid
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROPERTIES.map((p) =>
            p.current ? (
              <div
                key={p.name}
                className="flex flex-col gap-1.5 p-4 rounded border border-red-500/30 bg-red-500/5"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`}></span>
                  <span className="text-xs font-mono font-black text-white">{p.name}</span>
                  <span className="text-[9px] text-red-400 font-mono font-bold uppercase tracking-widest ml-auto">You are here</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">{p.tagline}</p>
              </div>
            ) : (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 p-4 rounded border border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`}></span>
                  <span className="text-xs font-mono font-black text-white">{p.name}</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">{p.tagline}</p>
              </a>
            )
          )}
        </div>
        <p className="text-center text-[9px] text-neutral-600 font-mono uppercase tracking-widest mt-6">
          Built by members, for members. Non-affiliated with AA World Services.
        </p>
      </div>
    </div>
  );
}
