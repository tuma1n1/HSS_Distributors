import type { NextConfig } from "next";

const strapi = new URL(process.env.STRAPI_URL ?? "http://localhost:1337");
const strapiIsLocal = ["localhost", "127.0.0.1", "[::1]"].includes(strapi.hostname);

const nextConfig: NextConfig = {
  images: {
    // Next 16 refuses to optimize images from private IPs by default, which breaks a local Strapi.
    dangerouslyAllowLocalIP: strapiIsLocal,
    remotePatterns: [
      {
        protocol: strapi.protocol === "https:" ? "https" : "http",
        hostname: strapi.hostname,
        port: strapi.port,
        pathname: "/uploads/**",
      },
      // Add your DigitalOcean Spaces / CDN hostname here when you go live
    ],
  },
};

export default nextConfig;
