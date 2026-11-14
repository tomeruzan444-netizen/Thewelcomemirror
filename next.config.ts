import type { NextConfig } from "next";
import { site } from "./lib/site";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // כל עוד האתר חסום: כותרת noindex על כל קובץ (כולל llms.txt, sitemap ותמונות)
  async headers() {
    if (site.allowIndexing) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
  },
  async redirects() {
    return [
      { source: "/selfie-mirror-:event", destination: "/welcome-mirror-:event", permanent: true },
      { source: "/reception-mirror", destination: "/welcome-mirror-events", permanent: true },
    ];
  },
};

export default nextConfig;
