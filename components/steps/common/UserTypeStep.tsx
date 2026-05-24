// app/signup/steps/UserTypeStep.tsx
'use client';

import DefaultButton from '@/components/DefaultButton';
import { useSignupStore } from '@/store/useSignupStore';

export default function UserTypeStep() {
  const { memberType, setMemberType, nextStep } = useSignupStore();

  return (
    <div className="w-full flex flex-col pb-6">
      {/* 카드 선택 영역 */}
      <div className="flex flex-col justify-center items-start gap-3 self-stretch mt-4">
        <p className="text-body font-semibold">회원 유형 선택</p>
        <div className="flex w-full items-center gap-3">
          {/* 고객 카드 */}
          <button
            onClick={() => setMemberType('CUSTOMER')}
            className={`flex w-41.5 h-38.5 px-2.5 py-5.5 flex-col justify-center items-center gap-2.5 flex-1 border rounded-2xl transition-all duration-200 ${
              memberType === 'CUSTOMER'
                ? 'bg-brand-background border-transparent'
                : 'border-border-default bg-background-default hover:bg-gray-50'
            }`}
          >
            <div>{/* 아이콘 자리 */}</div>
            <p
              className={`font-medium ${memberType === 'CUSTOMER' ? 'text-brand-default' : 'text-gray-800'}`}
            >
              고객
            </p>
          </button>

          {/* 사업자 카드 */}
          <button
            onClick={() => setMemberType('BUSINESS')}
            className={`flex h-38.5 px-2.5 py-5.5 flex-col justify-center items-center gap-2.5 flex-1 border rounded-2xl transition-all duration-200 ${
              memberType === 'BUSINESS'
                ? 'bg-brand-background border-transparent'
                : 'border-border-default bg-background-default hover:bg-gray-50'
            }`}
          >
            <div>{/* 아이콘 자리 */}</div>
            <p
              className={`font-medium ${memberType === 'BUSINESS' ? 'text-brand-default' : 'text-gray-800'}`}
            >
              사업자
            </p>
          </button>
        </div>
      </div>

      <div className="flex-1" />

      {/* 다음 버튼 영역 */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton onClick={nextStep} disabled={!memberType}>다음</DefaultButton>
      </div>
    </div>
  );
}
