import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Biohazard, ArrowLeft, ArrowRight, Shield, ExternalLink, AlertTriangle,
  Activity, ClipboardCheck, CalendarDays, HelpCircle, Users, BookOpen,
} from "lucide-react";
import { vectors, getVector } from "@/data/vectors";
import { getDepth } from "@/data/vector-depth";
import { iconFor, ACCENTS } from "@/lib/vector-styles";
import EcosystemFooter from "@/components/EcosystemFooter";
import DoseImpactChart from "@/components/DoseImpactChart";

const AAFIENDS_URL = "https://aafiends.com";
const JOURNAL_URL = "https://aafiends.com/90rr";

type Params = { slug: string };

export function generateStaticParams() {
  return vectors.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVector(slug);
  if (!v) return { title: "Vector Not Found | AIVirus.org" };
  const d = getDepth(slug);

  // Lead the description with the real-world question the page answers, so the
  // SERP snippet matches the search intent rather than our internal branding.
  const desc = d
    ? `${d.directAnswer.slice(0, 155)}…`
    : `${v.virusName}: ${v.summary} Sourced statistics and the 12-Step defense.`;

  return {
    title: d
      ? `${d.searchIntent.charAt(0).toUpperCase()}${d.searchIntent.slice(1)}? ${v.name} — The AIV Vector | AIVirus.org`
      : `${v.virusName} | AIVirus.org`,
    description: desc,
    alternates: { canonical: `https://aivirus.org/the-virus/${v.slug}` },
    keywords: [
      v.name.toLowerCase(),
      `${v.name.toLowerCase()} addiction`,
      `${v.name.toLowerCase()} addiction statistics`,
      `${v.name.toLowerCase()} recovery`,
      d?.searchIntent ?? "",
      "addiction intelligence virus",
      "12 steps",
      "dopamine",
    ].filter(Boolean),
    openGraph: {
      title: `${v.name} — The AIV Vector`,
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
  const d = getDepth(slug);

  const c = ACCENTS[v.accent];
  const Icon = iconFor(v.icon);
  const idx = vectors.findIndex((x) => x.slug === v.slug);
  const next = vectors[(idx + 1) % vectors.length];

  // Structured data: MedicalWebPage describes the topic for search engines and
  // LLM crawlers; FAQPage makes the Q&A block eligible for rich results.
  const medicalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${v.name} — The AIV Vector`,
    description: d?.directAnswer ?? v.summary,
    url: `https://aivirus.org/the-virus/${v.slug}`,
    about: {
      "@type": "MedicalCondition",
      name: v.name,
      alternateName: [`${v.name.toLowerCase()} addiction`, `${v.name.toLowerCase()} use disorder`],
      relevantSpecialty: "Psychiatry",
    },
    citation: v.sources.map((s) => s.label).join("; "),
    audience: { "@type": "Patient" },
    isPartOf: { "@type": "WebSite", name: "AIVirus.org", url: "https://aivirus.org" },
  };

  const faqSchema = d && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="flex-1 bg-[#050505] text-neutral-100 font-mono">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

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

      {/* Direct answer — the question people actually type, answered immediately.
          This is the block search engines and LLMs lift as the answer. */}
      {d && (
        <section className="max-w-5xl mx-auto px-6 pb-14">
          <div className={`bg-[#0a0a0a] border ${c.border} rounded-2xl p-7 md:p-9`}>
            <h2 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-4 ${c.strong}`}>
              &ldquo;{d.searchIntent}&rdquo;
            </h2>
            <p className="text-neutral-200 text-base md:text-lg leading-relaxed">{d.directAnswer}</p>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-6">
        <h2 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-5">The scale of it</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...v.stats, ...(d?.scale ?? [])].map((s, i) => (
            <div key={i} className={`bg-[#0a0a0a] border ${c.border} rounded-2xl p-7`}>
              <div className={`text-4xl md:text-5xl font-black ${c.strong} mb-3`}>{s.value}</div>
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

      {/* BIOLOGY FIRST — what this strain does to the four chemicals. This sits
          above the editorial "how it operates" section on purpose: the whole
          ecosystem argues hardware before software. */}
      {d && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-3">
            <Activity className={c.text} size={26} />
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              The biology: your four chemicals
            </h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl mb-9">
            Almost everything that feels good runs on four brain chemicals — Dopamine, Oxytocin, Serotonin, Endorphins.
            Every vector does two things to them: <span className={`font-bold ${c.text}`}>hijacks</span> some by flooding
            them through one artificial door, and <span className="text-neutral-200 font-bold">starves</span> the rest by
            crowding out the natural inputs that pay them out. Here is how {v.name.toLowerCase()} does it.
          </p>

          <DoseImpactChart items={d.dose} accent={v.accent} />

          <div className="mt-8 bg-[#0a0a0a] border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <p className="text-neutral-300 text-sm leading-relaxed max-w-2xl">
              <span className="text-emerald-400 font-bold">The repair is the same for every vector.</span> Rebuild the four
              chemicals with four daily inputs instead of one artificial one. That protocol is BIO 12, and the free journal
              tracks it.
            </p>
            <Link
              href="/bio12"
              className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-xl transition-colors"
            >
              The BIO 12 firewall <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* Signature stage of the universal pathway */}
      {d && (
        <section className="border-y border-white/10 bg-black/40">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-600 mb-3">
              Where this strain hits hardest on the 7-stage pathway
            </div>
            <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-5 ${c.strong}`}>
              {d.signatureStage.stage}
            </h2>
            <p className="max-w-3xl text-neutral-300 leading-relaxed">{d.signatureStage.body}</p>
            <Link
              href="/data#pathway"
              className="inline-flex items-center gap-1.5 mt-6 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              See all 7 stages <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}

      {/* Mechanisms */}
      <section className="max-w-5xl mx-auto px-6 py-16">
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

      {/* Self-check */}
      {d && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className={c.text} size={26} />
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">The self-check</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl mb-8">
            Six honest questions. This is not a diagnostic instrument and it produces no score — it is the set of
            questions people in recovery from this vector say they wish someone had asked them earlier.
          </p>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {d.selfCheck.map((q, i) => (
              <li key={i} className="flex items-start gap-4 bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
                <span className={`shrink-0 w-8 h-8 rounded-lg ${c.bg} ${c.border} border ${c.text} font-black text-sm flex items-center justify-center`}>
                  {i + 1}
                </span>
                <span className="text-neutral-200 text-sm leading-relaxed pt-1">{q}</span>
              </li>
            ))}
          </ol>
          <div className="mt-7 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
              If more than a couple of those landed, the 12-question scan will place you on the recovery horizon and hand
              you a starting protocol.
            </p>
            <Link
              href="/#diagnostic"
              className="shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-xl transition-colors"
            >
              Run the diagnostic <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* First seven days — biology before framework */}
      {d && (
        <section className="border-y border-white/10 bg-black/40">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="text-emerald-400" size={26} />
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">The first seven days</h2>
            </div>
            <p className="text-neutral-400 leading-relaxed max-w-3xl mb-9">
              Stabilize the hardware, then run the software. Nothing spiritual holds in a body that is exhausted,
              dehydrated, and running on a crashed reward system — so the biology comes first and the framework comes
              on day seven.
            </p>
            <ol className="flex flex-col gap-4">
              {d.firstSevenDays.map((s, i) => (
                <li key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-5">
                  <div className="sm:w-36 shrink-0">
                    <div className="text-[11px] font-black uppercase tracking-widest text-emerald-400">{s.day}</div>
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-tight mb-2">{s.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={JOURNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-sm py-4 px-7 rounded-xl transition-colors"
              >
                <BookOpen size={16} /> Get the free 90-day journal
              </a>
              {d.fellowship && (
                <a
                  href={d.fellowship.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-black uppercase tracking-widest text-sm py-4 px-7 rounded-xl transition-colors"
                >
                  <Users size={16} /> Find {d.fellowship.name}
                </a>
              )}
            </div>
            {d.fellowship && (
              <p className="text-neutral-600 text-xs mt-4 leading-relaxed">{d.fellowship.note}</p>
            )}
          </div>
        </section>
      )}

      {/* FAQ — rendered + emitted as FAQPage schema */}
      {d && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className={c.text} size={26} />
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              {v.name} — common questions
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {d.faqs.map((f, i) => (
              <details key={i} className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <h3 className="text-white font-bold text-base leading-snug">{f.q}</h3>
                  <span className={`shrink-0 ${c.text} text-2xl font-black leading-none group-open:rotate-45 transition-transform`}>+</span>
                </summary>
                <div className="px-6 pb-6 -mt-1">
                  <p className="text-neutral-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

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
            {v.name} is one vector of the same underlying virus — which means the same framework fights it. Rebuild the
            biology first, then run the 12 Steps: hand over the crashed system, run a deep scan of the wreckage, then
            apply daily security patches with other people. AAfiends turns that into a daily protocol.
          </p>
          <a
            href={AAFIENDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
          >
            Run the antivirus <ArrowRight size={16} />
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
          Behavioral-addiction prevalence varies with how each study defines and measures the behavior; those figures are
          shown as estimates with their specific source. Clinical figures come from SAMHSA, CDC, and NIDA. AIVirus.org is
          peer support and education, not medical advice.
        </p>
        <Link
          href="/data"
          className="inline-flex items-center gap-1.5 mt-6 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          All 10 vectors, every figure, one table <ArrowRight size={13} />
        </Link>
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
