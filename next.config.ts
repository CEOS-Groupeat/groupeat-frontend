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
        pathname: '/**', // 해당 버킷의 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
