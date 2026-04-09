import type { NextConfig } from "next";

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
      {
        protocol: "https",
        hostname: "tough-bullfrog-76.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "peaceful-capybara-929.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
