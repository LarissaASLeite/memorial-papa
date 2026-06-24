import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next.js Image component to serve local public/ images
  images: {
    unoptimized: false,
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
