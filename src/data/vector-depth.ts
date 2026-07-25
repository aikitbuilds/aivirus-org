// ---------------------------------------------------------------------------
// Depth layer for the 10 AIV vectors.
//
// `vectors.ts` holds the headline identity + 2 hero stats per vector and is
// deliberately left stable. This file adds the SEO/content depth each vector
// page needs to stand on its own as a landing page: the biology (which of the
// four D.O.S.E. chemicals this strain hijacks), a self-check, a first-7-days
// protocol, FAQs (rendered + emitted as FAQPage schema), and the economic /
// treatment-gap figures.
//
// HARD RULE (MASTER-PLAN, "No fabricated numbers anywhere in any UI"): every
// number here carries a named public source. Editorial framing (mechanisms,
// self-check wording, the 7-day protocol) is prose, not data, and is written to
// be true of the vector in general rather than to imply a measured statistic.
// If a number cannot be sourced, it does not appear.
// ---------------------------------------------------------------------------

import { VECTOR_FELLOWSHIP, type Fellowship } from "./vector-fellowships";

export interface DepthStat {
  value: string;
  label: string;
  source: string;
  sourceUrl: string;
}

/** Which of the four D.O.S.E. chemicals this vector distorts, and how. */
export interface DoseImpact {
  chemical: "Dopamine" | "Oxytocin" | "Serotonin" | "Endorphins";
  /** "hijacked" = flooded then depleted; "starved" = crowded out by the vector. */
  mode: "hijacked" | "starved";
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface VectorDepth {
  /** The primary real-world search this page is written to answer. */
  searchIntent: string;
  /** One-sentence answer to that search, used as the page's answer block. */
  directAnswer: string;
  /** How this vector runs the universal 7-stage pathway — the stage it hits hardest. */
  signatureStage: { stage: string; body: string };
  /** Economic + treatment-gap figures. Optional: only where a source exists. */
  scale: DepthStat[];
  /** Biology first: what this strain does to the four chemicals. */
  dose: DoseImpact[];
  /** Self-check — editorial, explicitly not a diagnostic instrument. */
  selfCheck: string[];
  /** The first seven days, biology before framework. */
  firstSevenDays: { day: string; title: string; body: string }[];
  /** Rendered on-page and emitted as FAQPage structured data. */
  faqs: Faq[];
  /** Named fellowship / helpline for this vector. */
  fellowship: Fellowship;
}

const SAMHSA_2024 =
  "https://www.samhsa.gov/newsroom/press-announcements/20250728/samhsa-releases-annual-national-survey-on-drug-use-and-health";
const NIDA_COST = "https://nida.nih.gov/research-topics/trends-statistics";

export const vectorDepth: Record<string, VectorDepth> = {
  alcohol: {
    searchIntent: "why can't I stop drinking",
    directAnswer:
      "Because after enough repetition it stops being a decision. Alcohol floods the same reward pathway every other addiction uses, the brain removes dopamine receptors to survive the flood, and the part of your brain that would notice the problem is the part alcohol impairs first. That is physiology, not weakness.",
    signatureStage: {
      stage: "Stage 3 — Admin rights revoked",
      body: "Alcohol's signature is that it disables the very hardware you would need to catch it. The prefrontal cortex handles judgement, consequence, and 'I said I'd stop at two' — and it is the first system alcohol takes offline. This is why the promise is sincere at 6 PM and irrelevant at 10 PM.",
    },
    scale: [
      { value: "$249B", label: "estimated annual U.S. economic cost of alcohol misuse", source: "NIDA", sourceUrl: NIDA_COST },
      { value: "2.5%", label: "of people with an alcohol use disorder received medication treatment in the past year", source: "SAMHSA, 2024 NSDUH", sourceUrl: SAMHSA_2024 },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "A single unearned flood, far above what a walk or a finished task pays out — so the brain removes receptors and your baseline drops below where it started." },
      { chemical: "Serotonin", mode: "starved", body: "Alcohol wrecks sleep architecture and gut function — and the gut, not the brain, is where most of the body's serotonin is produced. Calm mood is manufactured there, and the supply line goes down." },
      { chemical: "Oxytocin", mode: "starved", body: "It substitutes chemical warmth for the real thing, so drinking slowly replaces the connection that would otherwise buffer the next craving." },
      { chemical: "Endorphins", mode: "hijacked", body: "It borrows the body's own pain relief system rather than earning it through effort, so ordinary discomfort starts to feel unbearable without it." },
    ],
    selfCheck: [
      "Do you break your own rules about when to stop?",
      "Have you promised someone you'd cut down and then not been able to?",
      "Do you drink to manage a feeling rather than to enjoy a drink?",
      "Do you plan your day around when drinking becomes acceptable?",
      "Have you hidden the amount from someone who'd be worried?",
      "Does the idea of 30 days without it feel unreasonable rather than merely inconvenient?",
    ],
    firstSevenDays: [
      { day: "Days 1–2", title: "Get medically safe first", body: "Alcohol is one of the few substances where unmanaged withdrawal can kill. If you are a daily or heavy drinker, do not white-knuckle it — talk to a doctor or urgent care about a taper or supervised detox before anything else on this list." },
      { day: "Days 1–3", title: "Sleep and water before anything spiritual", body: "Protect the sleep window and hydrate hard. Nothing psychological holds in a body that is exhausted and dehydrated, and this is when the nervous system is loudest." },
      { day: "Days 2–4", title: "Morning light and a walk", body: "Ten to fifteen minutes of outdoor light and a brisk walk are the cleanest, safest dopamine you can earn while receptors are still down-regulated." },
      { day: "Days 3–5", title: "Feed the factory", body: "Protein, fiber, and fermented food. You are rebuilding the gut that manufactures your baseline mood, not going on a diet." },
      { day: "Days 4–7", title: "Tell one human being", body: "Isolation is the condition the virus needs. One meeting, one call, one honest sentence to one person — this is the oxytocin pillar and it is not optional." },
      { day: "Day 7", title: "Then, and only then, the framework", body: "With the body stabilizing, the 12 Steps do the deeper work on resentment, ego, and wreckage. Biology first is not a rejection of the Steps — it is what makes them hold." },
    ],
    faqs: [
      { q: "Is alcohol withdrawal dangerous?", a: "It can be. Alcohol is one of the few drugs where withdrawal can cause seizures and delirium tremens, which can be fatal. If you drink daily or heavily, speak to a doctor about a supervised taper before stopping abruptly. This site is peer support and not medical advice." },
      { q: "How long until my brain recovers from alcohol?", a: "Partially within weeks, substantially over months. Sleep and mood usually begin improving in the first few weeks. Research on dopamine receptor availability suggests the reward system continues repairing well past a year of abstinence, which is why early recovery can feel flat before it feels good." },
      { q: "Do I have to believe in God to work the 12 Steps?", a: "No. The Steps say 'a Power greater than ourselves' and 'God as we understood Him' — the framework is deliberately written so that a person with no religious belief can work it. What it asks is that you stop treating yourself as the highest authority on your own case." },
      { q: "Is alcohol use disorder the same as being an alcoholic?", a: "'Alcohol use disorder' is the clinical term used by SAMHSA and the DSM-5, graded mild to severe. 'Alcoholic' is the everyday and 12-step word. They describe the same territory; the clinical term is just more precise about degree." },
      { q: "Can I just cut down instead of quitting?", a: "Some people with mild patterns do moderate successfully. The practical test is the one in the self-check above: if you have repeatedly set your own limit and then broken it, moderation is the thing that has already been tried and has already failed." },
    ],
    fellowship: VECTOR_FELLOWSHIP["alcohol"],
  },

  opioids: {
    searchIntent: "how to stop using opioids",
    directAnswer:
      "Opioids take the body's own pain-relief system hostage, so stopping feels like a physical emergency rather than a choice. The single most effective step is medication for opioid use disorder (buprenorphine or methadone) — it is the treatment with the strongest evidence base, and most people who need it never get it.",
    signatureStage: {
      stage: "Stage 5 — Natural antivirus disabled",
      body: "Opioids are the most extreme case of natural rewards going numb. Within months, nothing unassisted produces a comparable signal — not food, not achievement, not the people you love. The brain has been rewritten to recognize one input, which is why willpower arguments land on deaf hardware.",
    },
    scale: [
      { value: "$2.7T", label: "estimated cost of the illicit opioid epidemic to the U.S. in 2023 alone", source: "White House CEA, 2025", sourceUrl: "https://www.whitehouse.gov/releases/2025/03/the-staggering-cost-of-the-illicit-opioid-epidemic-in-the-united-states/" },
      { value: "4.8M", label: "U.S. adults with an opioid use disorder — most of whom never receive medication treatment", source: "SAMHSA, 2024 NSDUH", sourceUrl: SAMHSA_2024 },
    ],
    dose: [
      { chemical: "Endorphins", mode: "hijacked", body: "This is the direct hit. Opioids bind the receptors your own endorphins use, at a strength no amount of effort, heat, or laughter can match — so the natural system stops bothering." },
      { chemical: "Dopamine", mode: "hijacked", body: "The reward pathway floods alongside the pain relief, welding relief and reward into a single loop the brain will then defend." },
      { chemical: "Serotonin", mode: "starved", body: "Sleep, appetite, and gut function all degrade, taking the manufacturing base for steady mood with them." },
      { chemical: "Oxytocin", mode: "starved", body: "Secrecy, shame, and the logistics of use crowd out connection exactly when connection is the strongest protective factor available." },
    ],
    selfCheck: [
      "Do you take more than prescribed, or take it for reasons other than the pain it was prescribed for?",
      "Have you spent significant time planning how to secure the next supply?",
      "Do you feel physically ill when you go without — sweating, aching, restless, unable to sleep?",
      "Have you used someone else's prescription, or bought from a non-pharmacy source?",
      "Has your use continued after a consequence that would once have stopped you?",
      "Do you carry naloxone, and does the thought of needing it feel normal now?",
    ],
    firstSevenDays: [
      { day: "Day 0", title: "Naloxone, and never alone", body: "Get naloxone (Narcan) now — it is available over the counter and it reverses an overdose. Fentanyl contamination means a single relapse after any period of reduced tolerance is a coin flip. Never use alone; call 1-800-662-4357 (SAMHSA) for immediate direction." },
      { day: "Days 1–2", title: "Ask about MOUD before anything else", body: "Buprenorphine or methadone is the highest-evidence treatment for opioid use disorder. This is not 'swapping one drug for another' — it is the intervention that most reliably keeps people alive and out of the loop." },
      { day: "Days 1–4", title: "Expect the body to protest", body: "Withdrawal is brutal but the acute phase is finite. Hydration, electrolytes, and any comfort medication a clinician gives you are the priority. This is a hardware event; treat it as one." },
      { day: "Days 3–6", title: "Movement in the smallest possible dose", body: "Not a workout — a walk to the corner. Gentle movement and daylight begin restarting the endorphin and dopamine systems that have been fully outsourced." },
      { day: "Days 4–7", title: "Get into a room", body: "Narcotics Anonymous, a MOUD clinic group, anything with other people in it. Isolation plus opioid access is the most dangerous configuration there is." },
      { day: "Day 7", title: "Then the framework", body: "With medication stabilizing the hardware, the Steps do the work on the wreckage, shame, and the relationships the virus damaged." },
    ],
    faqs: [
      { q: "Is medication for opioid use disorder just trading one addiction for another?", a: "No, and this misconception costs lives. Buprenorphine and methadone taken as prescribed stabilize the receptor system rather than producing the crash-and-chase cycle of illicit use. Major health bodies regard medication for opioid use disorder as the highest-evidence treatment available, and most people who need it never receive it." },
      { q: "How long does opioid withdrawal last?", a: "Acute physical withdrawal typically peaks in the first few days and eases substantially within one to two weeks, though the timeline varies by substance and by person. The longer challenge is post-acute symptoms — low mood, poor sleep, no drive — which is precisely what the biological pillars are for." },
      { q: "Where do I get naloxone?", a: "Naloxone (Narcan) is available over the counter at pharmacies in the United States without a prescription, and free through many local health departments and harm-reduction programs. Anyone who uses opioids, and anyone who loves someone who does, should have it." },
      { q: "Are overdose deaths going down?", a: "Yes, substantially. CDC and KFF data show opioid-involved deaths fell from roughly 79,000 in 2023 to roughly 54,000 in 2024 — a historic single-year decline. That still leaves about 150 deaths a day, so the trend is genuinely encouraging without being a reason for complacency." },
      { q: "Can I do this without going to rehab?", a: "Many people do, particularly with medication plus a fellowship. But opioid withdrawal and relapse risk are serious enough that the decision should be made with a clinician rather than alone. Call SAMHSA at 1-800-662-4357 for free, confidential treatment referral." },
    ],
    fellowship: VECTOR_FELLOWSHIP["opioids"],
  },

  nicotine: {
    searchIntent: "why is nicotine so hard to quit",
    directAnswer:
      "Because nicotine reaches dopamine neurons within seconds — the fastest handshake of any addiction vector — and then ties itself to dozens of ordinary daily moments. You are not fighting one craving a day; you are fighting a low-grade withdrawal that never fully clears and a cue attached to every coffee, drive, and break.",
    signatureStage: {
      stage: "Stage 6 — Behavior runs on autopilot",
      body: "Nicotine's signature is cue density. Because a dose takes seconds and is repeated dozens of times a day, it welds itself to more environmental triggers than any other vector. The hand reaches before any thought occurs — that is the dorsal striatum running the program without asking.",
    },
    scale: [
      { value: "$168B", label: "estimated annual U.S. economic cost of tobacco use", source: "NIDA", sourceUrl: NIDA_COST },
      { value: "53%", label: "of U.S. youth daily vapers tried to quit and failed — up from 28.2% in 2020", source: "USC / JAMA, 2025", sourceUrl: "https://www.news-medical.net/news/20251103/Daily-vaping-and-failed-quit-attempts-rise-sharply-among-US-youth.aspx" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Activation within seconds of the first puff — faster than any other substance — which is what makes the association so hard to unlearn." },
      { chemical: "Endorphins", mode: "starved", body: "The ritual replaces the pause, the walk, and the breath that would otherwise pay out naturally, so the body's own relief system gets less practice." },
      { chemical: "Serotonin", mode: "starved", body: "Nicotine fragments sleep and appetite, quietly degrading the base that steady mood is built on." },
      { chemical: "Oxytocin", mode: "starved", body: "Once the smoke break was a social ritual; vaping made it solitary, removing even that thin thread of connection." },
    ],
    selfCheck: [
      "Do you use within thirty minutes of waking?",
      "Have you tried to quit and returned within a week?",
      "Do you keep a hidden backup so you never run out?",
      "Do specific moments — coffee, driving, a break, after eating — feel incomplete without it?",
      "Have you continued after a health warning from a doctor?",
      "Do you get irritable or unfocused within a couple of hours of the last dose?",
    ],
    firstSevenDays: [
      { day: "Day 0", title: "Pick a date and tell someone", body: "Nicotine quitting has better outcomes when it is a decision with a date and a witness rather than a vague intention." },
      { day: "Days 1–3", title: "Consider replacement, honestly", body: "Patches, gum, or lozenges roughly double quit rates versus willpower alone. Using them is not failing; it is separating the chemical dependence from the behavioral cue so you only fight one at a time." },
      { day: "Days 1–3", title: "Break the cue, not just the dose", body: "Change what happens at the trigger moments. Coffee somewhere else, a different route, a walk at break time. You are unlearning dozens of small associations, not one big one." },
      { day: "Days 2–5", title: "Ride the wave", body: "A nicotine craving peaks and passes in a few minutes. Box breathing, a glass of water, or two minutes outside will outlast most of them. The wave is real, and so is its ending." },
      { day: "Days 3–7", title: "Move and sleep", body: "Brisk movement and protected sleep rebuild the dopamine baseline nicotine has been faking, which is what makes week two easier than week one." },
      { day: "Day 7", title: "Then the framework", body: "Nicotine Anonymous works the same 12 Steps. With the acute phase behind you, the framework handles the identity part: who you are without it." },
    ],
    faqs: [
      { q: "How long do nicotine cravings last?", a: "An individual craving typically peaks and passes within a few minutes. The frequency of cravings usually drops substantially after the first two to four weeks, though specific cues can trigger them for much longer. The intensity is not evidence that it isn't working." },
      { q: "Is vaping safer than smoking?", a: "Vaping avoids combustion and its tar, which is why it is sometimes used as a cessation aid. It is not harmless — it delivers nicotine efficiently enough that CDC and JAMA data show rapidly rising daily use and failed quit attempts among youth. Less lethal than cigarettes is not the same as safe." },
      { q: "Does nicotine replacement therapy actually work?", a: "Yes. Patches, gum, and lozenges have a substantial evidence base and roughly double the odds of a successful quit compared with unaided attempts. Combining a long-acting patch with a short-acting form for breakthrough cravings tends to work better than either alone." },
      { q: "Why is nicotine considered the deadliest addiction?", a: "Because of scale rather than per-use risk. CDC attributes more than 480,000 U.S. deaths a year to cigarette smoking — more than any other addiction vector — precisely because it is legal, normalized, and used many times daily for decades." },
      { q: "Will I gain weight if I quit?", a: "Some people gain modestly, largely because nicotine suppresses appetite and the ritual gets replaced with snacking. Planning the food and movement pillars in advance handles most of it, and the health mathematics of quitting outweigh a few pounds by an enormous margin." },
    ],
    fellowship: VECTOR_FELLOWSHIP["nicotine"],
  },

  cannabis: {
    searchIntent: "is cannabis actually addictive",
    directAnswer:
      "Yes — legality is not a statement about dependence. Cannabis use disorder is a recognized clinical diagnosis, today's high-potency products are far stronger than the plant most cultural assumptions formed around, and the 'it's just weed' framing is itself part of what lets daily use escalate without ever tripping an alarm.",
    signatureStage: {
      stage: "Stage 1 — System handshake, never challenged",
      body: "Cannabis's signature is that the alarm never sounds. Other vectors eventually produce a moment undeniable enough to force the question. Cannabis is normalized, legal in much of the country, and rarely produces a dramatic bottom — so use can escalate for years while everyone involved, including you, keeps calling it harmless.",
    },
    scale: [
      { value: "16.1M", label: "people 12+ in the U.S. with a cannabis use disorder — dependence, not merely use", source: "SAMHSA, 2024 NSDUH", sourceUrl: SAMHSA_2024 },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Heavy use blunts the reward response over time, which is why long-term users often describe a flattened drive rather than a dramatic high." },
      { chemical: "Endorphins", mode: "starved", body: "It substitutes for the earned relief of movement and effort, so the natural system that pays out after hard things gets used less and less." },
      { chemical: "Serotonin", mode: "starved", body: "It suppresses REM sleep. Users often sleep long but wake unrested — and the rebound insomnia on stopping is one of the main reasons people go back." },
      { chemical: "Oxytocin", mode: "starved", body: "Daily use tends to shrink the social world rather than expand it, replacing effortful connection with a reliable, solitary substitute." },
    ],
    selfCheck: [
      "Do you use daily, or need it to fall asleep?",
      "Have you tried to take a break and found yourself irritable, restless, or unable to sleep?",
      "Has your tolerance climbed to concentrates or dabs from flower?",
      "Do you defend it more forcefully than the topic actually warrants?",
      "Have you lost interest in things that used to matter, and blamed something else?",
      "Do you use before ordinary activities that you used to do without it?",
    ],
    firstSevenDays: [
      { day: "Days 1–3", title: "Expect the sleep to be bad", body: "Cannabis suppresses REM; stopping brings it back all at once as vivid dreams and broken sleep. This is the single most common reason people restart. It is temporary and it is a sign of the system rebooting, not of damage." },
      { day: "Days 1–3", title: "Eat and hydrate deliberately", body: "Appetite and temperature regulation wobble in the first days. Regular protein and water take the edge off both." },
      { day: "Days 2–5", title: "Movement for the drive you're missing", body: "The flattened motivation is real. Brisk daily movement is the fastest legitimate way to start restoring it, and it directly targets the receptor system that has been down-regulated." },
      { day: "Days 3–6", title: "Rebuild an evening that isn't chemical", body: "Most daily use is anchored to a specific slot — after work, before bed. Replace the slot with something physical rather than trying to simply subtract it." },
      { day: "Days 4–7", title: "Say it out loud to one person", body: "Because cannabis is normalized, this vector is unusually isolating to quit — few people around you will treat it as significant. Marijuana Anonymous exists precisely for that reason." },
      { day: "Day 7", title: "Then the framework", body: "With sleep beginning to normalize, the Steps address the part cannabis was managing: avoidance, anxiety, and the feelings that were being smoothed over." },
    ],
    faqs: [
      { q: "Is cannabis withdrawal real?", a: "Yes. Cannabis withdrawal syndrome is recognized in the DSM-5 and typically includes irritability, anxiety, appetite changes, and disrupted sleep with vivid dreams. It is not dangerous the way alcohol withdrawal can be, but it is real and it is the main reason short breaks fail." },
      { q: "How long does it take to feel normal after quitting cannabis?", a: "Sleep is usually the last thing to settle and often takes two to four weeks. Mood and drive typically begin lifting within the first couple of weeks. Heavy, long-term, high-potency use generally means a longer runway." },
      { q: "If it's legal, how can it be addictive?", a: "Legality is a policy decision about criminalization, not a clinical finding about dependence. Alcohol and nicotine are both legal and both among the most harmful vectors there are. The virus does not read legislation." },
      { q: "Is medical cannabis different?", a: "The clinical use case can be legitimate and the dependence risk still applies — they are separate questions. If you use medically, the honest test is whether the dose and frequency have drifted beyond what the original condition required." },
      { q: "Do the 12 Steps work for cannabis?", a: "Marijuana Anonymous uses the same 12-Step framework, adapted. Because the underlying reward mechanism is the same across vectors, the framework transfers — which is the core claim of the AIV model." },
    ],
    fellowship: VECTOR_FELLOWSHIP["cannabis"],
  },

  gambling: {
    searchIntent: "I can't stop gambling",
    directAnswer:
      "Gambling is the purest form of the infection — there is no chemical at all, only the reward loop itself. The near-miss fires the same dopamine as a win, losses trigger a compulsion to chase, and since 2018 the wager moved from a casino trip to a thumb-tap during a live game. Nothing about the mechanism requires a substance.",
    signatureStage: {
      stage: "Stage 2 — Buffer overflow, on a variable schedule",
      body: "Gambling's signature is the variable reward schedule — the most addictive reinforcement pattern known to behavioral science, and the reason slot machines and sports apps are designed the way they are. The near-miss is engineered: it produces a reward response almost identical to winning, which is why 'I was so close' keeps you in the loop.",
    },
    scale: [
      { value: "$147.9B", label: "U.S. sports betting handle in 2024 — up 23.6% year over year", source: "AGA via Reuters", sourceUrl: "https://www.reuters.com/sports/us-sports-betting-soars-236-amid-alarming-rise-addiction-2025-02-21/" },
      { value: "~8%", label: "of people with a gambling disorder ever seek treatment", source: "Rutgers Addiction Research Center", sourceUrl: "https://www.addiction.rutgers.edu/about-addiction/facts-and-figures/gambling/" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "The purest hijack of the ten. Anticipation — not the win — is the payload, which is why the loop can run all night without a single reward." },
      { chemical: "Serotonin", mode: "starved", body: "Financial catastrophe, secrecy, and sleepless nights systematically dismantle the conditions steady mood depends on." },
      { chemical: "Oxytocin", mode: "starved", body: "The debt and the lying isolate you from exactly the people whose support would break the cycle." },
      { chemical: "Endorphins", mode: "starved", body: "The chase replaces physical effort with screen time, so the natural relief system goes quiet just as stress peaks." },
    ],
    selfCheck: [
      "Do you bet more than you planned, or return to win back losses?",
      "Have you lied to anyone about how much you have gambled or lost?",
      "Have you borrowed, sold, or moved money to keep betting?",
      "Do you feel restless or irritable when you try to cut back?",
      "Is gambling how you handle stress or low mood?",
      "Have you gambled money that was meant for something else — rent, bills, someone else's needs?",
    ],
    firstSevenDays: [
      { day: "Day 0", title: "Self-exclude and hand over the money", body: "This vector has a control that others do not: self-exclusion. Register with every app and casino you use, install blocking software, and put someone else in charge of the accounts for now. Remove the access before you test the willpower." },
      { day: "Days 1–2", title: "Tell one person the real number", body: "The lie is load-bearing. Saying the actual figure out loud to one trusted person removes the secrecy the loop runs on — and it is usually the hardest and most decisive step." },
      { day: "Days 1–4", title: "Expect the money panic", body: "The financial reality arrives all at once when the betting stops. That panic is the single most common relapse trigger. A payment plan or a credit counsellor is recovery work, not admin." },
      { day: "Days 2–5", title: "Fill the time deliberately", body: "Gambling occupies enormous amounts of time and attention. Left empty, that time refills itself. Movement, daylight, and something with a finish line pay dopamine you actually keep." },
      { day: "Days 3–7", title: "Get to Gamblers Anonymous", body: "Because there is no substance, this vector is easy to hide and easy to dismiss. A room full of people who recognize the pattern removes both options." },
      { day: "Day 7", title: "Then the framework", body: "The Steps handle the wreckage inventory and the amends — which in this vector are often financial and concrete." },
    ],
    faqs: [
      { q: "Is gambling addiction a real addiction if there's no substance?", a: "Yes. Gambling disorder is classified in the DSM-5 alongside substance use disorders, because imaging and behavioral research show it engages the same reward circuitry. It is the clearest available proof that addiction is a system-level problem rather than a chemistry problem." },
      { q: "Has sports betting made gambling addiction worse?", a: "The available signals point that way. Reuters reported in February 2025 that the U.S. sports betting handle rose 23.6% to $147.9 billion in 2024, and that helpline call volumes in newly legalized states climbed sharply over the same period. Correlation across many states is not proof of causation, and helpline volume also rises with awareness campaigns — but the pattern is consistent enough that clinicians have been warning about it since the 2018 legalization." },
      { q: "How do I stop if the app is on my phone?", a: "Remove the access first. Every licensed operator is required to offer self-exclusion, most states run a central self-exclusion registry, and gambling-specific blocking software covers the rest. Handing account control to someone you trust for a period is a legitimate and common step." },
      { q: "What is the near-miss effect?", a: "It is the finding that outcomes which fall just short of winning produce a reward response close to that of an actual win. Machines and interfaces are designed to generate them frequently, which is why 'so close' is one of the most reliable ways to keep someone playing." },
      { q: "Where do I get help with gambling debt?", a: "The National Council on Problem Gambling runs a free, confidential 24/7 helpline — call or text 1-800-MY-RESET (1-800-697-3738) — which can refer you to both treatment and financial counselling. Debt and the disorder need to be worked simultaneously, because the financial panic is what drives the relapse." },
    ],
    fellowship: VECTOR_FELLOWSHIP["gambling"],
  },

  pornography: {
    searchIntent: "why can't I stop watching porn",
    directAnswer:
      "Because it combines the fastest visual trigger of any vector with an effectively infinite supply of novelty, and then wraps the whole thing in shame — which removes the honesty and connection that recovery requires. The secrecy is not a side effect of the problem; it is the mechanism that keeps it running.",
    signatureStage: {
      stage: "Stage 5 — Natural rewards numb, intimacy first",
      body: "This vector's signature is that it substitutes for the very thing that would protect you. Real intimacy is effortful, uncertain, and reciprocal. Synthetic novelty is none of those things and always available — so it steadily replaces the connection that pays out oxytocin, leaving you more isolated and more vulnerable to the next episode.",
    },
    scale: [
      { value: "~100M", label: "adults globally estimated to have problematic pornography use (~3% of the global population)", source: "LJMU / Addiction, 2024", sourceUrl: "https://care.org.uk/news/2024/03/global-study-reveals-nearly-100-million-addicted-to-pornography" },
      { value: "<1%", label: "of affected adults surveyed across 42 countries had ever sought help", source: "Addiction / International Sex Survey, 2024", sourceUrl: "https://care.org.uk/news/2024/03/global-study-reveals-nearly-100-million-addicted-to-pornography" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Novelty is the payload. An endless supply of new stimuli exploits a system that evolved on scarcity, and no natural reward can compete on volume." },
      { chemical: "Oxytocin", mode: "starved", body: "The most damaging effect. It offers the appearance of intimacy while providing none of the bonding chemistry that real connection produces." },
      { chemical: "Serotonin", mode: "starved", body: "Shame and secrecy are corrosive to baseline mood, and late-night use takes the sleep that would otherwise rebuild it." },
      { chemical: "Endorphins", mode: "starved", body: "It replaces physical effort and real touch with a screen, so the systems that pay out for both go unused." },
    ],
    selfCheck: [
      "Do you use more, or for longer, than you intend to?",
      "Have you tried to stop and been unable to sustain it?",
      "Has the content escalated beyond what you would once have sought out?",
      "Do you use it to manage stress, loneliness, or boredom rather than desire?",
      "Has it affected your real relationships or your interest in them?",
      "Would you be devastated if someone you love saw your history?",
    ],
    firstSevenDays: [
      { day: "Day 0", title: "Change the environment first", body: "Filtering and blocking software on every device, phone out of the bedroom, no screens where you are alone and tired. This vector is overwhelmingly a friction problem — remove the access before testing the resolve." },
      { day: "Days 1–2", title: "Break the shame lock with one person", body: "This is the hardest and most necessary step. Secrecy is the load-bearing wall. One trusted person, a therapist, or a fellowship — the specific listener matters less than ending the isolation." },
      { day: "Days 1–4", title: "Guard the vulnerable hours", body: "Almost everyone has a predictable window — late at night, alone, tired. Change what happens in that window physically rather than trying to out-argue it in the moment." },
      { day: "Days 2–5", title: "Move, and be around people", body: "Movement pays out the endorphins the loop was borrowing; time with actual humans pays out the oxytocin it was faking. Both directly target what this vector starves." },
      { day: "Days 3–7", title: "Expect the wave, and time it", body: "A craving peaks and passes in roughly twenty minutes if you do not feed it. Knowing that it has a ceiling and an ending changes it from an emergency into weather." },
      { day: "Day 7", title: "Then the framework", body: "The Steps do the work on shame, honesty, and repairing the relationships this vector damages — which is most of the actual recovery here." },
    ],
    faqs: [
      { q: "Is pornography addiction a real diagnosis?", a: "It is not independently listed in the DSM-5. The closest formal classification is Compulsive Sexual Behaviour Disorder in the WHO's ICD-11. Clinicians disagree about the framing; what is not in dispute is that a substantial number of people report loss of control and real harm, and that treatment helps." },
      { q: "How long does it take to recover?", a: "There is no reliable published timeline, and anyone quoting a precise number is guessing. What is consistently reported is that the first two to four weeks are the hardest, that sleep and mood improve first, and that the relational repair takes considerably longer than the behavior change." },
      { q: "Is 'dopamine detox' or a reboot scientifically supported?", a: "The popular 'reboot' framing outruns the evidence — you cannot reset receptor density on a fixed schedule, and no rigorous trial supports specific day counts. The underlying advice, which is well supported, is simply abstinence plus rebuilding natural reward sources. Be skeptical of anyone selling a number." },
      { q: "Why is almost nobody getting help for this?", a: "Shame, primarily. In a 42-country study published in Addiction, fewer than 1% of affected adults had ever sought help — the widest treatment gap of any vector on this site. The privacy that makes it easy to sustain is the same privacy that keeps people out of treatment." },
      { q: "Does the 12-Step framework apply here?", a: "Yes — Sex Addicts Anonymous and Sexaholics Anonymous both use it. Because the reward mechanism is the same one every other vector exploits, the framework transfers; the inventory and amends work simply focuses on intimacy and honesty rather than substances." },
    ],
    fellowship: VECTOR_FELLOWSHIP["pornography"],
  },

  "social-media": {
    searchIntent: "am I addicted to my phone",
    directAnswer:
      "This is the only vector with a corporate engineering team optimizing it against you. The infinite feed removes every natural stopping point on purpose, and likes arrive on a variable schedule — the identical reinforcement pattern used in slot machines. You are not weak-willed; you are outnumbered.",
    signatureStage: {
      stage: "Stage 6 — Autopilot, thousands of times a day",
      body: "Social media's signature is that the loop runs below conscious awareness. The unlock-and-open happens in a gap of boredom lasting under a second, thousands of times a week, without a decision ever being made. There is no high to notice and therefore nothing obvious to quit.",
    },
    scale: [
      { value: "Dopamine pathways", label: "NIH review finds frequent engagement with algorithmic feeds alters the dopamine pathways central to reward — the same system substances act on", source: "PMC / NIH, 2025", sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11804976/" },
      { value: "No diagnosis", label: "not classified in the DSM-5 or ICD-11 — which means no agreed prevalence standard, no funded treatment pathway, and wide disagreement between studies", source: "APA DSM-5-TR", sourceUrl: "https://www.psychiatry.org/psychiatrists/practice/dsm" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Variable-ratio reinforcement — the same schedule that makes slot machines work — delivered by systems that A/B test their way to your attention." },
      { chemical: "Oxytocin", mode: "starved", body: "It impersonates connection. A feed produces the sensation of being social while delivering almost none of the bonding chemistry of actual contact." },
      { chemical: "Serotonin", mode: "starved", body: "Comparison erodes baseline mood by design, and blue light late at night takes the sleep that would rebuild it." },
      { chemical: "Endorphins", mode: "starved", body: "Hours of stillness displace the physical effort that pays out naturally — the scroll is time subtracted from movement." },
    ],
    selfCheck: [
      "Do you open an app without deciding to — before you've even registered the impulse?",
      "Do you check it within minutes of waking?",
      "Have you set a time limit for yourself and then dismissed it?",
      "Does being without your phone produce genuine anxiety?",
      "Do you feel worse after using it, and use it again anyway?",
      "Has it taken time from sleep, work, or the people physically in the room?",
    ],
    firstSevenDays: [
      { day: "Day 0", title: "Kill the notifications", body: "Turn off every non-human notification. You are removing the external trigger before you attempt to manage the internal one." },
      { day: "Days 1–2", title: "Get it out of the bedroom", body: "Charge the phone in another room. This single change protects the sleep pillar and removes both the last scroll of the night and the first of the morning." },
      { day: "Days 1–4", title: "Add friction deliberately", body: "Apps off the home screen, grayscale display, log out after each use. Every second of friction you insert is a second in which a decision becomes possible." },
      { day: "Days 2–5", title: "Replace the gap, don't just remove it", body: "The scroll fills micro-moments of boredom. Left empty they refill themselves. A book in the bag, a walk at lunch, an actual conversation." },
      { day: "Days 3–7", title: "Reclaim the reward honestly", body: "Movement, daylight, and finishing something real pay dopamine that does not crash. This is the substitution that makes the change hold beyond week one." },
      { day: "Day 7", title: "Then the framework", body: "The Steps address what the scroll was managing — comparison, ego, the need to be seen — which is the part a screen-time limit never touches." },
    ],
    faqs: [
      { q: "Is social media addiction a real clinical diagnosis?", a: "Not formally. It is not in the DSM-5 or ICD-11 as a standalone disorder, and researchers actively debate whether 'addiction' is the right frame. What research does support is that a meaningful minority of users show compulsive patterns and real harm, and that NIH work finds frequent engagement alters dopamine pathways implicated in reward." },
      { q: "How much screen time is too much?", a: "There is no validated threshold, and hours are a poor measure. The better questions are the ones in the self-check: is it automatic, does stopping produce anxiety, and is it taking from sleep and relationships. Compulsion matters more than duration." },
      { q: "Does a digital detox work?", a: "Short breaks reliably improve sleep and mood but rarely change behavior on their own, because the environment is unchanged when you return. Durable change comes from permanent friction — notifications off, phone out of the bedroom — rather than a one-off cleanse." },
      { q: "Are the platforms designed to be addictive?", a: "Their design employs variable reward schedules, infinite scroll, and algorithmic personalization — mechanisms whose reinforcing properties are well documented in behavioral science. Whether one calls that intent or optimization, the effect on the reward system is the same." },
      { q: "Is it worse for teenagers?", a: "Research consistently finds higher rates of problematic use among adolescents than adults, and NIH work published in 2025 examines how algorithmic feeds interact with still-developing reward pathways. The developing brain is a softer target." },
    ],
    fellowship: VECTOR_FELLOWSHIP["social-media"],
  },

  shopping: {
    searchIntent: "how to stop compulsive shopping",
    directAnswer:
      "The reward is in the buying, not the having — which is why the high dies the moment the box is opened and why the next order is already queued. One-click checkout and buy-now-pay-later removed the pause where second thoughts used to live, and credit hides the cost until the behavior has outrun the bank balance.",
    signatureStage: {
      stage: "Stage 2 — Buffer overflow at checkout",
      body: "Shopping's signature is that the payload fires at purchase, not possession. Anticipation, the confirmation screen, the tracking number, the doorstep — the entire dopamine sequence completes before the item is ever used. Which is why the closet is full and the craving is unchanged.",
    },
    scale: [
      { value: "~19.2M", label: "U.S. adults estimated to be affected by compulsive buying behavior", source: "Stanford / Am. J. Psychiatry", sourceUrl: "https://psychiatryonline.org/doi/10.1176/ajp.2006.163.10.1806" },
      { value: "6.0% / 5.5%", label: "prevalence in women vs. men — near equal, contradicting the stereotype", source: "Stanford", sourceUrl: "https://med.stanford.edu/news/all-news/2006/09/men-women-have-similar-rates-of-compulsive-buying-stanford-study-shows.html" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Anticipation is the entire product. Variable delivery times, surprise bundles, and flash sales are the same variable-reward architecture a slot machine uses." },
      { chemical: "Serotonin", mode: "starved", body: "Debt and clutter generate a background of low-grade dread that steadily erodes the baseline mood you are shopping to fix." },
      { chemical: "Oxytocin", mode: "starved", body: "Hidden packages and hidden statements build secrecy into the household, which corrodes exactly the relationships that would help." },
      { chemical: "Endorphins", mode: "starved", body: "Browsing displaces physical effort — hours of scrolling a storefront are hours not spent earning relief the durable way." },
    ],
    selfCheck: [
      "Do you buy things you never use, or never even unpack?",
      "Do you shop to change how you feel rather than to obtain something you need?",
      "Have you hidden purchases, packages, or statements from someone?",
      "Does the good feeling fade almost immediately after the order confirms?",
      "Have you carried debt or missed obligations because of spending?",
      "Have you tried to stop, and started again within days?",
    ],
    firstSevenDays: [
      { day: "Day 0", title: "Delete the saved cards", body: "Remove stored payment details from every app and browser, uninstall the shopping apps, unsubscribe from every promotional email. You are reinstalling the friction that one-click deleted." },
      { day: "Days 1–2", title: "Look at the real number", body: "Total the last three months. This is the equivalent of the gambler saying the figure out loud — unpleasant, clarifying, and the thing denial depends on you never doing." },
      { day: "Days 1–4", title: "Institute a waiting rule", body: "Anything non-essential goes on a list for 72 hours. Most compulsive purchases do not survive three days of daylight, and the rule converts an impulse into a decision." },
      { day: "Days 2–5", title: "Find the feeling underneath", body: "Compulsive buying is almost always regulating something — boredom, loneliness, powerlessness, anger. Name what precedes it and you have found the actual target." },
      { day: "Days 3–7", title: "Earn the chemical honestly", body: "Movement, daylight, finishing a real task. The satisfaction of completing something is the same reward the checkout button was counterfeiting." },
      { day: "Day 7", title: "Then the framework", body: "Debtors Anonymous works the Steps around money specifically, including the concrete financial amends this vector tends to require." },
    ],
    faqs: [
      { q: "Is compulsive shopping a recognized disorder?", a: "Not as an independent DSM-5 diagnosis. It is generally treated clinically as an impulse-control problem, and prevalence research — including Stanford work published in the American Journal of Psychiatry — estimates it affects roughly 5.8% of U.S. adults." },
      { q: "Isn't compulsive shopping mostly a women's problem?", a: "No, and this is one of the more persistent myths. The Stanford prevalence study found near-equal rates: about 6.0% of women and 5.5% of men. Men's compulsive buying tends to be categorized differently — tools, electronics, collectibles — which hides it." },
      { q: "How is this different from just liking to shop?", a: "By loss of control and consequence. Enjoying shopping does not involve hiding purchases, carrying debt for it, failing repeatedly to stop, or feeling the reward vanish at the moment of purchase. The self-check above is about the loop, not the spending." },
      { q: "Has buy-now-pay-later made it worse?", a: "It removes the two remaining brakes: the immediate cost and the credit check. There is not yet a strong longitudinal evidence base on its effect on compulsive buying specifically, but mechanically it eliminates the friction that previously interrupted the loop." },
      { q: "What actually treats it?", a: "Cognitive behavioural therapy has the strongest support, typically alongside practical financial controls and, where relevant, treatment for co-occurring depression or anxiety. Debtors Anonymous provides the free peer-support layer." },
    ],
    fellowship: VECTOR_FELLOWSHIP["shopping"],
  },

  work: {
    searchIntent: "is work addiction real",
    directAnswer:
      "Yes — and it is the only vector people list on a resume. Work addiction uses productivity as camouflage while it consumes health, relationships, and identity. Because every symptom is culturally rewarded, it is typically the last one anyone confronts, and there is no helpline for it.",
    signatureStage: {
      stage: "Stage 7 — Full infection, applauded",
      body: "Work's signature is that the environment reinforces the disease. Every other vector eventually attracts concern; this one attracts promotions. The virus disguises itself as virtue, so the feedback that would normally interrupt the loop arrives as praise instead.",
    },
    scale: [
      { value: "~14–15%", label: "pooled prevalence of workaholism across 53 studies (71,625 people, 23 countries) — roughly one in seven working adults", source: "Meta-analysis, Frontiers in Psychology (2023)", sourceUrl: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1252373/full" },
      { value: "No federal resources", label: "there is no national helpline or funded treatment pathway for work addiction", source: "Work Addiction Research", sourceUrl: "https://workaddiction.org/prevalence/" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Achievement genuinely pays out — which is what makes this vector so effective. The hit is real, repeatable, and socially subsidized." },
      { chemical: "Serotonin", mode: "starved", body: "Chronic cortisol, skipped meals, and short sleep dismantle the baseline that steady mood is built on." },
      { chemical: "Oxytocin", mode: "starved", body: "It systematically converts relationship time into work time, hollowing out the connection that would otherwise buffer the stress." },
      { chemical: "Endorphins", mode: "starved", body: "Movement is the first thing cut when the calendar fills, removing the most reliable natural relief exactly when it is most needed." },
    ],
    selfCheck: [
      "Do you work well beyond what your role actually requires?",
      "Does stopping produce anxiety, guilt, or irritability rather than relief?",
      "Do weekends and holidays feel worse rather than better?",
      "Have people close to you said you are never present, more than once?",
      "Do you use work to avoid something at home or inside?",
      "Has your health measurably suffered and you have carried on anyway?",
    ],
    firstSevenDays: [
      { day: "Days 1–2", title: "Set a hard stop and keep it once", body: "Not a policy — one evening. Most people discover the anxiety that surfaces when they stop is the actual problem, and it needs to be felt before it can be addressed." },
      { day: "Days 1–3", title: "Protect sleep as a work input", body: "If the identity is built on performance, use it: sleep debt measurably degrades judgement and output. Seven hours is a professional decision, not a moral one." },
      { day: "Days 2–5", title: "Move every day, non-negotiably", body: "Movement is the first casualty of an over-full calendar and the fastest route back to a stable baseline. Twenty minutes outdoors counts." },
      { day: "Days 3–6", title: "Put one relationship back on the calendar", body: "Schedule a person the way you would schedule a meeting. This vector starves oxytocin more efficiently than almost any other, and the repair has to be as deliberate as the damage was." },
      { day: "Days 4–7", title: "Find what the work is outrunning", body: "Constant busyness is frequently avoidance with a respectable cover story. Naming what goes quiet when you stop is the whole diagnostic." },
      { day: "Day 7", title: "Then the framework", body: "Workaholics Anonymous works the same Steps. The ego and control material in Steps 1 through 3 is unusually direct for this vector." },
    ],
    faqs: [
      { q: "Is workaholism an actual medical diagnosis?", a: "No. It has no DSM-5 classification and no formal diagnostic criteria, which is part of why it goes unaddressed. It is nonetheless well studied — a systematic review across 53 studies covering more than 71,000 people in 23 countries put pooled prevalence at roughly 14 to 15%." },
      { q: "What's the difference between working hard and work addiction?", a: "Control and cost. Hard work is chosen, bounded, and can be stopped without distress. Work addiction cannot be stopped without anxiety, continues despite clear damage to health and relationships, and is often used to avoid feeling something else." },
      { q: "Which professions are most affected?", a: "Reported prevalence is highest among lawyers, physicians, scientists, and executives — fields where long hours are treated as evidence of commitment and where the identity is closely fused with the output." },
      { q: "Why is there no treatment for it?", a: "Because it lacks a diagnosis, there is no billing code, no funded pathway, and no national helpline. Practically, treatment happens through therapy addressing the underlying anxiety or avoidance, plus Workaholics Anonymous for peer support." },
      { q: "Can you recover without changing jobs?", a: "Often, yes. The target is the compulsion rather than the career. That said, if a workplace demands the pattern as a condition of employment, the environment is part of the problem and pretending otherwise rarely works." },
    ],
    fellowship: VECTOR_FELLOWSHIP["work"],
  },

  gaming: {
    searchIntent: "is gaming disorder real",
    directAnswer:
      "Yes — the World Health Organization formally recognized Gaming Disorder in the ICD-11 in 2019. Modern games borrow gambling's exact reward mechanics: loot boxes, daily streaks, and endless progression, engineered so that engagement is compulsive rather than merely fun.",
    signatureStage: {
      stage: "Stage 5 — Natural rewards numb",
      body: "Gaming's signature is that it offers a better-designed world than the one outside it. Progress is legible, effort is always rewarded, and status is achievable — none of which is reliably true of school, work, or relationships. Once real life feels flat by comparison, the retreat is rational from the inside.",
    },
    scale: [
      { value: "2019", label: "the year the WHO formally recognized Gaming Disorder in the ICD-11", source: "World Health Organization", sourceUrl: "https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder" },
      { value: "18–34", label: "the age group most affected, with higher rates among males", source: "Multiple clinical estimates", sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11925544/" },
    ],
    dose: [
      { chemical: "Dopamine", mode: "hijacked", body: "Loot boxes and randomized drops import slot-machine psychology directly into play, on top of a progression system with no natural end." },
      { chemical: "Oxytocin", mode: "hijacked", body: "Uniquely, this vector partly supplies what it takes. Guilds and voice chat are real social bonds — which is why 'just stop playing' can mean losing an entire community, and why replacing it matters more here than elsewhere." },
      { chemical: "Serotonin", mode: "starved", body: "Late-night sessions and screen light in the sleep window degrade the base that steady mood is built on." },
      { chemical: "Endorphins", mode: "starved", body: "Long stationary sessions displace physical effort almost completely, and the body notices before the mind does." },
    ],
    selfCheck: [
      "Do you play far longer than you intended, most times you start?",
      "Have you lost sleep, meals, or deadlines to it repeatedly?",
      "Do you feel irritable or empty when you cannot play?",
      "Have you deceived anyone about how much you play?",
      "Do you play to escape a mood rather than for enjoyment?",
      "Has it damaged a relationship, a job, or your schooling — and continued anyway?",
    ],
    firstSevenDays: [
      { day: "Days 1–2", title: "Keep the people, change the pattern", body: "If your friends are in the game, do not cut them off — that turns recovery into exile. Move the contact somewhere else first: a group chat, a call, an in-person plan." },
      { day: "Days 1–3", title: "Reclaim the sleep window", body: "Consoles and PCs out of the bedroom, hard stop ninety minutes before bed. Sleep is the pillar this vector damages fastest and the one that most improves the rest." },
      { day: "Days 2–4", title: "Uninstall the worst one, not all of them", body: "Total abstinence is rarely necessary and often fails. Identify the single title with the streaks, loot boxes, and daily obligations — the one engineered for compulsion — and remove that one." },
      { day: "Days 3–6", title: "Move, in daylight", body: "Long sessions mean the body has been still for months. Twenty minutes outdoors starts restoring both the dopamine baseline and the sleep cycle." },
      { day: "Days 4–7", title: "Put something real on the ladder", body: "The pull is legible progress. Give it a genuine target — a skill, a gym program, a course — that pays out in the same measurable way the game did." },
      { day: "Day 7", title: "Then the framework", body: "The Steps address the escape itself: what is being avoided, and what it will take to make the outside world worth being present for." },
    ],
    faqs: [
      { q: "Is gaming disorder officially recognized?", a: "Yes. The World Health Organization included Gaming Disorder in the ICD-11, which took effect in 2022. It requires impaired control, escalating priority over other interests, and continuation despite negative consequences, generally over at least twelve months." },
      { q: "How much gaming is too much?", a: "The ICD-11 criteria are about impairment rather than hours. A person playing twenty hours a week without harm to sleep, work, or relationships is in different territory from someone playing ten who is failing school and lying about it." },
      { q: "Are loot boxes gambling?", a: "Mechanically they share the defining feature — paying for a randomized reward. Several countries have restricted or banned them on that basis; others have not. Regulatory status varies, but the reward architecture is the same one gambling uses." },
      { q: "Should parents ban gaming entirely?", a: "Blanket bans tend to backfire, particularly where the game is the child's main social world. What the evidence supports better is protecting sleep, keeping devices out of bedrooms, targeting the specific compulsion-engineered titles, and ensuring there is a real-world alternative that offers comparable status and progress." },
      { q: "Is there a 12-Step group for gaming?", a: "Yes — Computer Gaming Addicts Anonymous and Internet & Technology Addicts Anonymous both run free meetings, largely online, using the same framework." },
    ],
    fellowship: VECTOR_FELLOWSHIP["gaming"],
  },
};

export function getDepth(slug: string): VectorDepth | undefined {
  return vectorDepth[slug];
}
