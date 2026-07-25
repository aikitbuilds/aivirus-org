// ---------------------------------------------------------------------------
// The AIV statistics hub dataset — the citable comparison table across all ten
// vectors, plus the universal neuroscience and the 7-stage infection pathway.
//
// This is the page built to be quoted: by people, by search engines, and by LLM
// crawlers answering "how many Americans are addicted to X". That only works if
// every figure is traceable, so the shape below forces a source + URL on every
// number, and the page renders them visibly rather than hiding them in a footer.
//
// HARD RULE (MASTER-PLAN): no fabricated numbers. Where prevalence estimates
// genuinely conflict between studies — which is the norm for the behavioral
// vectors — the range is shown and the disagreement is stated, rather than
// picking the most dramatic figure.
// ---------------------------------------------------------------------------

export interface HubRow {
  slug: string;
  name: string;
  /** "substance" | "behavioral" — the table groups and sorts by this. */
  kind: "substance" | "behavioral";
  affected: string;
  affectedNote: string;
  percentPop: string;
  economicCost: string;
  treatmentGap: string;
  source: string;
  sourceUrl: string;
  /** Set where the figure is contested or definition-dependent. */
  caveat?: string;
}

/** Sorted biggest-reach first within each group; the table renders in this order. */
export const HUB_ROWS: HubRow[] = [
  {
    slug: "nicotine",
    name: "Nicotine / Vaping",
    kind: "substance",
    affected: "64.4M",
    affectedNote: "current U.S. tobacco or nicotine users aged 12+",
    percentPop: "~22.7%",
    economicCost: "$168B / yr",
    treatmentGap: "Most users who want to quit do so unaided",
    source: "NCDAS 2025; NIDA (cost)",
    sourceUrl: "https://drugabusestatistics.org",
  },
  {
    slug: "alcohol",
    name: "Alcohol",
    kind: "substance",
    affected: "28.9M",
    affectedNote: "Americans 12+ with an alcohol use disorder in the past year",
    percentPop: "~10% of ages 12+",
    economicCost: "$249B / yr",
    treatmentGap: "2.5% received medication treatment",
    source: "SAMHSA 2023–24 NSDUH; NIDA (cost)",
    sourceUrl: "https://www.samhsa.gov/data/report/2023-nsduh-annual-national-report",
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    kind: "substance",
    affected: "16.1M",
    affectedNote: "people 12+ with a cannabis use disorder",
    percentPop: "~5.7%",
    economicCost: "Not separately measured",
    treatmentGap: "Widely undertreated; no standard pathway",
    source: "SAMHSA / NCDAS 2025",
    sourceUrl: "https://drugabusestatistics.org",
  },
  {
    slug: "opioids",
    name: "Opioids",
    kind: "substance",
    affected: "4.8M",
    affectedNote: "U.S. adults with an opioid use disorder",
    percentPop: "~1.7%",
    economicCost: "$2.7T (2023, illicit opioids)",
    treatmentGap: "Most do not receive medication for OUD",
    source: "SAMHSA 2024; White House CEA 2025 (cost)",
    sourceUrl: "https://www.whitehouse.gov/releases/2025/03/the-staggering-cost-of-the-illicit-opioid-epidemic-in-the-united-states/",
    caveat: "Deaths fell sharply in 2024 (~79,000 → ~54,000), the largest single-year decline on record.",
  },
  {
    slug: "work",
    name: "Work",
    kind: "behavioral",
    affected: "~14–15%",
    affectedNote: "pooled prevalence among working adults — roughly one in seven",
    percentPop: "~1 in 7 workers",
    economicCost: "Not measured",
    treatmentGap: "No diagnosis, no helpline, no funded pathway",
    source: "Meta-analysis, 53 studies / 71,625 people / 23 countries",
    sourceUrl: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1252373/full",
    caveat: "No DSM-5 classification; prevalence varies widely by which workaholism scale is used. We show the measured rate rather than a headcount, because converting it to a number of Americans depends on which labour-force denominator you pick.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    kind: "behavioral",
    affected: "~6.8%",
    affectedNote: "problematic social-media use across a 30-nation adult survey",
    percentPop: "1.7–18.4% by country",
    economicCost: "Not measured",
    treatmentGap: "No diagnosis, no standard pathway",
    source: "Ithra 30-Nation Digital Wellbeing Survey (PMC)",
    sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8918624/",
    caveat: "Not a formal diagnosis in DSM-5 or ICD-11, and researchers actively dispute the 'addiction' framing. The tenfold spread between countries shows how much the figure depends on definition and instrument — treat any single number here with suspicion.",
  },
  {
    slug: "pornography",
    name: "Pornography",
    kind: "behavioral",
    affected: "~100M globally",
    affectedNote: "adults with problematic pornography use (~3% of world population)",
    percentPop: "~3% globally",
    economicCost: "Not measured",
    treatmentGap: "Under 1% ever sought help — the widest gap here",
    source: "LJMU / Addiction, 2024 (42-country study)",
    sourceUrl: "https://care.org.uk/news/2024/03/global-study-reveals-nearly-100-million-addicted-to-pornography",
    caveat: "Classified under Compulsive Sexual Behaviour Disorder in ICD-11; not independently in DSM-5. A separate systematic review puts pooled prevalence nearer 13%.",
  },
  {
    slug: "shopping",
    name: "Shopping",
    kind: "behavioral",
    affected: "~5.8%",
    affectedNote: "of U.S. adults show compulsive buying behavior — roughly 1 in 17",
    percentPop: "~5.8% of adults",
    economicCost: "Not measured",
    treatmentGap: "No standard treatment pathway",
    source: "Stanford / American Journal of Psychiatry",
    sourceUrl: "https://psychiatryonline.org/doi/10.1176/ajp.2006.163.10.1806",
    caveat: "Near-equal by gender: 6.0% of women, 5.5% of men — which contradicts the usual stereotype. A separate meta-analysis puts the pooled figure nearer 5%.",
  },
  {
    slug: "gambling",
    name: "Gambling",
    kind: "behavioral",
    affected: "~2.5M severe",
    affectedNote: "with a gambling disorder; ~20M report at least one problem indicator",
    percentPop: "~1% severe / ~8% any indicator",
    economicCost: "$14B / yr social cost",
    treatmentGap: "~8% ever seek treatment",
    source: "NCPG NGAGE 3.0 (2024); Rutgers RARC",
    sourceUrl: "https://www.ncpgambling.org/training/ngage-survey/ngage-3/",
    caveat: "NCPG states explicitly that NGAGE is not a prevalence study — it measures reported gambling behaviours and problem indicators, not clinical diagnoses. Treat these as scale indicators, not diagnosed cases. The clearest growth signal: U.S. sports betting handle rose 23.6% to $147.9B in 2024.",
  },
  {
    slug: "gaming",
    name: "Gaming",
    kind: "behavioral",
    affected: "~6.7% of gamers",
    affectedNote: "pooled prevalence of Internet Gaming Disorder; ~8.6% among adolescents",
    percentPop: "~3% of adults",
    economicCost: "Not measured",
    treatmentGap: "Minimally treated",
    source: "Meta-analysis 2024; WHO ICD-11",
    sourceUrl: "https://www.mdpi.com/1660-4601/21/6/700",
    caveat: "The only behavioral vector besides gambling with formal WHO recognition (ICD-11, effective 2022).",
  },
];

/** The universal 7-stage pathway — same architecture regardless of vector. */
export const PATHWAY = [
  {
    n: "01",
    stage: "Trigger",
    biology: "An environmental cue activates reward memory via the hippocampus and amygdala.",
    terminal: "System handshake — old code reactivates",
  },
  {
    n: "02",
    stage: "Dopamine surge",
    biology: "The nucleus accumbens is flooded far above the level any natural reward produces.",
    terminal: "Buffer overflow — the reward pathway crashes",
  },
  {
    n: "03",
    stage: "Craving amplifies",
    biology: "The prefrontal cortex — judgement, consequence, impulse control — is overridden.",
    terminal: "Admin rights revoked — the virus takes control",
  },
  {
    n: "04",
    stage: "Tolerance builds",
    biology: "The brain reduces D2 dopamine receptors to compensate for chronic flooding.",
    terminal: "Firmware patch fails — baseline recalibrates downward",
  },
  {
    n: "05",
    stage: "Natural rewards numb",
    biology: "Food, love, connection and achievement all feel flat next to the addiction.",
    terminal: "Natural antivirus disabled — false signals only",
  },
  {
    n: "06",
    stage: "Compulsive use",
    biology: "Seeking shifts from the ventral to the dorsal striatum — from choice to reflex.",
    terminal: "Behavior runs on autopilot",
  },
  {
    n: "07",
    stage: "Loss of control",
    biology: "The behavior now runs without conscious permission. This is physiology, not character.",
    terminal: "Full system infection — manual override locked",
  },
];

/** The three documented physical changes underneath every vector. */
export const NEURO = [
  {
    title: "D2 receptor downregulation",
    body: "The brain removes dopamine receptors from the reward circuit to survive chronic overstimulation. That is tolerance — and it is why natural rewards go flat and early recovery feels grey before it feels good.",
    source: "Learn.Genetics, University of Utah",
    sourceUrl: "https://learn.genetics.utah.edu/content/addiction/brainchange/",
  },
  {
    title: "Prefrontal cortex compromise",
    body: "The executive centre responsible for planning, impulse control and recognising consequences is physically altered. This is why a person can know the behavior is destructive and still be unable to stop — the judgement hardware itself is compromised.",
    source: "Neurobiology of Addiction, StatPearls / NCBI",
    sourceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK597351/",
  },
  {
    title: "Habit circuit hardwiring",
    body: "Seeking behavior migrates from the ventral striatum (conscious, reward-driven) to the dorsal striatum (automatic, habit-driven). The behavior becomes a reflex rather than a decision.",
    source: "Addiction and brain reward and antireward pathways, PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/21508625/",
  },
];
