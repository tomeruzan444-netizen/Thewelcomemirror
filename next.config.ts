import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/selfie-mirror-:event", destination: "/welcome-mirror-:event", permanent: true },
      { source: "/reception-mirror", destination: "/welcome-mirror-events", permanent: true },
    ];
  },
};

export default nextConfig;
