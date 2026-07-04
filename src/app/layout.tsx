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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
