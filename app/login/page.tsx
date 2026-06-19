'use client';

import Link from 'next/link';
import NaverLoginButton from '@/public/icons/icon_login_naver.svg';
import KakaoLoginButton from '@/public/icons/icon_login_kakao.svg';
import GoogleLoginButton from '@/public/icons/icon_login_google.svg';
import CheckLinear from '@/public/icons/icon_check_linear.svg';
import Close from '@/public/icons/icon_close.svg';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // 컴포넌트 언마운트 시 초기화 (안전장치)
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleLogin = (
    provider: 'naver' | 'kakao' | 'google',
    memberType: 'CUSTOMER' | 'BUSINESS'
  ) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${url}/api/auth/oauth2/authorize/${provider}?memberType=${memberType}`;
  };

  return (
    <div className="w-full flex flex-col px-4">
      <div className="w-full flex flex-col mt-68.5">
        <div className="w-full justify-center">
          {/* 헤더 영역 */}
          <h1 className="text-headline1 text-text-default font-semibold text-center">
            우리 행사에 딱 맞는
            <br />
            단체주문 음식점 찾기
          </h1>
          <div className="w-full flex justify-center items-center mt-4">
            <button
              className="text-headline3 text-text-subtle font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              서비스 둘러보기 →
            </button>
          </div>

          {/* 소셜 로그인 버튼 영역 */}
          <div className="w-full flex justify-center items-center mt-14.5">
            <div className="w-full flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleLogin('kakao', 'CUSTOMER')}
                className="flex flex-col items-center transition-opacity cursor-pointer"
              >
                <KakaoLoginButton />
                <p className="text-label1 text-text-subtle font-medium">
                  카카오
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleLogin('naver', 'CUSTOMER')}
                className="flex flex-col items-center transition-opacity cursor-pointer"
              >
                <NaverLoginButton />
                <p className="text-label1 text-text-subtle font-medium">
                  네이버
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleLogin('google', 'CUSTOMER')}
                className="flex flex-col items-center transition-opacity cursor-pointer"
              >
                <GoogleLoginButton />
                <p className="text-label1 text-text-subtle font-medium">구글</p>
              </button>
            </div>
          </div>

          {/* 하단 네비게이션 링크 영역 */}
          <div className="w-full flex items-center justify-center mt-8">
            <Link
              href="/owner"
              className="text-brand-default text-label2 font-semibold underline underline-offset-2 decoration-1 hover:text-brand-hover transition-colors"
            >
              사장님이신가요?
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-background-dim/50 animate-in fade-in duration-200 cursor-default"
          />

          {/* 2. 실제 모달 창 (내용물) */}
          <div className="relative w-75 max-w-sm bg-white rounded-xl p-5 shadow-lg min-h-92.5 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* 상단 닫기(X) 버튼 영역 */}
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-icon-default hover:text-icon-active transition-colors"
              >
                <Close className="text-text-placeholder w-6 h-6" />
              </button>
            </div>

            {/* 모달 콘텐츠가 들어갈 빈 공간 */}
            <div className="flex flex-col items-center justify-center mt-1">
              <div className="w-18.5 h-18.5 bg-gray-300">임시</div>
              <div className="flex w-full mt-3 items-center justify-center">
                <h2 className="text-text-default font-bold text-headline3 text-[20px] text-center">
                  단체주문,
                  <br />
                  찾아오는 고객을 받아보세요
                </h2>
              </div>
              <h3 className="text-label2 text-text-subtle mt-1">
                그루핏(Groupeat)이 연결해드립니다
              </h3>
            </div>

            <div className="flex flex-col items-start mt-4 gap-1.5">
              <div className="flex items-center justify-center gap-1">
                <CheckLinear className="text-[#42BE65]" />
                <p className="text-label2 text-text-default font-medium">
                  플랫폼 입점 시 단체주문 고객에게 자동 노출
                </p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <CheckLinear className="text-[#42BE65]" />
                <p className="text-label2 text-text-default font-medium">
                  날짜별 픽업 가능 시간 및 수량 사전 설정 가능
                </p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <CheckLinear className="text-[#42BE65]" />
                <p className="text-label2 text-text-default font-medium">
                  주문 승인/거절 선택 및 상세 주문 관리 가능
                </p>
              </div>
            </div>

            <div className='w-full flex items-center justify-center h-11 bg-brand-default mt-5 rounded-lg'>
              <Link className='text-text-inverse text-label1 font-semibold' href='/customer/home'>서비스 이용하러 가기 →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
