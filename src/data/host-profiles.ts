// ---------------------------------------------------------------------------
// The five host profiles + the four recovery stages.
//
// Moved out of DiagnosticWizard.tsx (2026-07-25) so the client wizard and the
// server-rendered /scan readout share one definition instead of duplicating it.
//
// These are editorial framing devices for self-awareness — a way of naming the
// shape of a person's particular vulnerability. They are explicitly NOT a
// clinical instrument and the copy says so on the readout.
// ---------------------------------------------------------------------------

export type ProfileKey = "A" | "B" | "C" | "D" | "E";

export interface HostProfile {
  emoji: string;
  name: string;
  who: string;
  /** The characteristic rationalization this profile falls for. */
  lie: string;
  /** The counter-move, phrased as a daily practice. */
  fix: string;
  /** Which D.O.S.E. pillar this profile most reliably neglects. */
  weakPillar: string;
}

export const HOST_PROFILES: Record<ProfileKey, HostProfile> = {
  A: {
    emoji: "🦅",
    name: "The Eagle",
    who: "The Founder",
    lie: "“It's a performance enhancer — use it to work longer.”",
    fix: "The Rest Mandate: track sleep and resting heart rate, and shut the terminal at curfew.",
    weakPillar: "Sleep",
  },
  B: {
    emoji: "🐘",
    name: "The Elephant",
    who: "The Martyr",
    lie: "“Look at all you carry. You deserve an escape.”",
    fix: "The Boundary Toggle: did I say no to something today in order to protect my recovery?",
    weakPillar: "Breath",
  },
  C: {
    emoji: "🐢",
    name: "The Turtle",
    who: "The Escapist",
    lie: "“Sit in silence and the memories catch you. Numb out.”",
    fix: "Somatic grounding: 15-minute walks, cold water, and breath — get back into the body.",
    weakPillar: "Movement",
  },
  D: {
    emoji: "🦎",
    name: "The Chameleon",
    who: "The Validator",
    lie: "“You're boring sober. Take this so they'll accept you.”",
    fix: "A radical-honesty log plus anonymous service work — value that nobody is watching.",
    weakPillar: "Connection",
  },
  E: {
    emoji: "🐅",
    name: "The Tiger",
    who: "The Saboteur",
    lie: "“Routine is boring. Blow it up to feel alive.”",
    fix: "Extreme friction: cold plunges and Zone 2 work — channel the charge instead of detonating it.",
    weakPillar: "Movement",
  },
};

export function getProfile(key: string | undefined): HostProfile | undefined {
  if (!key) return undefined;
  return HOST_PROFILES[key.toUpperCase() as ProfileKey];
}

export type StageKey = "trench" | "stabilizing" | "baseline" | "vanguard";

export interface Stage {
  key: StageKey;
  label: string;
  range: string;
  /** What this stage's actual job is — the thing to stop trying to do everything else. */
  job: string;
  /** Three moves, biology first, appropriate to the stage. */
  moves: { title: string; body: string }[];
}

export const STAGES: Record<StageKey, Stage> = {
  trench: {
    key: "trench",
    label: "In the Trench",
    range: "0–90 days",
    job: "Survive the day and stabilize the hardware. Nothing else is your job right now — not fixing your life, not making amends, not understanding yourself. Sleep, food, water, movement, and one other human being.",
    moves: [
      {
        title: "Get medically safe first",
        body: "If you are physically dependent on alcohol or benzodiazepines, unmanaged withdrawal can be dangerous. Talk to a doctor or urgent care about a taper before you change anything else. This is the one step that comes before biology.",
      },
      {
        title: "Protect sleep and water above all",
        body: "Every craving is louder in a body that is exhausted and dehydrated. You are not trying to feel good yet — you are trying to remove the conditions the virus needs. Seven hours and eight glasses beats any amount of resolve.",
      },
      {
        title: "Tell one person, today",
        body: "Isolation is the precondition, not a side effect. One meeting, one call, one honest sentence. This is the oxytocin pillar and it is the one people skip in week one.",
      },
    ],
  },
  stabilizing: {
    key: "stabilizing",
    label: "Stabilizing",
    range: "3–12 months",
    job: "Convert survival into a system. The acute danger has passed and the real risk is now complacency — the quiet drift back into the conditions that made you vulnerable in the first place.",
    moves: [
      {
        title: "Make movement non-negotiable",
        body: "Daily movement is what reinstalls the reward receptors the substance burned out. At this stage it stops being optional and becomes the load-bearing habit — twenty minutes outdoors, every day, especially the flat ones.",
      },
      {
        title: "Fix the food, not just the abstinence",
        body: "Most of your serotonin is manufactured in the gut, and early recovery diets are usually sugar and caffeine. Protein, fibre, and fermented food are the raw materials for a steady baseline mood.",
      },
      {
        title: "Start the framework properly",
        body: "With the body coming back online, the Steps can now do the deeper work on resentment, ego, and wreckage. Biology first was never a rejection of the Steps — this is the point it was building toward.",
      },
    ],
  },
  baseline: {
    key: "baseline",
    label: "Solid Baseline",
    range: "1–5 years",
    job: "Hold the line and start giving it away. The threat at this stage is not craving — it is the slow erosion of the practices that got you here, usually justified by how well you are doing.",
    moves: [
      {
        title: "Audit the pillar you've quietly dropped",
        body: "Almost nobody keeps all four. Look honestly at Movement, Sleep, Nutrition and Breath and find the one that has been sliding for months. That one is your actual risk.",
      },
      {
        title: "Take on someone newer than you",
        body: "Service is not charity — it is the strongest protective factor available to you, and it is measurable. You keep this by giving it away.",
      },
      {
        title: "Watch for the vector swap",
        body: "This is the stage where the virus most often changes strain — from the original substance to work, screens, spending, or the gym. Same architecture, more respectable payload. Run the scan again on a different vector.",
      },
    ],
  },
  vanguard: {
    key: "vanguard",
    label: "Vanguard",
    range: "5+ years",
    job: "Carry the standard and stay honest about your own baseline. Long-term recovery fails quietly, through drift and ego, far more often than it fails dramatically.",
    moves: [
      {
        title: "Re-run your own diagnostics",
        body: "Time sober is not the same as a healthy baseline. Track sleep, movement, and mood as data rather than assuming years of abstinence have settled the question.",
      },
      {
        title: "Guard against the applauded vector",
        body: "Work is the strain nobody will warn you about, because every symptom looks like virtue. If your identity has fused with your output, that is the same architecture wearing a better suit.",
      },
      {
        title: "Sponsor, and mean it",
        body: "The most reliable anchor at this stage is being genuinely responsible to someone earlier in it. It keeps the memory accurate, which is the thing that fades first.",
      },
    ],
  },
};

export function getStage(key: string | undefined): Stage {
  if (key && key in STAGES) return STAGES[key as StageKey];
  return STAGES.trench;
}
