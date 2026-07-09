import Link from "next/link";
import { ArrowRight, ShieldAlert, ShieldCheck, Activity, Cpu, HeartPulse } from "lucide-react";
import DiagnosticWizard from "@/components/DiagnosticWizard";
import EcosystemFooter from "@/components/EcosystemFooter";
import { vectors } from "@/data/vectors";

const AAFIENDS = "https://aafiends.com";

export default function Home() {
  return (
    <div className="bg-black text-[#fafafa]">
      {/* HERO / MANIFESTO */}
      <section className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-[#09090b] border border-[#27272a] px-3 py-1 rounded-full text-[11px] font-mono text-[#dc2626] uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" /> Status: Critical system infection
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.95] mb-4">
          YOU AREN&apos;T WEAK.<br /><span className="text-[#dc2626]">YOU ARE INFECTED.</span>
        </h1>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#a1a1aa] mb-8">Data over denial &middot; Starve the virus</p>
        <p className="text-lg text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto mb-10">
          You don&apos;t have a willpower problem. You have a system infection. Like any virus, the
          <span className="text-[#fafafa] font-semibold"> Addiction Intelligence Virus (AIV)</span> has colonized your
          nervous system, rewritten your survival coding, and hijacked your deepest instincts. The only way to win is to
          treat the sickness, out-system the malware, and join the network.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#diagnostic" className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs px-6 py-4 rounded-lg transition-colors">
            Run the 12-question scan <ArrowRight size={16} />
          </a>
          <a href={AAFIENDS} className="inline-flex items-center gap-2 border border-[#27272a] hover:border-[#10b981] text-[#fafafa] font-black uppercase tracking-widest text-xs px-6 py-4 rounded-lg transition-colors">
            Run the antivirus (the app)
          </a>
        </div>
      </section>

      {/* SICKNESS vs ANTIVIRUS */}
      <section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
        <div className="bg-[#09090b] border border-[#27272a] rounded-2xl p-7 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#dc2626]/10 rounded-full blur-3xl" />
          <div className="flex items-center gap-2 mb-3"><ShieldAlert className="text-[#dc2626]" size={20} /><h2 className="text-lg font-black uppercase tracking-wide text-[#dc2626] font-mono">The parasitic sickness (AIV)</h2></div>
          <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">A twofold illness. The <b className="text-[#fafafa]">physical allergy</b>: once the trigger is in your system, a hardware loop demands more, bypassing logic. The <b className="text-[#fafafa]">mental obsession</b>: in abstinence it scans for H.A.L.T. openings and whispers in your own voice that &quot;this time is different.&quot;</p>
          <ul className="space-y-1.5 text-xs font-mono text-[#a1a1aa]">
            {["D2 dopamine receptor downregulation", "Prefrontal cortex executive shutdown", "Habit hardwired into the dorsal striatum"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-[#09090b] border border-[#27272a] rounded-2xl p-7 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#10b981]/10 rounded-full blur-3xl" />
          <div className="flex items-center gap-2 mb-3"><ShieldCheck className="text-[#10b981]" size={20} /><h2 className="text-lg font-black uppercase tracking-wide text-[#10b981] font-mono">The active antivirus (the app)</h2></div>
          <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">You can&apos;t debug an infected system with its own compromised drive. <b className="text-[#fafafa]">AAfiends</b> is the automated scanner &mdash; digitizing the Step-10 daily inventory, tracking your biology, and forcing network connection.</p>
          <ul className="space-y-1.5 text-xs font-mono text-[#a1a1aa]">
            {["Frictionless daily telemetry logging", "Passive biometric wearable syncing", "Automated sponsor & grid alerts"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <section id="diagnostic" className="max-w-4xl mx-auto px-6 py-14 scroll-mt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight mb-2">Run the diagnostic</h2>
          <p className="text-sm text-[#a1a1aa]">Identify your susceptibility and primary host profile in about 60 seconds.</p>
        </div>
        <DiagnosticWizard />
      </section>

      {/* THE 10 VECTORS */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#52525b] mb-1">Polymorphic &mdash; one virus, ten strains</div>
            <h2 className="text-2xl font-black tracking-tight">The 10 vectors of infection</h2>
          </div>
          <Link href="/the-virus" className="text-xs font-mono uppercase tracking-widest text-[#dc2626] hover:text-white">Open the full threat index &rarr;</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vectors.map((v, i) => (
            <Link key={v.slug} href={`/the-virus/${v.slug}`}
              className="group bg-[#09090b] border border-[#27272a] hover:border-[#dc2626] rounded-xl p-4 transition-colors">
              <div className="text-[10px] font-mono text-[#52525b] mb-1">Vector_{String(i + 1).padStart(2, "0")}</div>
              <div className="text-sm font-black text-[#fafafa] group-hover:text-[#dc2626] transition-colors uppercase tracking-wide">{v.name}</div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed mt-1">{v.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENCH REPOSITORY */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-[#09090b] border border-[#27272a] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#dc2626] mb-1">Crowdsourced immunity</div>
            <h2 className="text-2xl font-black tracking-tight">The Trench Repository</h2>
            <p className="text-sm text-[#a1a1aa] max-w-xl mt-1">Real, field-tested mitigation protocols &mdash; the threat, the failure, the fix that worked. Anonymous and reviewed.</p>
          </div>
          <Link href="/trench" className="shrink-0 inline-flex items-center gap-2 border border-[#27272a] hover:border-[#dc2626] text-[#fafafa] font-black uppercase tracking-widest text-xs px-6 py-4 rounded-lg transition-colors">Open the repository &rarr;</Link>
        </div>
      </section>

      {/* HERO POEM */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-[#09090b] border border-[#27272a] rounded-2xl p-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#dc2626] mb-4">The symbiote on my shoulder</div>
          <pre className="text-[13px] md:text-sm text-[#d4d4d8] font-mono leading-relaxed whitespace-pre-wrap">I thought I was the boss of me, the captain of the ship,
Who only needed one quick drink to let the tension slip.
But there&apos;s a heavy, dark companion riding on my back,
A sneaky, slimy symbiote preparing to attack.

So how do I defeat a bug that uses my own voice?
I plug into the Fellowship and make a better choice.
I hand the master keyboard to the Grand Architect Divine,
And track my daily habits just to hold the baseline fine.</pre>
        </div>
      </section>

      {/* ECOSYSTEM FUNNEL */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-tight">The tripartite firewall</h2>
          <p className="text-sm text-[#a1a1aa]">The threat here. The software and the engine, one tap away.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <a href={AAFIENDS} className="bg-[#09090b] border border-[#27272a] hover:border-[#10b981] rounded-2xl p-6 transition-colors">
            <Cpu className="text-[#10b981] mb-3" size={22} />
            <div className="text-sm font-black uppercase tracking-wide">AAfiends.com</div>
            <p className="text-xs text-[#a1a1aa] mt-1">The antivirus. Daily telemetry, the AI Mirror, chips &amp; rewards.</p>
          </a>
          <a href="https://racefiends.com" className="bg-[#09090b] border border-[#27272a] hover:border-[#dc2626] rounded-2xl p-6 transition-colors">
            <HeartPulse className="text-[#dc2626] mb-3" size={22} />
            <div className="text-sm font-black uppercase tracking-wide">RaceFiends.com</div>
            <p className="text-xs text-[#a1a1aa] mt-1">The engine. Rebuild dopamine through friction and stakes.</p>
          </a>
          <a href="https://aafiends.com/90rr" className="bg-[#09090b] border border-[#27272a] hover:border-[#10b981] rounded-2xl p-6 transition-colors">
            <Activity className="text-[#10b981] mb-3" size={22} />
            <div className="text-sm font-black uppercase tracking-wide">90 R&amp;R Journal</div>
            <p className="text-xs text-[#a1a1aa] mt-1">The free printable protocol for the first 90 days.</p>
          </a>
        </div>
      </section>

      <div className="px-6 pb-6"><EcosystemFooter /></div>
    </div>
  );
}
