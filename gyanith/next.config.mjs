/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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
  output: "standalone",
};

export default nextConfig;
