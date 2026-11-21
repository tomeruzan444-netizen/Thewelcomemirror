import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { topics } from "@/lib/topics";
import { absoluteUrl } from "@/lib/site";
import { instagramPosts } from "@/lib/instagram";
import { gallery } from "@/lib/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // תמונות לסייטמאפ (Google Images): התמונות שמופיעות בעמוד הבית ובגלריה
  const photos = [...new Set([...gallery.map((g) => g.src), ...instagramPosts.map((p) => p.image)])].map((src) => absoluteUrl(src));
  const signPhotos = ["wedding-reception-sign-pink-orange", "bachelorette-party-sign-easel", "wedding-welcome-sign-line-illustrations"].map((n) => absoluteUrl(`/signs/${n}.jpg`));
  const withImages = new Set(["/", "/gallery", "/event-welcome-sign"]);
  const main = ["/", "/design-your-mirror", "/services", "/questionnaire", "/gallery", "/event-welcome-sign", "/faq", "/contact", "/accessibility", "/privacy"].map((p, i) => ({
    url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: i === 0 ? 1 : 0.7,
    ...(withImages.has(p) ? { images: p === "/event-welcome-sign" ? [...signPhotos, ...photos] : photos } : {}),
  }));
  const svc = [...topics, ...services].map((s) => ({ url: absoluteUrl(`/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 }));
  return [...main, ...svc];
}
