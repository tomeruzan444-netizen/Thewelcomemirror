import type { NextConfig } from "next";
import { site } from "./lib/site";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    // כל עוד האתר חסום: כותרת noindex על כל קובץ (כולל llms.txt, sitemap ותמונות)
    if (!site.allowIndexing) {
      return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
    }
    // כתובות פריסה של Vercel (*.vercel.app) לא נכנסות לגוגל - רק הדומיין הראשי
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }];
  },
  async redirects() {
    const siteHost = new URL(site.url).host;
    // הכתובות הקבועות של Vercel מפנות לדומיין הראשי, כדי שלאתר תהיה כתובת אחת בלבד
    const aliasHosts = ["thewelcomemirror.vercel.app", "thewelcomemirror-tomer7.vercel.app", "thewelcomemirror-git-main-tomer7.vercel.app"];
    const toMain = siteHost.endsWith(".vercel.app") ? [] : aliasHosts.map((h) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: h.replace(/\./g, "\\.") }],
      destination: `${site.url}/:path*`,
      permanent: true,
    }));
    return [
      ...toMain,
      { source: "/selfie-mirror-:event", destination: "/welcome-mirror-:event", permanent: true },
      { source: "/reception-mirror", destination: "/welcome-mirror-events", permanent: true },
    ];
  },
};

export default nextConfig;
