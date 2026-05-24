// app/signup/SignupFunnel.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useSignupStore } from '@/store/useSignupStore';

import UserTypeStep from '@/components/steps/UserTypeStep';
import TermsStep from '@/components/steps/TermsStep';
import PhoneVerifyStep from '@/components/steps/PhoneVerifyStep';
import SignupHeader from '@/components/signup/SignupHeader';

export default function SignupFunnel({
  initialToken,
}: {
  initialToken: string;
}) {
  const { setSignupToken, step } = useSignupStore();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      setSignupToken(initialToken);
      window.history.replaceState(null, '', '/signup');
    }
  }, [initialToken, setSignupToken]);

  return (
    // 💡 1. 화면 전체 높이(min-h-screen)를 잡고 flex-col 적용
    <div className="flex flex-col w-full bg-white px-4 min-h-screen">
      <SignupHeader />

      {/* 💡 2. 헤더가 차지한 높이를 제외한 나머지 공간을 꽉 채움 (flex-1) */}
      <div className="flex-1 flex flex-col">
        {step === 1 && <UserTypeStep />}
        {step === 2 && <TermsStep />}
        {step === 3 && <PhoneVerifyStep />}
      </div>
    </div>
  );
}
