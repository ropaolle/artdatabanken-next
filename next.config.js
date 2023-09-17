/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'yeebxkyqwarhmbfpkgir.supabase.co'
      },
    ]
  }
}

module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer(nextConfig)

