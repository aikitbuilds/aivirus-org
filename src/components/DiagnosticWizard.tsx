"use client";

// The vector-identification scan. Structure (blueprint §5 + the AIV research
// report's "Enhanced Diagnostic: Vector Identification"):
//
//   0. WHICH VECTOR(S) — the question the site exists to ask, and the one this
//      wizard previously never asked. Drives the whole tailored readout.
//   1-12. Host susceptibility → one of 5 animal profiles + the recovery stage.
//   13. Optional sobriety date.
//   → navigates to /scan, a real shareable URL that renders the full readout
//      server-side (so the 10 vectors' depth content never enters this bundle).
//
// Tactical dark palette: black canvas, crimson threat (#dc2626), emerald
// antivirus (#10b981). No neon.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { vectors } from "@/data/vectors";
import { iconFor } from "@/lib/vector-styles";
import type { ProfileKey, StageKey } from "@/data/host-profiles";
import { SCAN_KEY, type ScanResult } from "@/data/scan-result";
import {
  Shield, Anchor, Compass, Navigation, Sprout, User, Users, Map, Ghost, Briefcase,
  Flame, BatteryLow, Brain, MessageSquare, Smartphone, PenTool, AlertTriangle, Brush,
  Table, Clipboard, Laptop, Server, HelpCircle, Gamepad2, Mail, Cpu, Repeat, Clock,
  Moon, Wrench, Infinity as InfinityIcon, Hourglass, Octagon, Bed, VenetianMask,
  Handshake, BarChart3, Megaphone, Bot, Heart, Home, BookOpen, CheckCircle2, ArrowRight,
  Biohazard,
  type LucideIcon,
} from "lucide-react";

// Eagle, Elephant, Turtle, Chameleon, Tiger — defined once in host-profiles.
type P = ProfileKey;
interface Opt { icon: LucideIcon; label: string; value: string; profile: P; }
interface Q { id: number; text: string; category: string; options: Opt[]; }

const QUESTIONS: Q[] = [
  { id: 1, text: "Where are you operating in your recovery?", category: "The Recovery Horizon", options: [
    { icon: Shield, label: "In the Trench (0–90 days)", value: "trench", profile: "A" },
    { icon: Anchor, label: "Stabilizing (3–12 months)", value: "stabilizing", profile: "B" },
    { icon: Compass, label: "Solid Baseline (1–5 yrs)", value: "baseline", profile: "C" },
    { icon: Navigation, label: "Vanguard (5+ yrs)", value: "vanguard", profile: "D" } ] },
  { id: 2, text: "Your connection to the fellowship?", category: "The Network", options: [
    { icon: Sprout, label: "Brand new", value: "new", profile: "A" },
    { icon: User, label: "Attending, but isolated", value: "isolated", profile: "B" },
    { icon: Users, label: "Working steps / homegroup", value: "connected", profile: "C" },
    { icon: Map, label: "Sponsoring others", value: "mentor", profile: "D" } ] },
  { id: 3, text: "When your defenses drop, the main trigger?", category: "Your Doom-Loop", options: [
    { icon: Ghost, label: "Isolation & boredom", value: "isolation", profile: "C" },
    { icon: Briefcase, label: "Overworking & ego", value: "overwork", profile: "A" },
    { icon: Flame, label: "Anger & resentments", value: "resentment", profile: "E" },
    { icon: BatteryLow, label: "Physical exhaustion", value: "fatigue", profile: "B" } ] },
  { id: 4, text: "How do you dump your mental inventory?", category: "Cognitive Offload", options: [
    { icon: Brain, label: "Keep it in my head", value: "mental", profile: "A" },
    { icon: MessageSquare, label: "Talk to a sponsor", value: "verbal", profile: "B" },
    { icon: Smartphone, label: "Digital notes app", value: "digital", profile: "C" },
    { icon: PenTool, label: "Physical notebook", value: "analog", profile: "D" } ] },
  { id: 5, text: "The state of your physical space?", category: "Your Sanctuary", options: [
    { icon: AlertTriangle, label: "Chaotic environment", value: "chaos", profile: "E" },
    { icon: Brush, label: "Clearing space today", value: "clearing", profile: "B" },
    { icon: Table, label: "Multi-purpose space", value: "shared", profile: "C" },
    { icon: Clipboard, label: "Dedicated, clean desk", value: "clean", profile: "A" } ] },
  { id: 6, text: "Comfort with modern tech?", category: "Technical Scaffolding", options: [
    { icon: AlertTriangle, label: "Tech frustrates me", value: "scared", profile: "B" },
    { icon: Smartphone, label: "Smartphone only", value: "mobile", profile: "D" },
    { icon: Laptop, label: "Comfortable on web", value: "comfortable", profile: "C" },
    { icon: Server, label: "Power user / dev", value: "power", profile: "A" } ] },
  { id: 7, text: "Experience with AI?", category: "AI Fluency", options: [
    { icon: HelpCircle, label: "Never used it", value: "none", profile: "C" },
    { icon: Gamepad2, label: "Played around once", value: "casual", profile: "D" },
    { icon: Mail, label: "Occasional basic use", value: "moderate", profile: "B" },
    { icon: Cpu, label: "Daily / API", value: "fluent", profile: "A" } ] },
  { id: 8, text: "Your relationship with your screens?", category: "The Dopamine Mirage", options: [
    { icon: Repeat, label: "Constant doom-scroll", value: "scrolling", profile: "E" },
    { icon: Clock, label: "Lose track of time", value: "unaware", profile: "D" },
    { icon: Moon, label: "Strict nightly limits", value: "bounded", profile: "B" },
    { icon: Wrench, label: "Strictly a work tool", value: "utilitarian", profile: "A" } ] },
  { id: 9, text: "Biggest fear about recovery tech?", category: "Biggest Tech Fear", options: [
    { icon: Laptop, label: "Falling behind", value: "lagging", profile: "C" },
    { icon: Shield, label: "Anonymity compromise", value: "privacy", profile: "D" },
    { icon: AlertTriangle, label: "Trading addictions", value: "addiction", profile: "B" },
    { icon: Navigation, label: "No fears. Ready.", value: "ready", profile: "A" } ] },
  { id: 10, text: "Can you step away from task loops?", category: "The 60-Minute Rule", options: [
    { icon: InfinityIcon, label: "Obsessive perfectionist", value: "obsessive", profile: "E" },
    { icon: Hourglass, label: "Willing to learn timers", value: "willing", profile: "D" },
    { icon: Octagon, label: "Good at walking away", value: "disciplined", profile: "B" },
    { icon: Bed, label: "Sleep is priority", value: "circadian", profile: "A" } ] },
  { id: 11, text: "Willing to share telemetry with your group?", category: "The 12th-Step Sandbox", options: [
    { icon: VenetianMask, label: "Anonymous listener", value: "silent", profile: "C" },
    { icon: Handshake, label: "Hesitant but willing", value: "tentative", profile: "B" },
    { icon: BarChart3, label: "Comfortable sharing data", value: "open", profile: "D" },
    { icon: Megaphone, label: "Fully ready to build", value: "builder", profile: "E" } ] },
  { id: 12, text: "Build one tool right now — which?", category: "Your Architect Goal", options: [
    { icon: Bot, label: "AI sponsor / mirror", value: "mirror", profile: "D" },
    { icon: Heart, label: "Biometric dashboard", value: "biometric", profile: "E" },
    { icon: Home, label: "App for my homegroup", value: "homegroup", profile: "B" },
    { icon: BookOpen, label: "Just want to learn", value: "education", profile: "A" } ] },
];

// Host-profile display data now lives in @/data/host-profiles so the
// server-rendered /scan readout can use the same definitions.

const box = "w-full max-w-xl mx-auto bg-[#09090b] border border-[#27272a] p-6 md:p-8 rounded-2xl";

// Q1 is the recovery-horizon question; its value is carried to the readout so
// the "first moves" can be staged appropriately (someone at day 3 and someone
// at year 6 need different instructions).
// Q1's option values double as the stage key. This map exists to make that
// coupling explicit and to fail safe if Q1's wording ever changes.
const STAGE_FROM_Q1: Record<string, StageKey> = {
  trench: "trench",
  stabilizing: "stabilizing",
  baseline: "baseline",
  vanguard: "vanguard",
};

export default function DiagnosticWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<"vector" | "quiz" | "calibrate">("vector");
  const [picked, setPicked] = useState<string[]>([]);
  const [profile, setProfile] = useState<P>("A");
  const [sober, setSober] = useState("");

  // Up to two vectors: comorbidity is the norm, not the exception, and naming
  // the second one is often the more useful half of the result.
  const toggleVector = (slug: string) => {
    setPicked((cur) =>
      cur.includes(slug) ? cur.filter((s) => s !== slug) : cur.length >= 2 ? cur : [...cur, slug]
    );
  };

  const pick = (o: Opt) => {
    const next = { ...answers, [QUESTIONS[step].id]: o.value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) { setStep(step + 1); return; }
    const counts: Record<P, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    QUESTIONS.forEach((q) => { const v = next[q.id]; const opt = q.options.find((x) => x.value === v); if (opt) counts[opt.profile]++; });
    const top = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]) as P;
    setProfile(top); setPhase("calibrate");
  };

  // Results go to sessionStorage, NOT the query string.
  //
  // The obvious implementation is /scan?v=pornography&sober=2019-04-02 — and it
  // would be a privacy leak. Query strings land in Firebase Hosting access
  // logs, in browser history, and in cross-device history sync. For this
  // content specifically ("which addiction do you have" plus a sobriety date)
  // that is not acceptable, and a shareable readout URL is a liability here
  // rather than a feature. sessionStorage keeps it on the device, dies with the
  // tab, and lets the privacy promise on this page actually be true.
  const goResult = () => {
    const payload: ScanResult = {
      v: picked[0],
      v2: picked[1],
      profile,
      stage: STAGE_FROM_Q1[answers[1] ?? ""] ?? "trench",
      sober: sober || undefined,
    };
    try {
      sessionStorage.setItem(SCAN_KEY, JSON.stringify(payload));
    } catch {
      // Private-browsing modes can throw on write. The readout degrades to its
      // "no scan data" state, which sends the person back here — acceptable.
    }
    router.push("/scan");
  };

  /* ---------- PHASE 0: which vector(s) ---------- */
  if (phase === "vector") {
    return (
      <div className={box}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">Vector identification</span>
          <span className="text-xs font-mono text-[#dc2626] font-bold">Step 1 / 13</span>
        </div>
        <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden mb-6">
          <div className="h-full bg-[#dc2626] transition-all duration-300" style={{ width: `${(1 / 13) * 100}%` }} />
        </div>

        <h3 className="text-lg font-bold text-[#fafafa] mb-1">Which one is running you?</h3>
        <p className="text-sm text-[#a1a1aa] mb-5">
          Pick one, or two if they travel together — most do. Your answers stay in this browser tab and are never sent
          to us.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
          {vectors.map((v) => {
            const Icon = iconFor(v.icon);
            const on = picked.includes(v.slug);
            const order = picked.indexOf(v.slug);
            return (
              <button
                key={v.slug}
                onClick={() => toggleVector(v.slug)}
                aria-pressed={on}
                className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-150 text-center ${
                  on
                    ? "bg-[#dc2626]/10 border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                    : "bg-[#0b0b0d] border-[#27272a] hover:border-[#52525b]"
                }`}
              >
                {on && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#dc2626] text-white text-[9px] font-black flex items-center justify-center">
                    {order + 1}
                  </span>
                )}
                <Icon className={`w-6 h-6 ${on ? "text-[#dc2626]" : "text-[#a1a1aa]"}`} />
                <span className="text-[11px] font-medium text-[#fafafa] leading-tight">{v.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setPhase("quiz")}
          disabled={picked.length === 0}
          className="w-full bg-[#dc2626] hover:bg-red-700 disabled:bg-[#27272a] disabled:text-[#52525b] disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg tracking-wider uppercase text-xs transition-colors flex items-center justify-center gap-2"
        >
          {picked.length === 0 ? "Select at least one" : "Continue"}
          {picked.length > 0 && <ArrowRight size={14} />}
        </button>
        <p className="text-center text-[11px] text-[#52525b] font-mono mt-3 leading-relaxed">
          Not sure? Pick the one you&apos;d least like to explain to someone.
        </p>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = QUESTIONS[step];
    return (
      <div className={box}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.15 }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">{q.category}</span>
              <span className="text-xs font-mono text-[#dc2626] font-bold">Step {step + 2} / 13</span>
            </div>
            <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden mb-6">
              <div className="h-full bg-[#dc2626] transition-all duration-300" style={{ width: `${((step + 2) / 13) * 100}%` }} />
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-6">{q.text}</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {q.options.map((o) => { const Icon = o.icon; return (
                <button key={o.value} onClick={() => pick(o)}
                  className="flex flex-col items-center justify-center gap-3 p-5 md:p-6 bg-[#0b0b0d] border border-[#27272a] rounded-xl hover:border-[#dc2626] hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] transition-all duration-150 text-center aspect-square group">
                  <Icon className="w-7 h-7 text-[#a1a1aa] group-hover:text-[#dc2626] transition-colors" />
                  <span className="text-xs font-medium text-[#fafafa] leading-tight">{o.label}</span>
                </button> ); })}
            </div>
            <button
              onClick={() => (step > 0 ? setStep(step - 1) : setPhase("vector"))}
              className="w-full text-center text-xs text-[#52525b] hover:text-[#a1a1aa] font-mono mt-4"
            >
              &larr; Back
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* ---------- FINAL: optional sobriety date, then the readout ---------- */
  const primary = vectors.find((v) => v.slug === picked[0]);
  const PrimaryIcon = primary ? iconFor(primary.icon) : Biohazard;

  return (
    <div className={box}>
      <div className="flex items-center gap-2 text-[#10b981] mb-4">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-xs font-mono uppercase tracking-wider font-bold">Scan complete</span>
      </div>

      {primary && (
        <div className="flex items-center gap-3 bg-[#0b0b0d] border border-[#dc2626]/40 rounded-xl p-4 mb-6">
          <PrimaryIcon className="w-7 h-7 text-[#dc2626] shrink-0" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#52525b]">Primary vector detected</div>
            <div className="text-sm font-black text-[#fafafa] uppercase tracking-tight">
              {primary.name}
              {picked[1] && (
                <span className="text-[#a1a1aa] font-bold">
                  {" "}+ {vectors.find((v) => v.slug === picked[1])?.name}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-3">Final step</div>
      <h3 className="text-xl font-bold text-[#fafafa] mb-1">One last thing</h3>
      <p className="text-sm text-[#a1a1aa] mb-6">
        Your sobriety date, if you have one — it just adds a day count to the readout. Like everything else here, it
        stays in this browser tab and is never sent to us.
      </p>
      <label htmlFor="sober-date" className="block text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-2">
        Sobriety date (optional)
      </label>
      <input
        id="sober-date"
        type="date"
        value={sober}
        onChange={(e) => setSober(e.target.value)}
        className="w-full bg-[#0b0b0d] border border-[#27272a] text-[#fafafa] p-3 rounded-lg focus:outline-none focus:border-[#dc2626] text-sm font-mono mb-5"
      />
      <button
        onClick={goResult}
        className="w-full bg-[#10b981] hover:bg-emerald-600 text-black font-black py-4 rounded-lg tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-colors"
      >
        See your readout <ArrowRight size={16} />
      </button>
      <button
        onClick={() => { setPhase("quiz"); setStep(QUESTIONS.length - 1); }}
        className="w-full text-center text-xs text-[#52525b] hover:text-[#a1a1aa] font-mono mt-4"
      >
        &larr; Back
      </button>
    </div>
  );
}
