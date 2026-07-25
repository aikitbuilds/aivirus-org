import type { Metadata } from "next";
import Link from "next/link";
import { Biohazard, ArrowLeft, ArrowRight, ExternalLink, Database, Brain, Activity, ShieldCheck } from "lucide-react";
import EcosystemFooter from "@/components/EcosystemFooter";
import { HUB_ROWS, PATHWAY, NEURO } from "@/data/stats-hub";

export const metadata: Metadata = {
  title: "Addiction Statistics 2026 — All 10 Vectors, Sourced | AIVirus.org",
  description:
    "How many Americans are addicted, by type: alcohol, opioids, nicotine, cannabis, gambling, pornography, social media, shopping, work and gaming. Prevalence, economic cost and treatment gap for each — every figure sourced to SAMHSA, CDC, NIDA, NCPG or named peer-reviewed research.",
  alternates: { canonical: "https://aivirus.org/data" },
  keywords: [
    "addiction statistics", "addiction statistics 2026", "how many people are addicted",
    "behavioral addiction vs substance addiction", "addiction prevalence united states",
    "gambling addiction statistics", "social media addiction statistics", "alcohol use disorder statistics",
    "dopamine addiction explained", "nucleus accumbens addiction", "addiction economic cost",
  ],
  openGraph: {
    title: "Addiction Statistics — All 10 Vectors, Sourced",
    description:
      "Prevalence, economic cost and treatment gap across all ten addiction vectors. Every number traceable to a named public source.",
    url: "https://aivirus.org/data",
    siteName: "AIVirus.org",
    type: "article",
  },
};

// Dataset schema so this page is machine-readable as a citable statistics
// resource, plus FAQ schema for the questions people actually search.
const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "AIV Addiction Statistics — 10 Vectors",
  description:
    "Prevalence, economic cost and treatment gap across ten addiction vectors in the United States, compiled from SAMHSA, CDC, NIDA, NCPG and named peer-reviewed research.",
  url: "https://aivirus.org/data",
  creator: { "@type": "Organization", name: "AIVirus.org", url: "https://aivirus.org" },
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: ["Prevalence", "Economic cost", "Treatment gap"],
};

const HUB_FAQ = [
  {
    q: "What is the most common addiction in the United States?",
    a: "By number of people affected, nicotine — roughly 64.4 million Americans aged 12 and over currently use tobacco or nicotine products. Alcohol is the most prevalent diagnosed use disorder at about 28.9 million people. Among behavioral patterns, workaholism has the highest measured prevalence at roughly 14 to 15% of working adults, though it has no formal diagnosis.",
  },
  {
    q: "Are behavioral addictions real addictions?",
    a: "Two are formally recognized: gambling disorder is classified in the DSM-5 alongside substance use disorders, and gaming disorder is in the WHO's ICD-11. The others — social media, shopping, work, pornography — lack formal diagnoses, though research consistently finds compulsive patterns and real harm. Imaging work shows all of them engage the same mesolimbic dopamine pathway as substances.",
  },
  {
    q: "How does dopamine cause addiction?",
    a: "Addictive substances and behaviors flood the nucleus accumbens with dopamine far above the level natural rewards produce. The brain compensates by removing D2 dopamine receptors, which lowers your baseline and makes natural rewards feel flat. Meanwhile the prefrontal cortex — judgement and impulse control — is impaired, and seeking behavior migrates to the dorsal striatum where it runs as reflex rather than choice.",
  },
  {
    q: "Why do all addictions respond to the same 12-step framework?",
    a: "Because the underlying mechanism is the same regardless of the delivery vehicle. Alcoholics Anonymous, Narcotics Anonymous, Gamblers Anonymous, Sex Addicts Anonymous, Debtors Anonymous and Workaholics Anonymous all run the same protocol, because the operating system being compromised is identical across vectors.",
  },
  {
    q: "How much does addiction cost the United States annually?",
    a: "Measured costs exceed $700 billion a year across healthcare, lost productivity and criminal justice — including roughly $249 billion for alcohol and $168 billion for tobacco per NIDA, with the White House Council of Economic Advisers estimating $2.7 trillion for illicit opioids in 2023 alone. Behavioral addictions are largely unmeasured, so the true figure is higher.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HUB_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function RowGroup({ kind, label, blurb }: { kind: "substance" | "behavioral"; label: string; blurb: string }) {
  const rows = HUB_ROWS.filter((r) => r.kind === kind);
  return (
    <div className="mb-14">
      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{label}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-3xl">{blurb}</p>

      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.slug} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="lg:w-52 shrink-0">
                <Link
                  href={`/the-virus/${r.slug}`}
                  className="text-lg font-black text-white uppercase tracking-tight hover:text-red-400 transition-colors inline-flex items-center gap-1.5"
                >
                  {r.name} <ArrowRight size={14} className="opacity-50" />
                </Link>
                <div className="text-3xl font-black text-red-500 mt-2">{r.affected}</div>
                <div className="text-neutral-500 text-xs leading-relaxed mt-1">{r.affectedNote}</div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-1.5">Share of population</div>
                  <div className="text-neutral-200 text-sm font-bold">{r.percentPop}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-1.5">Annual economic cost</div>
                  <div className="text-neutral-200 text-sm font-bold">{r.economicCost}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-1.5">Treatment gap</div>
                  <div className="text-neutral-200 text-sm font-bold">{r.treatmentGap}</div>
                </div>
              </div>
            </div>

            {r.caveat && (
              <p className="text-neutral-500 text-xs leading-relaxed mt-5 pt-4 border-t border-white/5">
                <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px] mr-2">Note</span>
                {r.caveat}
              </p>
            )}

            <a
              href={r.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-600 hover:text-white transition-colors mt-4"
            >
              <ExternalLink size={12} /> {r.source}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DataHub() {
  return (
    <main className="flex-1 bg-[#050505] text-neutral-100 font-mono">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#050505]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Biohazard className="text-red-500 w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-black tracking-tight uppercase">AIVIRUS<span className="text-red-500">.ORG</span></span>
          </Link>
          <Link href="/the-virus" className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> The vectors
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-500/40 rounded px-3 py-2 mb-8">
          <Database size={14} /> The statistics hub · every figure sourced
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none mb-7">
          Addiction by <br /><span className="text-red-500">the numbers.</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-neutral-300 leading-relaxed mb-5">
          Ten vectors, one architecture. Below is the prevalence, economic cost and treatment gap for each — drawn from
          SAMHSA, the CDC, NIDA, the NCPG and named peer-reviewed research.
        </p>
        <p className="max-w-3xl text-base text-neutral-500 leading-relaxed">
          Nothing here is invented or estimated by us. Where studies genuinely disagree — which is normal for the
          behavioral vectors — we show the range and say so rather than picking the most alarming number. Quote it,
          cite it, check it.
        </p>
      </section>

      {/* Headline aggregate */}
      <section className="border-y border-white/10 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl md:text-5xl font-black text-red-500 mb-3">$700B+</div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              measured annual U.S. cost of addiction in healthcare, lost productivity and criminal justice — a figure
              that excludes the behavioral vectors entirely, because nobody measures them.
            </p>
            <a href="https://nida.nih.gov/research-topics/trends-statistics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-600 hover:text-white transition-colors mt-4">
              <ExternalLink size={12} /> NIDA
            </a>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-orange-500 mb-3">10</div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              vectors documented here — four chemical, six behavioral. Different payload, identical architecture:
              every one of them runs through the mesolimbic dopamine pathway.
            </p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-amber-500 mb-3">2</div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              behavioral vectors with formal clinical recognition — gambling disorder in the DSM-5, gaming disorder in
              the ICD-11. The absence of a diagnosis for the rest is a measurement gap, not evidence of safety.
            </p>
          </div>
        </div>
      </section>

      {/* The comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="text-red-400" size={26} />
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
            The full comparison
          </h2>
        </div>
        <p className="text-neutral-400 leading-relaxed max-w-3xl mb-12">
          Sorted by reach within each group. Tap any vector for its full profile — the biology, the self-check, and the
          first seven days.
        </p>

        <RowGroup
          kind="substance"
          label="Chemical vectors"
          blurb="A substance is the delivery mechanism. These have formal diagnoses, funded research, and comparatively reliable prevalence data."
        />
        <RowGroup
          kind="behavioral"
          label="Behavioral vectors"
          blurb="No substance at all — the reward loop itself is the payload. Prevalence figures here vary widely by definition and instrument, so treat them as estimates with the caveats attached."
        />
      </section>

      {/* The universal pathway */}
      <section id="pathway" className="border-y border-white/10 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-3">
            <Biohazard className="text-red-400" size={26} />
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              The 7-stage infection pathway
            </h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl mb-11">
            This sequence is identical whether the trigger is fentanyl, a slot machine, a notification, or a checkout
            button. It is the single strongest argument that addiction is a system compromise rather than a character
            defect.
          </p>

          <ol className="flex flex-col gap-3">
            {PATHWAY.map((p) => (
              <li key={p.n} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-red-500 to-orange-500" aria-hidden="true" />
                <div className="md:w-56 shrink-0 pl-2">
                  <div className="text-neutral-700 text-3xl font-black leading-none mb-2">{p.n}</div>
                  <div className="text-white font-black uppercase tracking-tight">{p.stage}</div>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-300 text-sm leading-relaxed mb-3">{p.biology}</p>
                  <p className="text-red-400/80 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    {p.terminal}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The neuroscience */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="text-red-400" size={26} />
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
            Why willpower isn&apos;t the variable
          </h2>
        </div>
        <p className="text-neutral-400 leading-relaxed max-w-3xl mb-11">
          &ldquo;You can&apos;t out-think it alone&rdquo; is not a slogan. Three physical changes occur in every case,
          and each one is documented.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {NEURO.map((n, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500" />
              <div className="text-neutral-700 text-3xl font-black mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-base font-black uppercase tracking-tight mb-3 text-red-400">{n.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">{n.body}</p>
              <a
                href={n.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-600 hover:text-white transition-colors"
              >
                <ExternalLink size={12} /> {n.source}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-white/10 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-10">
            Common questions
          </h2>
          <div className="flex flex-col gap-4">
            {HUB_FAQ.map((f, i) => (
              <details key={i} className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <h3 className="text-white font-bold text-base leading-snug">{f.q}</h3>
                  <span className="shrink-0 text-red-400 text-2xl font-black leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 -mt-1">
                  <p className="text-neutral-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              </details>
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
          Data is the diagnosis. <br /><span className="text-emerald-400">Now run the antivirus.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-neutral-300 leading-relaxed mb-10">
          Knowing the mechanism changes nothing on its own. The defense is the same for every vector on this page:
          rebuild the biology daily, then work the framework, with other people.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://aafiends.com/90rr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
          >
            Get the free 90-day journal <ArrowRight size={16} />
          </a>
          <Link
            href="/bio12"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
          >
            The BIO 12 firewall
          </Link>
        </div>
      </section>

      <EcosystemFooter />
    </main>
  );
}
