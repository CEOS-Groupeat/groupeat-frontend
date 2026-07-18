'use client';

import { useRouter } from 'next/navigation';
import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';
import { useSignupStore } from '@/store/useSignupStore';

export default function SignupHeader() {
  const router = useRouter();
  const { step, prevStep } = useSignupStore();

  const handleBack = () => {
    if (step === 1) {
      router.replace('/login');
    } else {
      prevStep();
    }
  };

  return (
    <div className="w-full flex flex-col pt-10">
      <div className="flex py-4 items-center justify-between self-stretch">
        <ArrowLeft
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleBack}
        />
        <span className="text-headline3 font-bold">회원가입</span>
        <div className="w-5 h-5" />
      </div>
    </div>
  );
}
