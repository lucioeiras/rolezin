/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.4',
        port: '3333',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
