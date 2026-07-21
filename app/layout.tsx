import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // themeColor: '#ffffff', // 브라우저 상단 상태바 색상 (브랜드 컬러로 변경 가능)
};

export const metadata: Metadata = {
  metadataBase: new URL('https://groupeat.co.kr'),
  title: {
    template: '%s | 그루핏(Groupeat)',
    default: '단체 주문의 고민이 멈추는 곳 - 그루핏(Groupeat)',
  },
  description: '행사에 딱 맞는 음식을 가장 쉽고 빠르게',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-196x196.png', sizes: '196x196', type: 'image/png' },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-touch-icon-167x167.png', sizes: '167x167' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
  },
  other: {
    'msapplication-TileColor': '#F35C32',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml',
  },
  openGraph: {
    title: '그루핏(Groupeat)',
    description: '행사에 딱 맞는 음식을 가장 쉽고 빠르게',
    url: 'https://groupeat.co.kr',
    siteName: 'Groupeat',
    images: [
      {
        url: '/images/OpenGraph.png',
        width: 1200,
        height: 630,
        alt: '그루핏 대표 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-['Pretendard'] bg-[#F0F0F1]">
        <div className="w-full min-h-full flex justify-center">
          <div className="w-[375px] min-h-full relative shadow-xl">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
