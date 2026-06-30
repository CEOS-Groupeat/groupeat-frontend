import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'groupeat-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**', // This allows all image paths from this specific bucket
      },
    ],
  },
};

export default nextConfig;
