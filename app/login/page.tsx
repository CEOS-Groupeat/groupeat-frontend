'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoText from '@/public/images/image_logo_text_brand.svg';
import NaverLoginButton from '@/public/components/loginbutton_naver.svg';
import KakaoLoginButton from '@/public/components/loginbutton_kakao.svg';
import GoogleLoginButton from '@/public/components/loginbutton_google.svg';
import OwnerInfoModal from './_components/OwnerInfoModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleLogin = (provider: 'naver' | 'kakao' | 'google') => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${url}/api/auth/oauth2/authorize/${provider}`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col px-4 overflow-hidden">
      <div className="absolute inset-0 z-hide">
        <Image
          src="/illust/illust_login.png"
          alt="로그인 배경화면"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center mt-[42dvh]">
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col items-center gap-2.5">
            <LogoText />
            <h1 className="text-[#777A83] text-body font-medium leading-6">
              우리 행사에 딱 맞는 단체주문 음식점 찾기
            </h1>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            {/* 소셜 로그인 버튼 영역 */}
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleLogin('kakao')}
                  className="w-full flex flex-col items-center transition-opacity cursor-pointer"
                >
                  <KakaoLoginButton className="w-full h-auto" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLogin('naver')}
                  className="w-full flex flex-col items-center transition-opacity cursor-pointer"
                >
                  <NaverLoginButton className="w-full h-auto" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLogin('google')}
                  className="w-full flex flex-col items-center transition-opacity cursor-pointer"
                >
                  <GoogleLoginButton className="w-full h-auto" />
                </button>
              </div>
            </div>

            <Link
              href="/customer/home?modal=intro"
              className="flex mt-9 pl-4.5 pr-4 py-2 justify-center items-center gap-1 transition-opacity cursor-pointer border border-border-default bg-background-default shadow-[6px_6px_54px_0_rgba(0,0,0,0.03)] rounded-full"
            >
              <p className="text-text-subtle text-label1 font-semibold">
                서비스 둘러보기 →
              </p>
            </Link>

            {/* 하단 네비게이션 링크 영역 */}
            <div className="w-full flex items-center justify-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-text-subtlest text-label2 underline underline-offset-2 decoration-1 hover:text-brand-hover transition-colors"
              >
                사장님이신가요?
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <OwnerInfoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
