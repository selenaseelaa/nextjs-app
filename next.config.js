// Load environment variables from .env file tambah aja
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  // You can add other Next.js configuration options here
};

module.exports = nextConfig;
