import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      // Add your DigitalOcean Spaces / CDN hostname here when you go live
    ],
  },
};

export default nextConfig;
