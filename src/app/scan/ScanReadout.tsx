"use client";

// The readout. A CLIENT component for two reasons:
//
//  1. aivirus.org deploys as a pure static Next site (no `frameworksBackend` in
//     firebase.json, unlike aafiends.com). A server component reading request
//     data would silently push the whole site onto an SSR backend.
//  2. The result is read from sessionStorage rather than the URL, so it is only
//     ever available in the browser. See data/scan-result.ts for why.
//
// Bundle discipline: this imports only the light data — `vectors` (identity),
// `host-profiles`, and `vector-fellowships`. The heavy depth layer (FAQs,
// self-checks, 7-day protocols) stays out of the browser; we link to the vector
// page for that rather than duplicating it here.

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Biohazard, ArrowRight, ArrowLeft, ShieldCheck, Activity, Users,
  BookOpen, AlertTriangle, ExternalLink, Mail,
} from "lucide-react";
import { getVector } from "@/data/vectors";
import { getProfile, getStage } from "@/data/host-profiles";
import { getFellowship } from "@/data/vector-fellowships";
import { readScanResult, type ScanResult } from "@/data/scan-result";
import { iconFor, ACCENTS } from "@/lib/vector-styles";

const JOURNAL_URL = "https://aafiends.com/90rr";
const PROTOCOL_URL = "https://aafiends.com/protocol";

/**
 * Days sober from a yyyy-mm-dd string.
 *
 * Parsed as a LOCAL date, not via `new Date(iso)` — that treats a bare date as
 * UTC midnight, which in eastern timezones makes today's date look like the
 * future and silently hides the counter.
 */
function daysSober(iso: string | undefined): number | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const then = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(then.getTime())) return null;
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = startOfToday.getTime() - then.getTime();
  if (diff < 0) return null;
  return Math.round(diff / 86_400_000);
}

export default function ScanReadout() {
  // sessionStorage is browser-only, so the result is loaded after mount. The
  // `loaded` flag distinguishes "still reading" from "genuinely nothing there"
  // and prevents a hydration mismatch.
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setResult(readScanResult());
    setLoaded(true);
  }, []);

  const primary = getVector(result?.v ?? "");
  const secondary = getVector(result?.v2 ?? "");
  const profile = getProfile(result?.profile);
  const stage = getStage(result?.stage);
  const days = daysSober(result?.sober);
  const fellowship = getFellowship(primary?.slug);

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-600 animate-pulse">
          Compiling readout…
        </div>
      </div>
    );
  }

  // No stored result: a direct visit, a new tab, or a closed session. The data
  // intentionally does not survive the tab, so send them back to the scan.
  if (!primary) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <Biohazard className="text-red-500 w-12 h-12 mx-auto mb-6" />
        <h1 className="text-3xl font-black uppercase tracking-tight mb-4">No scan data</h1>
        <p className="text-neutral-400 leading-relaxed mb-4">
          This readout is generated from the diagnostic and is kept only in this browser tab — so it doesn&apos;t
          survive a closed tab, a new window, or a shared link. That&apos;s deliberate.
        </p>
        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
          The scan takes about 90 seconds to run again.
        </p>
        <Link
          href="/#diagnostic"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
        >
          Run the diagnostic <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const c = ACCENTS[primary.accent];
  const Icon = iconFor(primary.icon);
  const SecondaryIcon = secondary ? iconFor(secondary.icon) : null;

  return (
    <>
      {/* Readout header */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 rounded px-3 py-2 mb-8">
          <ShieldCheck size={14} /> Scan complete
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none mb-8">
          Your readout.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`bg-[#0a0a0a] border ${c.border} rounded-2xl p-6`}>
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-3">Primary vector</div>
            <div className="flex items-center gap-3">
              <Icon className={c.text} size={26} />
              <span className="text-xl font-black text-white uppercase tracking-tight">{primary.name}</span>
            </div>
            {secondary && SecondaryIcon && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <SecondaryIcon className="text-neutral-500" size={16} />
                <span className="text-xs text-neutral-400">
                  Secondary: <span className="text-neutral-200 font-bold">{secondary.name}</span>
                </span>
              </div>
            )}
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-3">Recovery horizon</div>
            <div className="text-xl font-black text-white uppercase tracking-tight">{stage.label}</div>
            <div className="text-xs text-neutral-500 mt-1">{stage.range}</div>
            {days !== null && (
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-neutral-400">
                <span className="text-emerald-400 font-black text-base">{days.toLocaleString()}</span> days logged
              </div>
            )}
          </div>

          {profile && (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-3">Host profile</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">{profile.emoji}</span>
                <span className="text-xl font-black text-white uppercase tracking-tight">{profile.name}</span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">{profile.who}</div>
            </div>
          )}
        </div>
      </section>

      {/* What this stage is actually for */}
      <section className="border-y border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-5">
            Your job right now
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">{stage.job}</p>
        </div>
      </section>

      {/* THE FIRST THREE MOVES — the actual payload */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="text-emerald-400" size={26} />
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
            Your first three moves
          </h2>
        </div>
        <p className="text-neutral-400 leading-relaxed max-w-3xl mb-10">
          Biology before framework. These are staged for{" "}
          <span className="text-white font-bold">{stage.label.toLowerCase()}</span> — not a generic checklist, and
          deliberately short. Three things you actually start beat twelve you won&apos;t.
        </p>

        <ol className="flex flex-col gap-4">
          {stage.moves.map((m, i) => (
            <li key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500" aria-hidden="true" />
              <div className="shrink-0 pl-2">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-black flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-white font-black uppercase tracking-tight mb-2">{m.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {profile && (
          <div className="mt-8 bg-[#0a0a0a] border border-white/10 rounded-2xl p-7">
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-4">
              And one specific to the {profile.name.replace("The ", "")}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4 italic">
              The lie this profile falls for: {profile.lie}
            </p>
            <div className="border-l-2 border-emerald-500/50 pl-4">
              <p className="text-neutral-200 text-sm leading-relaxed">{profile.fix}</p>
              <p className="text-neutral-500 text-xs leading-relaxed mt-2">
                The pillar you most reliably neglect:{" "}
                <span className="text-emerald-400 font-bold">{profile.weakPillar}</span>.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* EMAIL CAPTURE */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] p-8 md:p-11">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-emerald-400" size={24} />
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Keep the readout going
            </h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-2xl mb-8">
            One email a week: the biology, the research in plain English, and the Walk &amp; Talk podcast. No spam,
            nothing for sale, unsubscribe in one click. Written by someone in it, not a marketing team.
          </p>
          <div className="max-w-xl">
            <iframe
              src="https://aafiends.substack.com/embed"
              title="Subscribe to the AAfiends newsletter"
              width="100%"
              height="150"
              style={{ border: "1px solid #27272a", background: "transparent", borderRadius: "0.75rem" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* PRIMARY CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0a140f] border border-emerald-500/30 rounded-[1.5rem] p-8 md:p-12 flex flex-col gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <BookOpen size={28} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Now run the antivirus.
          </h2>
          <p className="text-neutral-300 leading-relaxed max-w-2xl">
            The 90-day journal turns all of this into about ten seconds a day — sleep, movement, meeting, mood, and one
            honest number. Free, printable, no signup, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={JOURNAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
            >
              Get the free 90-day journal <ArrowRight size={16} />
            </a>
            <a
              href={PROTOCOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors"
            >
              The BIO 12 protocol
            </a>
          </div>
        </div>
      </section>

      {/* Go deeper */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-5">Go deeper on your vector</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/the-virus/${primary.slug}`}
            className={`group bg-[#0a0a0a] border ${c.border} rounded-2xl p-6 hover:bg-white/[0.02] transition-colors`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon className={c.text} size={22} />
              <span className="text-lg font-black text-white uppercase tracking-tight">{primary.name}</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              The full profile: what it does to your four chemicals, the self-check, the first seven days, the sourced
              statistics, and the common questions.
            </p>
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${c.text}`}>
              Open the profile <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {secondary && SecondaryIcon ? (
            <Link
              href={`/the-virus/${secondary.slug}`}
              className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <SecondaryIcon className="text-neutral-400" size={22} />
                <span className="text-lg font-black text-white uppercase tracking-tight">{secondary.name}</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Your secondary vector. Same architecture, different payload — and the two usually reinforce each other.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                Open the profile <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ) : (
            <Link
              href="/data"
              className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Activity className="text-neutral-400" size={22} />
                <span className="text-lg font-black text-white uppercase tracking-tight">The data</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                All ten vectors compared: prevalence, economic cost, and treatment gap. Every figure sourced.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                Open the statistics <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          )}
        </div>

        {fellowship && (
          <a
            href={fellowship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between gap-4 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <Users className="text-emerald-400 shrink-0 mt-0.5" size={22} />
              <div>
                <div className="text-white font-black uppercase tracking-tight">Find {fellowship.name}</div>
                <p className="text-neutral-500 text-xs leading-relaxed mt-1">{fellowship.note}</p>
              </div>
            </div>
            <ExternalLink className="text-neutral-600 group-hover:text-white transition-colors shrink-0" size={16} />
          </a>
        )}
      </section>

      {/* Honesty block */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex gap-4">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h2 className="text-white font-black uppercase tracking-tight text-sm mb-2">What this is, and isn&apos;t</h2>
            <p className="text-neutral-500 text-xs leading-relaxed">
              This readout is a framing device built from your own answers — not a diagnosis, not a clinical instrument,
              and not medical advice. The host profiles name a pattern; they are not a measured category. Your answers
              were never sent to us: they are held in this browser tab only, are not in the page address, and are
              discarded when the tab closes. If you are physically dependent on alcohol or benzodiazepines, withdrawal
              can be dangerous, so talk to a doctor before stopping. In crisis, call or text 988. SAMHSA&apos;s free,
              confidential 24/7 helpline is 1-800-662-4357.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20 flex flex-wrap gap-4 justify-between items-center">
        <Link
          href="/#diagnostic"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} /> Run the scan again
        </Link>
        <Link
          href="/trench"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          Read what worked for others <ArrowRight size={13} />
        </Link>
      </section>
    </>
  );
}
