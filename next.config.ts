import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      // Keyword-matched product photos (fetched by product type)
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "*.staticflickr.com" },
    ],
  },
};

export default nextConfig;
