// ---------------------------------------------------------------------------
// The 10 vectors of the Addiction Intelligence Virus (AIV).
//
// AIVirus.org was originally alcohol-only ("The Alcohol Intelligence Virus").
// Phase 3.1 reframes it as the broader "Addiction Intelligence Virus" — the
// same conceptual model (a system-level infection that hijacks the operating
// system) applied across 10 named vectors.
//
// HARD RULE (see MASTER-PLAN.md "No fabricated numbers anywhere in any UI"):
// every number below is pulled from a named public source (SAMHSA/NSDUH, CDC,
// NIDA, NCPG, or a named peer-reviewed review/meta-analysis) and carries a
// `sourceUrl`. Behavioral-addiction prevalence varies widely by definition and
// method — those stats are phrased as estimates and cite the specific study.
// If a number can't be sourced, it does not go on the page.
// ---------------------------------------------------------------------------

export interface VectorStat {
  /** Big headline figure, e.g. "28.9M" or "~13%". */
  value: string;
  /** What the figure measures, plain language. */
  label: string;
  /** Short source attribution shown under the stat, e.g. "SAMHSA, 2023 NSDUH". */
  source: string;
  /** Link to the source. */
  sourceUrl: string;
}

export interface VectorSource {
  label: string;
  url: string;
}

export interface VectorMechanism {
  title: string;
  body: string;
}

/** Accent key -> a literal set of Tailwind classes lives in the page template
 *  (COLOR_MAP). Storing the key (not the classes) keeps this file about content
 *  and lets Tailwind's static scanner see every class in the component. */
export type AccentKey =
  | "red" | "orange" | "amber" | "lime" | "emerald"
  | "pink" | "cyan" | "fuchsia" | "blue" | "violet";

export interface Vector {
  slug: string;
  /** Plain name, e.g. "Alcohol". */
  name: string;
  /** Branded virus name, e.g. "The Alcohol Intelligence Virus". */
  virusName: string;
  /** Catalog code for the terminal aesthetic, e.g. "AIV-01". */
  code: string;
  /** lucide-react icon name (mapped to a component in the template). */
  icon: string;
  accent: AccentKey;
  /** One-line hook. */
  tagline: string;
  /** 1–2 sentence description of how this vector infects the system. */
  summary: string;
  /** Three themed "how the virus operates" mechanisms (editorial framing). */
  mechanisms: VectorMechanism[];
  /** Sourced statistics. */
  stats: VectorStat[];
  /** Full source list for the citations block. */
  sources: VectorSource[];
}

const SAMHSA_2023 = "https://www.samhsa.gov/data/report/2023-nsduh-annual-national-report";

export const vectors: Vector[] = [
  {
    slug: "alcohol",
    name: "Alcohol",
    virusName: "The Alcohol Intelligence Virus",
    code: "AIV-01",
    icon: "Wine",
    accent: "red",
    tagline: "The original strain. Legal, social, and lethal at scale.",
    summary:
      "Alcohol is the vector the whole recovery framework was built to fight. It embeds itself in ritual and celebration, which is exactly what makes it so hard to see as an infection.",
    mechanisms: [
      { title: "The Illusion of Control", body: "It convinces you that you can stop any time — right up until the moment you can't." },
      { title: "The Social Camouflage", body: "Because everyone around you drinks, the virus hides in plain sight as 'normal'." },
      { title: "The Slow Crash", body: "Damage compounds silently over years — liver, heart, brain — long before the crisis that finally makes it undeniable." },
    ],
    stats: [
      { value: "28.9M", label: "Americans 12+ with an alcohol use disorder in the past year (2023)", source: "SAMHSA, 2023 NSDUH", sourceUrl: SAMHSA_2023 },
      { value: "178,000+", label: "deaths a year from excessive alcohol use (2020–2021 average)", source: "CDC", sourceUrl: "https://www.cdc.gov/alcohol/facts-stats/index.html" },
    ],
    sources: [
      { label: "SAMHSA — 2023 NSDUH Annual National Report", url: SAMHSA_2023 },
      { label: "CDC — Facts About U.S. Deaths from Excessive Alcohol Use", url: "https://www.cdc.gov/alcohol/facts-stats/index.html" },
    ],
  },
  {
    slug: "opioids",
    name: "Opioids",
    virusName: "The Opioid Intelligence Virus",
    code: "AIV-02",
    icon: "Pill",
    accent: "orange",
    tagline: "The fastest-killing strain. It rewires the brain's pain and reward wiring.",
    summary:
      "Opioids hijack the body's own pain-relief system, then punish any attempt to stop with withdrawal so severe it feels life-threatening. Many infections start with a legitimate prescription.",
    mechanisms: [
      { title: "The Hostage Protocol", body: "It takes your pain-relief system hostage, so quitting feels like your body is under attack." },
      { title: "The Tolerance Trap", body: "It demands ever-higher doses to reach the same relief, walking you toward the overdose line." },
      { title: "The Contaminated Supply", body: "Illicit fentanyl now laces the supply, turning a single relapse into a coin-flip with death." },
    ],
    stats: [
      { value: "~80,000", label: "opioid-involved overdose deaths in the U.S. in 2023", source: "CDC / NCHS", sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db549.htm" },
      { value: "54,000", label: "opioid overdose deaths in 2024 — a sharp decline, but still ~150 people a day", source: "CDC / NCHS", sourceUrl: "https://www.cdc.gov/nchs/pressroom/releases/20250514.html" },
    ],
    sources: [
      { label: "CDC/NCHS — Drug Overdose Deaths in the U.S., 2023–2024", url: "https://www.cdc.gov/nchs/products/databriefs/db549.htm" },
      { label: "CDC/NCHS — U.S. Overdose Deaths Decrease Almost 27% in 2024", url: "https://www.cdc.gov/nchs/pressroom/releases/20250514.html" },
      { label: "NIDA — Drug Overdose Death Rates", url: "https://nida.nih.gov/research-topics/trends-statistics/overdose-death-rates" },
    ],
  },
  {
    slug: "nicotine",
    name: "Nicotine",
    virusName: "The Nicotine Intelligence Virus",
    code: "AIV-03",
    icon: "Cigarette",
    accent: "amber",
    tagline: "The most normalized strain. It kills more Americans than any other.",
    summary:
      "Nicotine delivers one of the fastest, most reliable dopamine hits available and pairs it with a punishing, low-grade withdrawal that keeps you dosing all day. Vaping rebuilt the delivery system for a new generation.",
    mechanisms: [
      { title: "The Micro-Dose Loop", body: "It ties a hit to dozens of daily moments — coffee, stress, breaks — so the craving never fully clears." },
      { title: "The Invisible Damage", body: "No dramatic intoxication means the harm accumulates quietly, disguised as 'just a habit'." },
      { title: "The Reformatted Delivery", body: "Vapes stripped away the smell and the smoke, re-normalizing the dose for people who'd never have picked up a cigarette." },
    ],
    stats: [
      { value: "480,000+", label: "deaths a year caused by cigarette smoking in the U.S.", source: "CDC", sourceUrl: "https://www.cdc.gov/tobacco/campaign/tips/resources/data/cigarette-smoking-in-united-states.html" },
      { value: "28.8M", label: "U.S. adults who still smoke cigarettes (11.6%, 2022)", source: "CDC", sourceUrl: "https://www.cdc.gov/tobacco/php/data-statistics/adult-data-cigarettes/index.html" },
    ],
    sources: [
      { label: "CDC — Burden of Cigarette Use in the U.S.", url: "https://www.cdc.gov/tobacco/campaign/tips/resources/data/cigarette-smoking-in-united-states.html" },
      { label: "CDC — Current Cigarette Smoking Among Adults", url: "https://www.cdc.gov/tobacco/php/data-statistics/adult-data-cigarettes/index.html" },
    ],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    virusName: "The Cannabis Intelligence Virus",
    code: "AIV-04",
    icon: "Leaf",
    accent: "lime",
    tagline: "The 'harmless' strain. Legalization outran the honest conversation about dependence.",
    summary:
      "Cannabis is now the most widely used federally-illicit drug in America, and today's high-potency products are far stronger than the plant most cultural assumptions were formed around. Dependence is real even where the drug is legal.",
    mechanisms: [
      { title: "The Harmless Framing", body: "'It's just weed' disarms your guard, so daily use escalates without ever tripping an alarm." },
      { title: "The Potency Creep", body: "Modern concentrates dwarf older flower, quietly raising the dependence risk the culture still calls low." },
      { title: "The Motivation Tax", body: "For heavy users it flattens drive and blunts the very feedback loop you'd need to notice a problem." },
    ],
    stats: [
      { value: "61.8M", label: "past-year cannabis users aged 12+ (2023) — the most-used illicit drug", source: "SAMHSA, 2023 NSDUH", sourceUrl: SAMHSA_2023 },
      { value: "1 in 5", label: "Americans 12+ used cannabis in the past year (21.8%, 2023)", source: "SAMHSA, 2023 NSDUH", sourceUrl: SAMHSA_2023 },
    ],
    sources: [
      { label: "SAMHSA — 2023 NSDUH Annual National Report", url: SAMHSA_2023 },
    ],
  },
  {
    slug: "gambling",
    name: "Gambling",
    virusName: "The Gambling Intelligence Virus",
    code: "AIV-05",
    icon: "Dices",
    accent: "emerald",
    tagline: "The fastest-spreading strain. Legal sports betting put a casino in every pocket.",
    summary:
      "Gambling is the behavioral addiction with the clearest financial kill-switch: it can empty a life savings in a weekend. The explosion of mobile sports betting removed every barrier between the impulse and the bet.",
    mechanisms: [
      { title: "The Near-Miss Engine", body: "Odds and interfaces are tuned so 'almost winning' fires the same reward as winning — keeping you in the loop." },
      { title: "The Chase", body: "Losses trigger a compulsion to bet bigger to 'get it back,' the exact mechanism that turns a habit into a crisis." },
      { title: "The Frictionless Bet", body: "The wager moved from a casino trip to a thumb-tap during a live game — infinite exposure, zero cool-down." },
    ],
    stats: [
      { value: "~2.5M", label: "U.S. adults estimated to suffer from a gambling disorder", source: "NCPG, NGAGE 3.0 (2024)", sourceUrl: "https://www.ncpgambling.org/training/ngage-survey/ngage-3/" },
      { value: "$14B", label: "estimated annual social cost of problem gambling in the U.S.", source: "NCPG", sourceUrl: "https://www.ncpgambling.org/news/national-council-on-problem-gambling-survey-shows-drop-in-problem-gambling-risk-highlights-ongoing-challenges/" },
    ],
    sources: [
      { label: "National Council on Problem Gambling — NGAGE 3.0 (2024)", url: "https://www.ncpgambling.org/training/ngage-survey/ngage-3/" },
      { label: "NCPG — 2024 Survey Findings", url: "https://www.ncpgambling.org/news/national-council-on-problem-gambling-survey-shows-drop-in-problem-gambling-risk-highlights-ongoing-challenges/" },
    ],
  },
  {
    slug: "pornography",
    name: "Pornography",
    virusName: "The Pornography Intelligence Virus",
    code: "AIV-06",
    icon: "Eye",
    accent: "pink",
    tagline: "The most private strain. Unlimited novelty, zero friction, total secrecy.",
    summary:
      "Problematic pornography use hijacks the brain's novelty-and-reward system with an effectively infinite supply. Because it's private and shame-bound, it's often the last vector anyone admits to — even to themselves.",
    mechanisms: [
      { title: "The Novelty Firehose", body: "An endless supply of new stimuli exploits the dopamine system in a way no natural reward can match." },
      { title: "The Shame Lock", body: "Secrecy and self-disgust keep it hidden, cutting off the honesty and support that recovery depends on." },
      { title: "The Escalation Curve", body: "Tolerance pushes use toward more extreme or more frequent content to reach the same effect." },
    ],
    stats: [
      { value: "~13%", label: "pooled estimated prevalence of problematic pornography use (systematic review)", source: "Systematic review, 2024", sourceUrl: "https://www.tandfonline.com/doi/full/10.1080/26929953.2024.2348624" },
      { value: "2–9.6%", label: "estimated prevalence of compulsive sexual behavior disorder in community samples", source: "Community-sample studies", sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12138901/" },
    ],
    sources: [
      { label: "Problematic Pornography Use and Mental Health: A Systematic Review (2024)", url: "https://www.tandfonline.com/doi/full/10.1080/26929953.2024.2348624" },
      { label: "Compulsive sexual behavior disorder: rates in a community sample", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12138901/" },
    ],
  },
  {
    slug: "social-media",
    name: "Social Media",
    virusName: "The Social Media Intelligence Virus",
    code: "AIV-07",
    icon: "Smartphone",
    accent: "cyan",
    tagline: "The best-engineered strain. Billion-dollar labs optimize it against your attention.",
    summary:
      "Social media is the only vector built by teams whose full-time job is to maximize the time you spend infected. The variable-reward feed is a slot machine for social validation, running in your pocket all day.",
    mechanisms: [
      { title: "The Infinite Feed", body: "There is no bottom of the page — the design removes every natural stopping point on purpose." },
      { title: "The Validation Slot Machine", body: "Likes and notifications arrive on a variable schedule, the most addictive reward pattern known." },
      { title: "The Comparison Spiral", body: "A curated highlight reel of everyone else fuels the anxiety that sends you back for more." },
    ],
    stats: [
      { value: "~6.8%", label: "problematic social-media use across a 30-nation adult survey", source: "Ithra 30-nation study", sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8918624/" },
      { value: "1.7–18.4%", label: "range of problematic-use prevalence between nations in that survey", source: "Ithra 30-nation study", sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8918624/" },
    ],
    sources: [
      { label: "Correlates of Problematic Social Media Use — Ithra 30-Nation Digital Wellbeing Survey", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8918624/" },
    ],
  },
  {
    slug: "shopping",
    name: "Shopping",
    virusName: "The Shopping Intelligence Virus",
    code: "AIV-08",
    icon: "ShoppingBag",
    accent: "fuchsia",
    tagline: "The socially-rewarded strain. One-click checkout removed the last speed bump.",
    summary:
      "Compulsive buying chases the dopamine of acquisition, not the object — which is why the high fades the moment the box is opened. E-commerce and buy-now-pay-later stripped away the friction that once slowed it down.",
    mechanisms: [
      { title: "The Acquisition High", body: "The reward is in the buying, not the having, so the purchases never actually satisfy the craving." },
      { title: "The One-Click Bypass", body: "Saved cards and instant checkout delete the pause where second thoughts used to live." },
      { title: "The Debt Cloak", body: "Credit and pay-later plans hide the real cost, letting the behavior outrun the bank balance." },
    ],
    stats: [
      { value: "~5.8%", label: "U.S. adults with compulsive buying behavior — about 1 in 20", source: "Koran et al., Am. J. Psychiatry", sourceUrl: "https://psychiatryonline.org/doi/10.1176/ajp.2006.163.10.1806" },
      { value: "~5%", label: "pooled prevalence of compulsive buying in a meta-analysis of studies", source: "Meta-analysis", sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26517309/" },
    ],
    sources: [
      { label: "Estimated Prevalence of Compulsive Buying Behavior in the U.S. (Am. J. Psychiatry)", url: "https://psychiatryonline.org/doi/10.1176/ajp.2006.163.10.1806" },
      { label: "The prevalence of compulsive buying: a meta-analysis (PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/26517309/" },
    ],
  },
  {
    slug: "work",
    name: "Work",
    virusName: "The Work Intelligence Virus",
    code: "AIV-09",
    icon: "Briefcase",
    accent: "blue",
    tagline: "The praised strain. The only addiction people put on a resume.",
    summary:
      "Work addiction is the vector that society actively rewards, which is exactly what makes it so dangerous. It uses productivity and 'hustle' as camouflage while it consumes health, relationships, and identity.",
    mechanisms: [
      { title: "The Applauded Symptom", body: "Everyone praises the overwork, so the warning signs get mistaken for virtues." },
      { title: "The Identity Merge", body: "It fuses your worth with your output, making rest feel like a threat to who you are." },
      { title: "The Avoidance Engine", body: "Constant busyness becomes a way to outrun feelings and relationships you'd otherwise have to face." },
    ],
    stats: [
      { value: "~15%", label: "pooled prevalence of workaholism (53 studies, 71,625 people, 23 countries)", source: "Meta-analysis, Frontiers in Psychology (2023)", sourceUrl: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1252373/full" },
      { value: "8.3%", label: "prevalence in a nationally representative employee sample (Norway)", source: "Frontiers / PMC", sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10643257/" },
    ],
    sources: [
      { label: "The prevalence of workaholism: a systematic review and meta-analysis (Frontiers, 2023)", url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1252373/full" },
      { label: "Same meta-analysis (PMC full text)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10643257/" },
    ],
  },
  {
    slug: "gaming",
    name: "Gaming",
    virusName: "The Gaming Intelligence Virus",
    code: "AIV-10",
    icon: "Gamepad2",
    accent: "violet",
    tagline: "The formally-recognized strain. The WHO named it a disorder; the industry engineers for it.",
    summary:
      "Gaming Disorder is recognized in the WHO's ICD-11. Modern games borrow the exact reward mechanics of gambling — loot boxes, daily streaks, endless progression — to keep engagement compulsive rather than fun.",
    mechanisms: [
      { title: "The Endless Ladder", body: "There is always a next level, rank, or unlock, so the game is engineered to have no natural end." },
      { title: "The Loot-Box Loop", body: "Randomized rewards import slot-machine psychology directly into play, especially for younger users." },
      { title: "The Escape Hatch", body: "It offers a frictionless retreat from stress and difficulty, so it grows fastest exactly when life gets hard." },
    ],
    stats: [
      { value: "~6.7%", label: "pooled prevalence of Internet Gaming Disorder (meta-analysis)", source: "Meta-analysis, 2024", sourceUrl: "https://www.mdpi.com/1660-4601/21/6/700" },
      { value: "8.6%", label: "estimated prevalence among adolescents specifically", source: "Systematic review / meta-analysis", sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11925544/" },
    ],
    sources: [
      { label: "Meta-Analysis of Internet Gaming Disorder Prevalence (2024)", url: "https://www.mdpi.com/1660-4601/21/6/700" },
      { label: "Burden of gaming disorder among adolescents: a systematic review and meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11925544/" },
    ],
  },
];

export function getVector(slug: string): Vector | undefined {
  return vectors.find((v) => v.slug === slug);
}
