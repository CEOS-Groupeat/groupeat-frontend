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
      // 백엔드 이미지 도메인 추가하기 !
      // {
      //   protocol: 'https',
      //   hostname: '백엔드 이미지 도메인',
      // },
    ],
  },
};

export default nextConfig;
