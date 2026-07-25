// ---------------------------------------------------------------------------
// Per-vector fellowship + helpline.
//
// Split out of vector-depth.ts (2026-07-25) so the client-rendered /scan
// readout can surface "find your meeting" without pulling the entire depth
// layer (FAQs, self-checks, 7-day protocols) into the browser bundle.
// vector-depth.ts imports from here, so this stays the single source of truth
// and the two can't drift.
//
// Helplines are the highest-cost thing on this site to get wrong. Verify each
// against the operator's own site before changing it — NCPG rebranded its
// helpline to 1-800-MY-RESET and the old number is stale.
// ---------------------------------------------------------------------------

export interface Fellowship {
  name: string;
  url: string;
  note: string;
}

// `satisfies` rather than a `Record<string, Fellowship>` annotation: this keeps
// the literal key union, so VECTOR_FELLOWSHIP["gamblng"] is a compile error
// instead of a silently-undefined helpline at runtime. That failure mode —
// a missing crisis number that type-checks fine — is exactly what this guards.
export const VECTOR_FELLOWSHIP = {
  alcohol: {
    name: "Alcoholics Anonymous",
    url: "https://www.aa.org/find-aa",
    note: "Free, worldwide, no dues. SAMHSA's national helpline is 1-800-662-4357.",
  },
  opioids: {
    name: "Narcotics Anonymous",
    url: "https://www.na.org/meetingsearch/",
    note: "SAMHSA's free 24/7 helpline: 1-800-662-4357. Naloxone is available over the counter.",
  },
  nicotine: {
    name: "Nicotine Anonymous",
    url: "https://nicotine-anonymous.org/",
    note: "Free state quitlines: 1-800-QUIT-NOW (1-800-784-8669).",
  },
  cannabis: {
    name: "Marijuana Anonymous",
    url: "https://marijuana-anonymous.org/",
    note: "Free meetings, in person and online. SAMHSA helpline: 1-800-662-4357.",
  },
  gambling: {
    name: "Gamblers Anonymous",
    url: "https://www.gamblersanonymous.org/ga/locations",
    note: "National Problem Gambling Helpline — call or text 1-800-MY-RESET (1-800-697-3738), 24/7 and confidential.",
  },
  pornography: {
    name: "Sex Addicts Anonymous",
    url: "https://saa-recovery.org/meetings/",
    note: "Free and anonymous, in person and online. SAMHSA helpline: 1-800-662-4357.",
  },
  "social-media": {
    name: "Internet & Technology Addicts Anonymous",
    url: "https://internetaddictsanonymous.org/",
    note: "Free 12-Step meetings, primarily online.",
  },
  shopping: {
    name: "Debtors Anonymous",
    url: "https://debtorsanonymous.org/",
    note: "Free 12-Step meetings focused on compulsive spending and debt.",
  },
  work: {
    name: "Workaholics Anonymous",
    url: "https://workaholics-anonymous.org/",
    note: "Free 12-Step meetings, in person and online.",
  },
  gaming: {
    name: "Computer Gaming Addicts Anonymous",
    url: "https://cgaa.info/",
    note: "Free 12-Step meetings, primarily online and voice-based.",
  },
} satisfies Record<string, Fellowship>;

export type FellowshipSlug = keyof typeof VECTOR_FELLOWSHIP;

/** Safe lookup for runtime strings (URL params, stored results, user input). */
export function getFellowship(slug: string | undefined): Fellowship | undefined {
  if (!slug) return undefined;
  return (VECTOR_FELLOWSHIP as Record<string, Fellowship>)[slug];
}
