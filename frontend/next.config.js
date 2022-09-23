/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["localhost:3000"],
  }

}

module.exports = nextConfig
