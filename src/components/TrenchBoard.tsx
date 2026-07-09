"use client";

// The Trench Repository — a crowdsourced, admin-approved wiki of real mitigation
// protocols (blueprint §6). aivirus.org has no backend of its own, so this reads
// approved logs from and submits pending logs to the aafiends API (the ecosystem
// backend). Seed logs render if the API is unreachable, so the wall is never empty.

import { useEffect, useState } from "react";
import { ShieldAlert, Terminal, CheckCircle2, Send, Loader2, Plus } from "lucide-react";

const API = "https://aafiends.com/api/trench";

interface Log { id: string; authorAlias: string; threatProfile: string; systemFailure: string; mitigationProtocol: string; result: string; createdAt: string | null; }

const SEED: Log[] = [
  { id: "s1", authorAlias: "Initiate_382", threatProfile: "Isolation / Boredom", systemFailure: "Friday night alone; scrolled for two hours as the craving built.", mitigationProtocol: "10-minute cold shower, then logged onto an online A.A. meeting.", result: "Baseline restored", createdAt: "2026-06-25T20:00:00Z" },
  { id: "s2", authorAlias: "Vanguard_07", threatProfile: "Overworking / Ego", systemFailure: "Skipped 3 meetings to ship a project; felt entitled to a drink.", mitigationProtocol: "Called sponsor, admitted the ego trip, drove straight to the 8 PM meeting.", result: "Baseline restored", createdAt: "2026-06-26T20:00:00Z" },
  { id: "s3", authorAlias: "Turtle_19", threatProfile: "Anger / Resentment", systemFailure: "Fight with spouse; stormed out of the house.", mitigationProtocol: "Sat in the car, played the tape forward, wrote a resentment inventory on my phone.", result: "Escalated to sponsor", createdAt: "2026-06-27T20:00:00Z" },
  { id: "s4", authorAlias: "Eagle_44", threatProfile: "Physical Exhaustion", systemFailure: "Two nights of 3-hour sleep; brain fog spiked cravings.", mitigationProtocol: "Canceled non-essentials, slept 10 hours, made no major decisions.", result: "Baseline restored", createdAt: "2026-06-28T20:00:00Z" },
];

function threatColor(t: string) {
  const s = t.toLowerCase();
  if (s.includes("isolation") || s.includes("bored")) return "text-sky-400 border-sky-400/30 bg-sky-400/5";
  if (s.includes("ego") || s.includes("work")) return "text-amber-400 border-amber-400/30 bg-amber-400/5";
  if (s.includes("anger") || s.includes("resent")) return "text-rose-400 border-rose-400/30 bg-rose-400/5";
  if (s.includes("exhaust") || s.includes("fatigue") || s.includes("sleep")) return "text-purple-400 border-purple-400/30 bg-purple-400/5";
  return "text-[#a1a1aa] border-[#27272a] bg-white/[0.02]";
}

export default function TrenchBoard() {
  const [logs, setLogs] = useState<Log[]>(SEED);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ authorAlias: "", threatProfile: "", systemFailure: "", mitigationProtocol: "", result: "", website: "" });
  const set = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(API, { cache: "no-store" });
        if (r.ok) { const d = await r.json(); if (Array.isArray(d.logs) && d.logs.length) setLogs(d.logs); }
      } catch { /* keep seed */ }
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true); setErr("");
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { setDone(true); setForm({ authorAlias: "", threatProfile: "", systemFailure: "", mitigationProtocol: "", result: "", website: "" }); }
      else { const d = await r.json().catch(() => ({})); setErr(d.error || "Submission failed."); }
    } catch { setErr("Couldn't reach the repository. Try again."); }
    setSending(false);
  };

  const input = "w-full bg-[#0b0b0d] border border-[#27272a] text-[#fafafa] p-3 rounded-lg text-sm focus:outline-none focus:border-[#dc2626] placeholder:text-[#52525b]";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#52525b]">Crowdsourced field protocols · admin-reviewed</div>
          <h2 className="text-2xl font-black tracking-tight text-[#fafafa]">The Trench Repository</h2>
        </div>
        <button onClick={() => { setOpen((v) => !v); setDone(false); }}
          className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={15} /> Log a protocol
        </button>
      </div>

      {open && (
        done ? (
          <div className="bg-[#09090b] border border-[#10b981]/30 rounded-2xl p-6 text-center">
            <CheckCircle2 className="mx-auto text-[#10b981] mb-2" size={32} />
            <p className="text-sm text-[#fafafa] font-bold">Logged for review.</p>
            <p className="text-xs text-[#a1a1aa] mt-1">Approved protocols appear on the wall. Thanks for arming the next person.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-[#09090b] border border-[#27272a] rounded-2xl p-5 md:p-6 grid gap-3">
            <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} className="hidden" aria-hidden />
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={input} placeholder="Alias (e.g. Initiate_382)" value={form.authorAlias} onChange={(e) => set("authorAlias", e.target.value)} />
              <input className={input} placeholder="Threat profile (e.g. Isolation / Boredom)" value={form.threatProfile} onChange={(e) => set("threatProfile", e.target.value)} required />
            </div>
            <input className={input} placeholder="System failure — what happened (the trigger + response)" value={form.systemFailure} onChange={(e) => set("systemFailure", e.target.value)} />
            <textarea className={`${input} resize-none`} rows={2} placeholder="Mitigation protocol — the exact steps you ran" value={form.mitigationProtocol} onChange={(e) => set("mitigationProtocol", e.target.value)} required />
            <input className={input} placeholder="Result (e.g. Baseline restored in 20 minutes)" value={form.result} onChange={(e) => set("result", e.target.value)} />
            {err && <p className="text-xs text-[#dc2626]">{err}</p>}
            <button type="submit" disabled={sending} className="justify-self-start inline-flex items-center gap-2 bg-[#10b981] hover:bg-emerald-600 disabled:opacity-50 text-black font-black uppercase tracking-widest text-xs px-5 py-2.5 rounded-lg transition-colors">
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Submit for review
            </button>
            <p className="text-[10px] text-[#52525b] font-mono">Anonymous. No feeds, no comparison — just protocols. Reviewed before it goes public.</p>
          </form>
        )
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {logs.map((l) => (
          <div key={l.id} className="bg-[#09090b] border border-[#27272a] rounded-xl p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${threatColor(l.threatProfile)}`}>{l.threatProfile}</span>
              <span className="text-[10px] font-mono text-[#52525b]">{l.authorAlias}</span>
            </div>
            {l.systemFailure && <div className="flex gap-2 text-xs text-[#a1a1aa]"><ShieldAlert size={13} className="text-[#dc2626] shrink-0 mt-0.5" /><span>{l.systemFailure}</span></div>}
            <div className="flex gap-2 text-xs text-[#e5e5e5]"><Terminal size={13} className="text-[#10b981] shrink-0 mt-0.5" /><span>{l.mitigationProtocol}</span></div>
            {l.result && <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#10b981] uppercase tracking-wide mt-0.5"><CheckCircle2 size={12} /> {l.result}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
