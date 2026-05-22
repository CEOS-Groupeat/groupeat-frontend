'use client';

import NaverLoginButton from '@/public/components/loginbutton_naver.svg';
import KakaoLoginButton from '@/public/components/loginbutton_kakao.svg';
import GoogleLoginButton from '@/public/components/loginbutton_google.svg';
import React from 'react';

export default function HomePage() {
  const [memberType, setMemberType] = React.useState<'CUSTOMER' | 'BUSINESS'>(
    'CUSTOMER'
  );

  const handleLogin = (
    provider: 'naver' | 'kakao' | 'google',
    memberType: 'CUSTOMER' | 'BUSINESS'
  ) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${url}/api/auth/oauth2/authorize/${provider}?memberType=${memberType}`;
  };

  const handleToggleMemberType = (memberType: 'CUSTOMER' | 'BUSINESS') => {
    setMemberType(memberType);
  };

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center gap-4">
      <div className="absolute top-0 w-full h-120 bg-icon-active">
        <div>그루핏</div>
        <div>우리행사에딱맞는단체주문음식점을찾아보세요</div>
      </div>
      <div className="mt-120">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handleToggleMemberType('CUSTOMER')}
        >
          Customer
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handleToggleMemberType('BUSINESS')}
        >
          Business
        </button>

        <NaverLoginButton
          className="mr-4 cursor-pointer"
          onClick={() => handleLogin('naver', memberType)}
        />
        <KakaoLoginButton
          className="mr-4 cursor-pointer"
          onClick={() => handleLogin('kakao', memberType)}
        />
        <GoogleLoginButton
          className="mr-4 cursor-pointer"
          onClick={() => handleLogin('google', memberType)}
        />
      </div>
    </div>
  );
}
