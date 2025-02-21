import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", 
      },
    ],
    unoptimized: true, 
  },
};

export default nextConfig;
