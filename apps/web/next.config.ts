import type { NextConfig } from "next";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
const convexHostname = convexUrl ? new URL(convexUrl).hostname : "";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(convexHostname
        ? [
            {
              protocol: "https" as const,
              hostname: convexHostname,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
