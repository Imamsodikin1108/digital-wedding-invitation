import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      // Pixabay audio CDN (used for demo background music)
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "swiper"],
  },
};

export default nextConfig;
