import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aivirus.org";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/the-virus`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/bio12`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
