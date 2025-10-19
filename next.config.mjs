// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co"], // ✅ whitelist your image host
  },
};

export default nextConfig; // ✅ use export default instead of module.exports
