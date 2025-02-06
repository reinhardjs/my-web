/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    outputStandalone: true
  },
  images: {
    domains: [
      'picsum.photos',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
    ],
  }
}

module.exports = nextConfig