/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ✨ this is the key line to ignore TS build errors
  },
};

module.exports = nextConfig;

