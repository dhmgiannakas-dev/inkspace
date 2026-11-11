import type { NextConfig } from "next";

/** Configures Next.js image optimization. */
const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.guim.co.uk",
      },
      {
        protocol: "https",
        hostname: "static.guim.co.uk",
      },
      {
        protocol: "http",
        hostname: "static.guim.co.uk",
      },
    ],
  },
};

export default nextConfig;