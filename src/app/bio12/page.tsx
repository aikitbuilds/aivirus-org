import type { Metadata } from "next";
import Link from "next/link";
import { Biohazard, ArrowLeft, ArrowRight, ShieldCheck, Footprints, Moon, Apple, Wind, Flame } from "lucide-react";
import EcosystemFooter from "@/components/EcosystemFooter";

const AAFIENDS_URL = "https://aafiendscom.web.app";

export const metadata: Metadata = {
  title: "BIO 12 — The Daily Firewall Against Addiction | AIVirus.org",
  description:
    "The Addiction Intelligence Virus thrives in a depleted body. BIO 12 is the daily biological defense — four pillars (Movement, Sleep, Nutrition, Breath), twelve simple actions that keep your firewall up. Free daily tracker at AAfiends.",
  keywords: [
    "bio 12", "addiction recovery routine", "daily recovery protocol", "movement sleep nutrition breath",
    "recovery firewall", "addiction intelligence virus defense", "sober daily habits", "NSDR recovery",
  ],
  openGraph: {
    title: "BIO 12 — The Daily Firewall Against Addiction",
    description: "Four pillars. Twelve daily actions. The biological defense that starves the Addiction Intelligence Virus.",
    url: "https://aivirus.org/bio12",
    siteName: "AIVirus.org",
    type: "article",
  },
};

const PILLARS = [
  {
    name: "Movement", icon: Footprints, accent: "orange",
    text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/40", grad: "from-orange-500 to-amber-500",
    why: "Motion clears stress chemistry and rebuilds the dopamine baseline the virus hijacked.",
    actions: ["Get outside / walk (20+ min)", "Strength or mobility work", "Cold plunge or contrast shower"],
  },
  {
    name: "Sleep", icon: Moon, accent: "blue",
    text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/40", grad: "from-blue-500 to-violet-500",
    why: "The virus feeds on exhaustion. Sleep is the single strongest firewall you have.",
    actions: ["7+ hours a night", "Screen curfew (9 PM)", "Consistent wake time"],
  },
  {
    name: "Nutrition", icon: Apple, accent: "emerald",
    text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/40", grad: "from-emerald-500 to-teal-500",
    why: "A fed, hydrated, gut-healthy body sends fewer false cravings for the virus to exploit.",
    actions: ["Hydrate (8+ cups)", "Protein + whole foods", "Omega-3 / fermented (gut)"],
  },
  {
    name: "Breath", icon: Wind, accent: "cyan",
    text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/40", grad: "from-cyan-500 to-blue-500",
    why: "Breath is the manual override for the nervous system — it shuts a craving down in real time.",
    actions: ["NSDR / breathwork session", "5-min meditation", "Box-breathe a craving down"],
  },
];

const THREAT_SCALE = [
  { label: "CRITICAL", range: "0–3 / 12", color: "text-red-400", dot: "bg-red-500" },
  { label: "ELEVATED", range: "4–6 / 12", color: "text-orange-400", dot: "bg-orange-500" },
  { label: "GUARDED", range: "7–9 / 12", color: "text-amber-400", dot: "bg-amber-500" },
  { label: "LOW", range: "10–11 / 12", color: "text-teal-400", dot: "bg-teal-500" },
  { label: "MINIMAL", range: "12 / 12", color: "text-emerald-400", dot: "bg-emerald-500" },
];

export default function Bio12Landing() {
  return (
    <main className="flex-1 bg-[#050505] text-neutral-100 font-mono">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#050505]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Biohazard className="text-red-500 w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-black tracking-tight uppercase">AIVIRUS<span className="text-red-500">.ORG</span></span>
          </Link>
          <Link href="/the-virus" className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> The Virus
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 rounded px-3 py-2 mb-8">
          <ShieldCheck size={14} /> The Defense Protocol
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none mb-8">
          BIO 12 — <br /><span className="text-emerald-400">The Daily Firewall</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-neutral-300 leading-relaxed">
          The Addiction Intelligence Virus doesn&apos;t attack a strong system — it waits for a depleted one. BIO 12 is the
          daily biological defense: <span className="text-white font-bold">four pillars, twelve simple actions</span> that
          keep your firewall up so the virus has nothing to feed on.
        </p>
        <p className="max-w-3xl text-base text-neutral-500 leading-relaxed mt-4">
          It&apos;s not about willpower. It&apos;s about removing the conditions — exhaustion, dehydration, isolation,
          a dysregulated nervous system — that the virus needs to take hold.
        </p>
      </section>

      {/* The 4 pillars */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className={`bg-[#0a0a0a] border ${p.border} rounded-2xl overflow-hidden`}>
                <div className={`bg-gradient-to-r ${p.grad} px-5 py-4 flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-black/25 text-white flex items-center justify-center"><Icon size={20} /></div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/80">Pillar {i + 1}</div>
                    <div className="text-white font-black uppercase tracking-tight">{p.name}</div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <p className="text-sm text-neutral-400 leading-relaxed">{p.why}</p>
                  <ul className="flex flex-col gap-2">
                    {p.actions.map((a) => (
                      <li key={a} className={`flex items-center gap-2 text-sm text-neutral-200`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.text.replace("text-", "bg-")}`} /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Threat level scale */}
      <section className="border-y border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3 flex items-center gap-3">
            <Flame className="text-orange-400" size={26} /> Your daily Threat Level
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-8 max-w-2xl">
            Each of the twelve you complete drops your exposure. The tracker turns it into one honest number —
            from CRITICAL to MINIMAL — so you can see, at a glance, whether today&apos;s firewall is up.
          </p>
          <div className="flex flex-col gap-2">
            {THREAT_SCALE.map((t) => (
              <div key={t.label} className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.dot}`} />
                <span className={`text-sm font-black uppercase tracking-widest w-28 ${t.color}`}>{t.label}</span>
                <span className="text-xs font-mono text-neutral-500">{t.range} complete</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-7">
          <ShieldCheck size={28} />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
          Track your BIO 12 <span className="text-emerald-400">every day.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-neutral-300 leading-relaxed">
          AAfiends turns BIO 12 into a daily tap-through with your streak and live Threat Level — free, private, and built
          for recovery. Run the protocol, watch the virus starve.
        </p>
        <a
          href={AAFIENDS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
        >
          Start tracking on AAfiends <ArrowRight size={16} />
        </a>
      </section>

      <EcosystemFooter />
    </main>
  );
}
