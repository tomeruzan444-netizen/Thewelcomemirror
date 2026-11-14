import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** סורקים של מנועי חיפוש ומנועי AI שמקבלים גישה מפורשת לכל האתר */
const AI_BOTS = [
  "Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User",
  "Applebot", "Applebot-Extended", "CCBot", "meta-externalagent", "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
