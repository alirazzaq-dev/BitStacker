/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['bitstacker.netlify.app']
}

}

module.exports = nextConfig
