// app/signup/SignupFunnel.tsx
'use client';

import { useSignupStore } from '@/store/useSignupStore';

import SignupHeader from '@/components/signup/SignupHeader';
import OwnerInfoStep from '@/app/signup/owner/_components/OwnerInfoStep';
import OwnerTermsStep from '@/app/signup/owner/_components/OwnerTermsStep';
import OwnerVerifyStep from '@/app/signup/owner/_components/OwnerVerifyStep';

export default function OwnerSignupFunnel() {
  const { step } = useSignupStore();

  return (
    <div className="flex flex-col w-full bg-white px-4 min-h-screen">
      <SignupHeader />

      <div className="flex-1 flex flex-col">
        {step === 1 && <OwnerTermsStep />}
        {step === 2 && <OwnerInfoStep />}
        {step === 3 && <OwnerVerifyStep />}
      </div>
    </div>
  );
}
