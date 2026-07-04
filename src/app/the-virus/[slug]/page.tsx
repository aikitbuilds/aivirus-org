import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Biohazard, ArrowLeft, ArrowRight, Shield, ExternalLink, AlertTriangle } from "lucide-react";
import { vectors, getVector } from "@/data/vectors";
import { iconFor, ACCENTS } from "@/lib/vector-styles";
import EcosystemFooter from "@/components/EcosystemFooter";

const AAFIENDS_URL = "https://aafiendscom.web.app";

type Params = { slug: string };

export function generateStaticParams() {
  return vectors.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVector(slug);
  if (!v) return { title: "Vector Not Found | AIVirus.org" };
  const desc = `${v.virusName}: ${v.summary} Sourced statistics and the 12-Step defense.`;
  return {
    title: `${v.virusName} | AIVirus.org`,
    description: desc,
    keywords: [v.name.toLowerCase(), `${v.name.toLowerCase()} addiction`, "addiction intelligence virus", "12 steps"],
    openGraph: {
      title: v.virusName,
      description: desc,
      url: `https://aivirus.org/the-virus/${v.slug}`,
      siteName: "AIVirus.org",
      type: "article",
    },
  };
}

export default async function VectorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const v = getVector(slug);
  if (!v) notFound();

  const c = ACCENTS[v.accent];
  const Icon = iconFor(v.icon);
  const idx = vectors.findIndex((x) => x.slug === v.slug);
  const next = vectors[(idx + 1) % vectors.length];

  return (
    <main className="flex-1 bg-[#050505] text-neutral-100 font-mono">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#050505]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Biohazard className="text-red-500 w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-black tracking-tight uppercase">
              AIVIRUS<span className="text-red-500">.ORG</span>
            </span>
          </Link>
          <Link href="/the-virus" className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> All vectors
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.border} border flex items-center justify-center ${c.text} ${c.glow}`}>
            <Icon size={32} />
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-widest text-neutral-600 uppercase">{v.code} · Vector {idx + 1} of {vectors.length}</div>
            <div className={`text-sm font-bold uppercase tracking-widest ${c.text}`}>Infection Profile</div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none mb-6">
          {v.name}
        </h1>
        <p className={`text-xl md:text-2xl font-black leading-snug mb-6 ${c.strong}`}>{v.tagline}</p>
        <p className="max-w-3xl text-lg text-neutral-300 leading-relaxed">{v.summary}</p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {v.stats.map((s, i) => (
            <div key={i} className={`bg-[#0a0a0a] border ${c.border} rounded-2xl p-7`}>
              <div className={`text-5xl font-black ${c.strong} mb-3`}>{s.value}</div>
              <div className="text-neutral-300 text-sm leading-relaxed mb-4">{s.label}</div>
              <a
                href={s.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
              >
                <ExternalLink size={12} /> {s.source}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Mechanisms */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
          <AlertTriangle className={c.text} size={26} /> How the virus operates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {v.mechanisms.map((m, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-0.5 ${c.dot}`} />
              <div className="text-neutral-600 text-4xl font-black mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className={`text-lg font-black uppercase tracking-tight mb-2 ${c.text}`}>{m.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The defense */}
      <section className="border-y border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-500 mx-auto mb-7">
            <Shield size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-5">
            The defense is the <span className="text-blue-500">same</span>.
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-300 leading-relaxed">
            {v.name} is one vector of the same underlying virus — which means the same framework fights it. The 12 Steps are the proven, open-source defense: hand over the crashed system, run a deep scan of the wreckage, then apply daily security patches with other people. AAfiends turns that framework into a daily protocol.
          </p>
          <a
            href={AAFIENDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
          >
            Start the protocol <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Sources */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-5">Sources</h2>
        <ul className="flex flex-col gap-3">
          {v.sources.map((s, i) => (
            <li key={i}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm text-neutral-400 hover:text-white transition-colors leading-relaxed"
              >
                <ExternalLink size={14} className="shrink-0 mt-0.5" /> {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-neutral-600 text-xs mt-6 leading-relaxed max-w-2xl">
          Behavioral-addiction prevalence varies with how each study defines and measures the behavior; those figures are shown as estimates with their specific source. Clinical figures come from SAMHSA, CDC, and NIDA.
        </p>
      </section>

      {/* Next vector */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <Link
          href={`/the-virus/${next.slug}`}
          className="group flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-all"
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-600 mb-1">Next vector</div>
            <div className="text-xl font-black text-white uppercase tracking-tight">{next.name}</div>
          </div>
          <ArrowRight className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
        </Link>
      </section>

      <EcosystemFooter />
    </main>
  );
}
