/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' and 'distDir: out' since we need server-side API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig
