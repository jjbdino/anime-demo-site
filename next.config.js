/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/anime',
        destination: '/'
      }
    ]
  },
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kitsu.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
