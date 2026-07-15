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
        hostname: 'd2f1i7fluhpn2d.cloudfront.net',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'groupeat-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        // 로컬 테스트용이나 임시 이미지 도메인이 있다면 추가
        protocol: 'https',
        hostname: 'groupeat-prod-uploads-025042199776-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net', // 모든 CloudFront 도메인 허용
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
