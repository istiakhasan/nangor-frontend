/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
    unoptimized: false, // keep optimization enabled
  },
  reactStrictMode: true,
};

export default nextConfig;
