import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async headers() {
    const headers = [
      {
        key: 'Content-Security-Policy',
        value: [
          "frame-ancestors 'self' https://*.vercel.app",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
          "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
          "img-src 'self' data: blob: https://www.google-analytics.com https://*.public.blob.vercel-storage.com",
        ].join('; '),
      },
    ]
    return [
      {
        source: '/((?!admin).*)',
        headers,
      },
    ]
  },
}

export default withPayload(nextConfig)
