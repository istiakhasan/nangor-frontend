/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",          // must be empty string
        pathname: "/**",   // allow all image paths
      },
    ],
    formats: ["image/avif", "image/webp"], // modern formats for optimization
    unoptimized: false,                    // ✅ keep optimization enabled
  },
};

export default nextConfig;
