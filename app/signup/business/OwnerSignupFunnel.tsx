'use client';

import { useState, useEffect } from 'react';
import { useSignupStore } from '@/store/useSignupStore';
import { useBusinessSignupStore } from '@/store/useBusinessSignupStore';

import SignupHeader from '@/components/signup/SignupHeader';
import OwnerInfoStep from '@/app/signup/business/_components/OwnerInfoStep';
import OwnerTermsStep from '@/app/signup/business/_components/OwnerTermsStep';
import OwnerVerifyStep from '@/app/signup/business/_components/OwnerVerifyStep';

export default function OwnerSignupFunnel() {
  const [step, setStep] = useState(1);
  const memberId = useSignupStore((state) => state.memberId);
  const updatePayload = useBusinessSignupStore((state) => state.updatePayload);

  // 공통 스토어에 저장된 memberId를, 사업자 전용 스토어로 옮겨 담기
  useEffect(() => {
    if (memberId) {
      updatePayload({ memberId });
    }
  }, [memberId, updatePayload]);

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="flex flex-col w-full bg-white px-4 min-h-screen">
      <SignupHeader showBackButton={step !== 1} />

      <div className="flex-1 flex flex-col">
        {step === 1 && <OwnerTermsStep onNext={nextStep} />}
        {step === 2 && <OwnerInfoStep onNext={nextStep} />}
        {step === 3 && <OwnerVerifyStep />}
      </div>
    </div>
  );
}
