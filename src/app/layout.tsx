import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aivirus.org"),
  title: "AIVirus.org — System Infection Detected | The Alcohol Intelligence Virus",
  description: "You don't have a willpower problem. You have a system infection. The Addiction Intelligence Virus (AIV) hacks your operating system — across 10 vectors from alcohol and opioids to gambling, pornography, and gaming. Run the 12-question diagnostic and get your daily protocol.",
  keywords: ["can't stop drinking", "addiction intelligence virus", "alcohol intelligence virus", "12 steps alcoholism", "alcohol addiction diagnostic", "why can't I stop drinking", "types of addiction", "behavioral addiction", "gambling addiction", "porn addiction", "gaming disorder", "social media addiction"],
  openGraph: {
    title: "AIVirus.org — System Infection Detected",
    description: "You don't have a willpower problem. You have a system infection. Run the 12-question diagnostic.",
    url: "https://aivirus.org",
    siteName: "AIVirus.org",
    images: ["/zombie_hero.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIVirus.org — System Infection Detected",
    description: "You don't have a willpower problem. You have a system infection. Run the 12-question diagnostic.",
    images: ["/zombie_hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            name: "Addiction Intelligence Virus (AIV)",
            alternateName: "Substance Use Disorder and Behavioral Addiction",
            description: "Addiction framed as a biological hijack of the brain's reward circuitry — altering dopamine D2 receptor density and prefrontal control, driving compulsory behavior.",
            associatedAnatomy: { "@type": "AnatomicalStructure", name: "Nucleus Accumbens and Prefrontal Cortex" },
            possibleTreatment: { "@type": "MedicalTherapy", name: "12-Step Recovery and Somatic Reconditioning" },
            subjectOf: { "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Addiction Intelligence Virus (AIV)?", acceptedAnswer: { "@type": "Answer", text: "AIV is a neurobiological model framing addiction as an invasive hijack of the body's dopamine pathways — not a moral or willpower failure." } }] },
          }) }}
        />
        <header className="sticky top-0 z-50 border-b border-[#27272a] bg-black/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" />
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-[#fafafa]">AIVirus.org</span>
            </a>
            <a href="https://aafiends.com" className="bg-[#dc2626] hover:bg-red-700 text-white font-bold text-[11px] uppercase font-mono tracking-widest px-4 py-2 rounded transition-colors">Run Antivirus &rarr;</a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
