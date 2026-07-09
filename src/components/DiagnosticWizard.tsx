"use client";

// 12-question host-susceptibility diagnostic (blueprint §5). Maps answers to one
// of 5 animal profiles, collects the sobriety date, then funnels into the app
// (aafiends.com) — the "run the antivirus" hand-off. Tactical dark palette:
// black canvas, crimson threat (#dc2626), emerald antivirus (#10b981). No neon.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Anchor, Compass, Navigation, Sprout, User, Users, Map, Ghost, Briefcase,
  Flame, BatteryLow, Brain, MessageSquare, Smartphone, PenTool, AlertTriangle, Brush,
  Table, Clipboard, Laptop, Server, HelpCircle, Gamepad2, Mail, Cpu, Repeat, Clock,
  Moon, Wrench, Infinity as InfinityIcon, Hourglass, Octagon, Bed, VenetianMask,
  Handshake, BarChart3, Megaphone, Bot, Heart, Home, BookOpen, CheckCircle2, ArrowRight,
  type LucideIcon,
} from "lucide-react";

const AAFIENDS = "https://aafiends.com";

type P = "A" | "B" | "C" | "D" | "E"; // Eagle, Elephant, Turtle, Chameleon, Tiger
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

const PROFILE: Record<P, { emoji: string; name: string; who: string; lie: string; fix: string }> = {
  A: { emoji: "🦅", name: "The Eagle", who: "The Founder", lie: "“It's a performance enhancer — use it to work longer.”", fix: "The Rest Mandate: track sleep & RHR; cut the terminal at curfew." },
  B: { emoji: "🐘", name: "The Elephant", who: "The Martyr", lie: "“Look at all you carry. You deserve an escape.”", fix: "The Boundary Toggle: did I say NO to protect my recovery today?" },
  C: { emoji: "🐢", name: "The Turtle", who: "The Escapist", lie: "“Sit in silence and the memories catch you. Numb out.”", fix: "Somatic grounding: 15-min walks, cold water, breath." },
  D: { emoji: "🦎", name: "The Chameleon", who: "The Validator", lie: "“You're boring sober. Take this so they'll accept you.”", fix: "Radical honesty log + anonymous service work." },
  E: { emoji: "🐅", name: "The Tiger", who: "The Saboteur", lie: "“Routine is boring. Blow it up to feel alive.”", fix: "Extreme friction: cold plunges, Zone 2, channel the charge." },
};

const box = "w-full max-w-xl mx-auto bg-[#09090b] border border-[#27272a] p-6 md:p-8 rounded-2xl";

export default function DiagnosticWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<"quiz" | "calibrate" | "result">("quiz");
  const [profile, setProfile] = useState<P>("A");
  const [sober, setSober] = useState("");

  const pick = (o: Opt) => {
    const next = { ...answers, [QUESTIONS[step].id]: o.value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) { setStep(step + 1); return; }
    const counts: Record<P, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    QUESTIONS.forEach((q) => { const v = next[q.id]; const opt = q.options.find((x) => x.value === v); if (opt) counts[opt.profile]++; });
    const top = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]) as P;
    setProfile(top); setPhase("calibrate");
  };

  const goApp = () => {
    const url = `${AAFIENDS}/onboarding?source=aivirus&profile=${encodeURIComponent(PROFILE[profile].name)}${sober ? `&sober=${sober}` : ""}`;
    window.location.href = url;
  };

  if (phase === "quiz") {
    const q = QUESTIONS[step];
    return (
      <div className={box}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.15 }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">{q.category}</span>
              <span className="text-xs font-mono text-[#dc2626] font-bold">Step {step + 1} / 12</span>
            </div>
            <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden mb-6">
              <div className="h-full bg-[#dc2626] transition-all duration-300" style={{ width: `${((step + 1) / 12) * 100}%` }} />
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
            {step > 0 && <button onClick={() => setStep(step - 1)} className="w-full text-center text-xs text-[#52525b] hover:text-[#a1a1aa] font-mono mt-4">&larr; Back</button>}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (phase === "calibrate") {
    return (
      <div className={box}>
        <div className="flex items-center gap-2 text-[#10b981] mb-4"><CheckCircle2 className="w-5 h-5" /><span className="text-xs font-mono uppercase tracking-wider font-bold">Scan Complete</span></div>
        <h3 className="text-xl font-bold text-[#fafafa] mb-1">Calibrate your dashboard</h3>
        <p className="text-sm text-[#a1a1aa] mb-6">One number powers your predictive "days sober" metrics.</p>
        <label className="block text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-2">Your sobriety date (optional)</label>
        <input type="date" value={sober} onChange={(e) => setSober(e.target.value)} className="w-full bg-[#0b0b0d] border border-[#27272a] text-[#fafafa] p-3 rounded-lg focus:outline-none focus:border-[#dc2626] text-sm font-mono mb-5" />
        <button onClick={() => setPhase("result")} className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-bold py-3.5 rounded-lg tracking-wider uppercase text-xs transition-colors">See your result &rarr;</button>
      </div>
    );
  }

  const p = PROFILE[profile];
  return (
    <div className={box}>
      <div className="text-center flex flex-col items-center gap-3">
        <div className="text-5xl">{p.emoji}</div>
        <div className="text-xs font-mono uppercase tracking-widest text-[#dc2626]">Primary host profile</div>
        <h3 className="text-2xl font-black text-[#fafafa]">{p.name} <span className="text-[#a1a1aa] font-bold text-lg">· {p.who}</span></h3>
        <p className="text-sm text-[#a1a1aa] italic max-w-md">The lie it tells you: {p.lie}</p>
        <div className="w-full bg-[#0b0b0d] border border-[#10b981]/30 rounded-xl p-4 text-left mt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#10b981] mb-1">Your remediation protocol</div>
          <p className="text-sm text-[#fafafa]">{p.fix}</p>
        </div>
        <button onClick={goApp} className="w-full mt-3 bg-[#10b981] hover:bg-emerald-600 text-black font-black py-4 rounded-lg tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-colors">
          Run the Antivirus — open your dashboard <ArrowRight size={16} />
        </button>
        <a href="https://aafiends.com/90rr" className="text-xs font-mono text-[#a1a1aa] hover:text-[#fafafa] uppercase tracking-widest">or start the free 90 R&amp;R journal &rarr;</a>
      </div>
    </div>
  );
}
