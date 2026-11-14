import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { topics } from "@/lib/topics";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main = ["/", "/design-your-mirror", "/services", "/questionnaire", "/gallery", "/contact"].map((p, i) => ({
    url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: i === 0 ? 1 : 0.7,
  }));
  const svc = [...topics, ...services].map((s) => ({ url: absoluteUrl(`/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 }));
  return [...main, ...svc];
}
