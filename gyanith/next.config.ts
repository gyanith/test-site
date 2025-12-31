import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compiler: {
    styledJsx: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;