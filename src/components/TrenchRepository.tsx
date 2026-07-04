"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Terminal, CheckCircle2, ShieldX, Skull } from "lucide-react";

// Mock data representing what would be fetched from the Notion API
const MOCK_NOTION_LOGS = [
  {
    id: "log_1",
    threatProfile: "Isolation/Boredom",
    systemFailure: "Friday night alone, scrolled Instagram for 2 hours.",
    mitigationProtocol: "Forced a 10-minute cold shower, then logged onto an online A.A. meeting.",
    result: "Baseline Restored",
    date: "2026-06-25",
  },
  {
    id: "log_2",
    threatProfile: "Overworking/Ego",
    systemFailure: "Skipped 3 consecutive meetings to finish a project, felt entitled to a drink.",
    mitigationProtocol: "Called sponsor, admitted ego trip, drove immediately to the 8PM meeting.",
    result: "Baseline Restored",
    date: "2026-06-26",
  },
  {
    id: "log_3",
    threatProfile: "Anger/Resentments",
    systemFailure: "Fight with spouse, stormed out of the house.",
    mitigationProtocol: "Sat in car, played the tape forward. Wrote out a resentment inventory on my phone.",
    result: "Escalated to Sponsor",
    date: "2026-06-27",
  },
  {
    id: "log_4",
    threatProfile: "Physical Exhaustion",
    systemFailure: "Slept 3 hours for two nights. Brain fog led to severe cravings.",
    mitigationProtocol: "Canceled all non-essential tasks. Slept for 10 hours. No major decisions.",
    result: "Baseline Restored",
    date: "2026-06-28",
  }
];

export default function TrenchRepository() {
  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "Isolation/Boredom": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      case "Overworking/Ego": return "text-amber-400 border-amber-400/30 bg-amber-400/10";
      case "Anger/Resentments": return "text-rose-400 border-rose-400/30 bg-rose-400/10";
      case "Physical Exhaustion": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      default: return "text-neutral-400 border-neutral-400/30 bg-neutral-400/10";
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "Baseline Restored": return <CheckCircle2 className="text-emerald-400" size={16} />;
      case "Escalated to Sponsor": return <ShieldAlert className="text-amber-400" size={16} />;
      case "Still in Deficit": return <ShieldX className="text-rose-400" size={16} />;
      case "Relapse": return <Skull className="text-red-600" size={16} />;
      default: return <Terminal className="text-neutral-400" size={16} />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12">
      <div className="mb-12 flex flex-col items-start gap-4 border-l-4 border-[#00f0ff] pl-6">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
          The Trench Repository
        </h2>
        <p className="text-neutral-400 font-mono text-sm uppercase tracking-widest max-w-2xl leading-relaxed">
          Open-Source Mitigation Protocols. Crowdsourced system failures and the exact terminal commands used to restore the baseline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]">
        {MOCK_NOTION_LOGS.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col p-6 rounded-2xl border border-white/5 bg-[#0a0a0f] hover:bg-[#111116] transition-colors shadow-xl ${
              index === 0 ? "md:col-span-2 md:row-span-2" : 
              index === 3 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border ${getThreatColor(log.threatProfile)}`}>
                {log.threatProfile}
              </span>
              <span className="text-[10px] font-mono text-neutral-600">{log.date}</span>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              <div>
                <h4 className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">System Failure</h4>
                <p className={`text-white font-medium ${index === 0 ? "text-xl" : "text-sm"}`}>
                  {log.systemFailure}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Mitigation Protocol</h4>
                <p className={`text-neutral-300 font-mono ${index === 0 ? "text-sm" : "text-xs"}`}>
                  &gt; {log.mitigationProtocol}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Result:</span>
              <div className="flex items-center gap-2">
                {getResultIcon(log.result)}
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">{log.result}</span>
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.a 
          href="https://tally.so/placeholder" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-[#00f0ff]/30 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/60 transition-colors cursor-pointer group"
        >
          <Terminal size={32} className="text-[#00f0ff] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-black uppercase tracking-widest mb-2">Upload Telemetry</h3>
          <p className="text-xs text-[#00f0ff]/60 text-center font-mono">Submit a mitigation protocol to the global repository.</p>
        </motion.a>
      </div>
    </div>
  );
}
