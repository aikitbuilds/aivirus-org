import type { Metadata } from "next";
import Link from "next/link";
import { Biohazard, RotateCcw } from "lucide-react";
import EcosystemFooter from "@/components/EcosystemFooter";
import ScanReadout from "./ScanReadout";

// A personalized, parameter-driven readout: useful to the reader, thin and
// duplicative to a crawler. Kept out of the index deliberately — the vector
// pages are what should rank, and this page's content is assembled from them.
export const metadata: Metadata = {
  title: "Your scan readout | AIVirus.org",
  description:
    "Your vector, your stage, and the first three moves — biology first. Generated from the 12-question AIV diagnostic.",
  robots: { index: false, follow: true },
};

export default function ScanPage() {
  return (
    <main className="flex-1 bg-[#050505] text-neutral-100 font-mono">
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#050505]/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Biohazard className="text-red-500 w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-black tracking-tight uppercase">
              AIVIRUS<span className="text-red-500">.ORG</span>
            </span>
          </Link>
          <Link
            href="/#diagnostic"
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <RotateCcw size={13} /> Re-run
          </Link>
        </div>
      </header>

      {/* The readout hydrates from sessionStorage, so this page prerenders as a
          static shell and fills in on the client. No Suspense boundary needed —
          nothing here reads request data. */}
      <ScanReadout />

      <EcosystemFooter />
    </main>
  );
}
