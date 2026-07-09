import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://aivirus.org/sitemap.xml",
    host: "https://aivirus.org",
  };
}
