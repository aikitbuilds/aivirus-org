import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TrenchBoard from "@/components/TrenchBoard";
import EcosystemFooter from "@/components/EcosystemFooter";

export const metadata: Metadata = {
  title: "The Trench Repository — Crowdsourced Recovery Protocols | AIVirus.org",
  description:
    "Real, field-tested mitigation protocols from people in recovery: the threat, the system failure, the exact steps that restored the baseline. Crowdsourced, admin-reviewed, anonymous.",
  alternates: { canonical: "https://aivirus.org/trench" },
  openGraph: {
    title: "The Trench Repository — Crowdsourced Recovery Protocols",
    description: "The threat, the failure, the protocol that worked. Anonymous, reviewed, open-source.",
    url: "https://aivirus.org/trench",
    siteName: "AIVirus.org",
    type: "website",
  },
};

export default function TrenchPage() {
  return (
    <div className="bg-black text-[#fafafa] min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a1a1aa] hover:text-white w-fit">
          <ArrowLeft size={14} /> Back to the diagnostic
        </Link>
        <header className="flex flex-col gap-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#dc2626]">Open-source · No feeds, no comparison</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter">The Trench Repository</h1>
          <p className="text-[#a1a1aa] max-w-2xl leading-relaxed">
            When your firewall dropped and you patched it — write it down for the next person. Real protocols from the
            trench: the threat, the failure, the exact steps that restored the baseline. Anonymous and reviewed before it
            goes public.
          </p>
        </header>
        <TrenchBoard />
      </main>
      <div className="px-6 pb-6 max-w-5xl mx-auto"><EcosystemFooter /></div>
    </div>
  );
}
