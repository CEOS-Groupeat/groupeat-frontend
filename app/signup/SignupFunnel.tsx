// app/signup/SignupFunnel.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/store/useSignupStore';
import { useBusinessSignupStore } from '@/store/useBusinessSignupStore';

import UserTypeStep from '@/app/signup/common/_components/UserTypeStep';
import TermsStep from '@/app/signup/common/_components/TermsStep';
import PhoneVerifyStep from '@/app/signup/common/_components/PhoneVerifyStep';
import SignupHeader from '@/components/signup/SignupHeader';

export default function SignupFunnel({
  initialToken,
}: {
  initialToken: string;
}) {
  const router = useRouter();
  const { setSignupToken, step, prevStep } = useSignupStore();
  const resetBusinessPayload = useBusinessSignupStore(
    (state) => state.resetPayload
  );
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      setSignupToken(initialToken);
      resetBusinessPayload(); // 공통 회원가입부터 새로 시작할 때 사업자 스토어도 초기화
      window.history.replaceState(null, '', '/signup');
    }
  }, [initialToken, setSignupToken]);

  const handleBack = () => {
    if (step === 1) {
      router.replace('/login');
    } else {
      prevStep();
    }
  };

  return (
    <div className="flex flex-col w-full bg-white px-4 min-h-screen">
      <SignupHeader onBack={handleBack} />

      <div className="flex-1 flex flex-col">
        {step === 1 && <UserTypeStep />}
        {step === 2 && <TermsStep />}
        {step === 3 && <PhoneVerifyStep />}
      </div>
    </div>
  );
}
