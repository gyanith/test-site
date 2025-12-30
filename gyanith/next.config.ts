import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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

  allowedDevOrigins: ["*"],
};

export default nextConfig;
