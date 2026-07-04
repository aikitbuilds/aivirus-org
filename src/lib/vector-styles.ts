import {
  Wine, Pill, Cigarette, Leaf, Dices, Eye, Smartphone, ShoppingBag, Briefcase, Gamepad2, Biohazard,
} from "lucide-react";
import type { ComponentType } from "react";
import type { AccentKey } from "@/data/vectors";

type IconProps = { size?: number; className?: string; strokeWidth?: number };

// Icon name (stored on each vector) -> lucide component. Biohazard is the
// fallback so a bad/missing name can never crash a render.
export const ICONS: Record<string, ComponentType<IconProps>> = {
  Wine, Pill, Cigarette, Leaf, Dices, Eye, Smartphone, ShoppingBag, Briefcase, Gamepad2, Biohazard,
};

export function iconFor(name: string): ComponentType<IconProps> {
  return ICONS[name] ?? Biohazard;
}

export interface AccentClasses {
  text: string;   // 400 shade — body accents
  strong: string; // 500 shade — headlines
  bg: string;     // translucent fill
  border: string; // border
  glow: string;   // box-shadow glow
  dot: string;    // solid dot
}

// Literal class strings (never template-built) so Tailwind's static scanner
// picks up every utility. Keys match AccentKey in data/vectors.ts.
export const ACCENTS: Record<AccentKey, AccentClasses> = {
  red:     { text: "text-red-400",     strong: "text-red-500",     bg: "bg-red-500/10",     border: "border-red-500/40",     glow: "shadow-[0_0_25px_rgba(239,68,68,0.18)]",   dot: "bg-red-500" },
  orange:  { text: "text-orange-400",  strong: "text-orange-500",  bg: "bg-orange-500/10",  border: "border-orange-500/40",  glow: "shadow-[0_0_25px_rgba(249,115,22,0.18)]",  dot: "bg-orange-500" },
  amber:   { text: "text-amber-400",   strong: "text-amber-500",   bg: "bg-amber-500/10",   border: "border-amber-500/40",   glow: "shadow-[0_0_25px_rgba(245,158,11,0.18)]",  dot: "bg-amber-500" },
  lime:    { text: "text-lime-400",    strong: "text-lime-500",    bg: "bg-lime-500/10",    border: "border-lime-500/40",    glow: "shadow-[0_0_25px_rgba(132,204,22,0.18)]",  dot: "bg-lime-500" },
  emerald: { text: "text-emerald-400", strong: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/40", glow: "shadow-[0_0_25px_rgba(16,185,129,0.18)]",  dot: "bg-emerald-500" },
  pink:    { text: "text-pink-400",    strong: "text-pink-500",    bg: "bg-pink-500/10",    border: "border-pink-500/40",    glow: "shadow-[0_0_25px_rgba(236,72,153,0.18)]",  dot: "bg-pink-500" },
  cyan:    { text: "text-cyan-400",    strong: "text-cyan-500",    bg: "bg-cyan-500/10",    border: "border-cyan-500/40",    glow: "shadow-[0_0_25px_rgba(6,182,212,0.18)]",   dot: "bg-cyan-500" },
  fuchsia: { text: "text-fuchsia-400", strong: "text-fuchsia-500", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/40", glow: "shadow-[0_0_25px_rgba(217,70,239,0.18)]",  dot: "bg-fuchsia-500" },
  blue:    { text: "text-blue-400",    strong: "text-blue-500",    bg: "bg-blue-500/10",    border: "border-blue-500/40",    glow: "shadow-[0_0_25px_rgba(59,130,246,0.18)]",  dot: "bg-blue-500" },
  violet:  { text: "text-violet-400",  strong: "text-violet-500",  bg: "bg-violet-500/10",  border: "border-violet-500/40",  glow: "shadow-[0_0_25px_rgba(139,92,246,0.18)]",  dot: "bg-violet-500" },
};
