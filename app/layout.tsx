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
  openGraph: {
    title: '그루핏(Groupeat)',
    description: '행사에 딱 맞는 음식을 가장 쉽고 빠르게',
    url: 'https://groupeat.co.kr',
    siteName: 'Groupeat',
    images: [
      {
        url: '/public/images/OpenGraph.png',
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
      <body className="min-h-full flex">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
