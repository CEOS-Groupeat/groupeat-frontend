// app/signup/SignupFunnel.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useSignupStore } from '@/store/useSignupStore';

import UserTypeStep from '@/app/signup/common/_components/UserTypeStep';
import TermsStep from '@/app/signup/common/_components/TermsStep';
import PhoneVerifyStep from '@/app/signup/common/_components/PhoneVerifyStep';
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
    <div className="flex flex-col w-full bg-white px-4 min-h-screen">
      <SignupHeader />

      <div className="flex-1 flex flex-col">
        {step === 1 && <UserTypeStep />}
        {step === 2 && <TermsStep />}
        {step === 3 && <PhoneVerifyStep />}
      </div>
    </div>
  );
}
