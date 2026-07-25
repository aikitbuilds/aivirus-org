import type { MetadataRoute } from "next";
import { vectors } from "@/data/vectors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aivirus.org";
  const now = new Date();

  // The ten vector pages are the site's organic-traffic engine — each one
  // targets a distinct high-intent search. They were missing from the sitemap
  // entirely, so they are generated from the data rather than hand-listed
  // (a new vector then can't be forgotten).
  const vectorPages: MetadataRoute.Sitemap = vectors.map((v) => ({
    url: `${base}/the-virus/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/the-virus`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/data`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...vectorPages,
    { url: `${base}/bio12`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/trench`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
