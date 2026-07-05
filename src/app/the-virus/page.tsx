import type { Metadata } from "next";
import Link from "next/link";
import { Biohazard, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { vectors } from "@/data/vectors";
import { iconFor, ACCENTS } from "@/lib/vector-styles";
import EcosystemFooter from "@/components/EcosystemFooter";

export const metadata: Metadata = {
  title: "The Addiction Intelligence Virus — 10 Vectors | AIVirus.org",
  description:
    "Addiction isn't a willpower problem — it's a system infection. Explore the 10 vectors of the Addiction Intelligence Virus: alcohol, opioids, nicotine, cannabis, gambling, pornography, social media, shopping, work, and gaming. Sourced stats, one defense.",
  keywords: [
    "addiction intelligence virus", "types of addiction", "behavioral addiction",
    "alcohol", "opioids", "nicotine", "gambling addiction", "porn addiction",
    "social media addiction", "gaming disorder", "work addiction", "12 steps",
  ],
  openGraph: {
    title: "The Addiction Intelligence Virus — 10 Vectors",
    description: "One infection, ten vectors. See how the same system-level virus runs across every addiction — and the one defense that works against all of them.",
    url: "https://aivirus.org/the-virus",
    siteName: "AIVirus.org",
    type: "website",
  },
};

export default function TheVirusHub() {
  return (
    <main className="flex-1 bg-[#050505] text-neutral-100 font-mono">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#050505]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Biohazard className="text-red-500 w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-black tracking-tight uppercase">
              AIVIRUS<span className="text-red-500">.ORG</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <div className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/50 border border-red-500/50 rounded px-3 py-2 inline-flex items-center gap-2 mb-8 animate-pulse-alert">
          <Biohazard size={14} /> Pathogen Database — 10 Known Vectors
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none mb-8">
          The Addiction<br /><span className="text-red-500">Intelligence Virus</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-neutral-300 leading-relaxed">
          It isn't a willpower problem. It's a system infection — a self-preserving program that hijacks the brain's reward wiring, overrides your logic, and convinces you it's in control. It runs on ten known vectors. Different payload, same architecture.
        </p>
        <p className="max-w-3xl text-base text-neutral-500 leading-relaxed mt-4">
          Every figure below is drawn from a named public source (SAMHSA, CDC, NIDA, NCPG, or peer-reviewed research). Nothing here is invented.
        </p>
      </section>

      {/* Vector grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vectors.map((v) => {
            const c = ACCENTS[v.accent];
            const Icon = iconFor(v.icon);
            const headline = v.stats[0];
            return (
              <Link
                key={v.slug}
                href={`/the-virus/${v.slug}`}
                className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center ${c.text}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-neutral-600 uppercase">{v.code}</span>
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight mb-1">{v.name}</h2>
                <p className="text-xs text-neutral-500 leading-relaxed mb-5 flex-1">{v.tagline}</p>
                <div className="border-t border-white/5 pt-4">
                  <div className={`text-2xl font-black ${c.strong}`}>{headline.value}</div>
                  <div className="text-[11px] text-neutral-500 leading-snug mt-1">{headline.label}</div>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                  Run diagnostic <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Shared defense */}
      <section className="border-t border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-500 mx-auto mb-8">
            <Shield size={28} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Ten vectors.<br /><span className="text-blue-500">One defense.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-300 leading-relaxed text-lg">
            Because every vector runs the same underlying program, the same framework fights all of them. The 12 Steps are the open-source defense that has held the line for nearly 90 years — a system handover, a deep scan, and daily security patches, run with other people.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
            >
              See the 12-Step Defense <ArrowRight size={16} />
            </Link>
            <Link
              href="/bio12"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
            >
              The BIO 12 Firewall <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <EcosystemFooter />
    </main>
  );
}
