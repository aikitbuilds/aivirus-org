// ---------------------------------------------------------------------------
// The contract between the diagnostic wizard and the /scan readout.
//
// Deliberately passed through sessionStorage rather than the URL query string.
// A readout URL like /scan?v=pornography&sober=2019-04-02 would be written to
// Firebase Hosting access logs, to browser history, and to cross-device history
// sync. For this content that is a privacy leak, and a shareable link to your
// own addiction profile is a liability rather than a feature. sessionStorage
// stays on the device and dies with the tab.
// ---------------------------------------------------------------------------

import type { ProfileKey, StageKey } from "./host-profiles";

export const SCAN_KEY = "aiv.scan.v1";

export interface ScanResult {
  /** Primary vector slug. */
  v: string;
  /** Optional secondary vector slug — comorbidity is the norm. */
  v2?: string;
  profile: ProfileKey;
  stage: StageKey;
  /** ISO yyyy-mm-dd, optional. */
  sober?: string;
}

/** Reads and validates the stored result. Returns null on anything unexpected. */
export function readScanResult(): ScanResult | null {
  try {
    const raw = sessionStorage.getItem(SCAN_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const r = parsed as Partial<ScanResult>;
    if (typeof r.v !== "string" || !r.v) return null;
    return {
      v: r.v,
      v2: typeof r.v2 === "string" ? r.v2 : undefined,
      profile: (r.profile ?? "A") as ProfileKey,
      stage: (r.stage ?? "trench") as StageKey,
      sober: typeof r.sober === "string" ? r.sober : undefined,
    };
  } catch {
    return null;
  }
}
