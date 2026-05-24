'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useSignupStore } from '@/store/useSignupStore';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/components/DefaultButton';

export default function PhoneVerifyStep() {
  const router = useRouter();
  const { phoneNumber, setPhoneNumber, signupToken, agreements, memberType, setMemberId } =
    useSignupStore();
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  // 1. 인증번호 발송
  const sendCodeMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/phone-verifications/send', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      }),
    onSuccess: () => alert('인증번호가 발송되었습니다. (테스트용: 123456)'),
    onError: () => alert('인증번호 발송에 실패했습니다.'),
  });

  // 2. 인증번호 확인 (로컬 상태 잠금용)
  const confirmCodeMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/phone-verifications/confirm', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, code }),
      }),
    onSuccess: () => {
      alert('인증이 완료되었습니다.');
      setIsVerified(true);
    },
    onError: () => alert('인증번호가 일치하지 않습니다. 다시 확인해주세요.'),
  });

  // 3. 공통 회원가입 API 호출 (휴대폰 인증이 완료된 후)
  const commonSignupMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/signup/common', {
        method: 'POST',
        body: JSON.stringify({
          signupToken,
          phoneNumber,
          memberType,
          agreements: agreements.map(({ termsId, agreed }) => ({
            termsId,
            agreed,
          })),
        }),
      }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      // 1. 백엔드 응답에서 memberId를 꺼내 Zustand에 저장
      if (data.memberId) {
        setMemberId(data.memberId);
      }

      // 2. push 대신 replace를 사용하여 뒤로 가기를 통한 재접근 방지
      if (data.memberType === 'CUSTOMER') {
        router.replace('/signup/customer');
      } else if (data.memberType === 'BUSINESS') {
        router.replace('/signup/business');
      }
    },
    onError: () =>
      alert('회원가입 처리에 실패했습니다. 잠시 후 다시 시도해주세요.'),
  });

  return (
    <div className="flex flex-col items-start gap-3 self-stretch mt-3 pb-24">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        <div className="flex w-full flex-col items-start gap-4">
          <h2 className="text-body font-semibold">휴대폰 본인 인증</h2>

          <div className="flex flex-col items-start gap-3 self-stretch w-full">
            {/* 휴대폰 번호 입력 및 전송 영역 */}
            <div className="flex items-start gap-2 w-full">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                disabled={isVerified}
                className="flex-1 h-11 pl-4 pr-3 py-3 rounded-lg border border-px border-border-default placeholder:text-body placeholder:text-text-placeholder focus:outline-none focus:border-border-active disabled:bg-neutral-5 disabled:text-text-disabled"
                placeholder="휴대폰 번호 입력"
              />
              <button
                onClick={() => {
                  if (!phoneNumber) return alert('휴대폰 번호를 입력해주세요.');
                  sendCodeMutation.mutate();
                }}
                disabled={
                  isVerified || sendCodeMutation.isPending || !phoneNumber
                }
                className="w-31 h-11 px-6 py-3 flex items-center justify-center rounded-lg bg-background-subtlest disabled:opacity-50 transition-opacity"
              >
                <p className="text-label1 text-text-subtlest whitespace-nowrap">
                  {isVerified
                    ? '전송 완료'
                    : sendCodeMutation.isPending
                      ? '전송 중...'
                      : '인증번호 전송'}
                </p>
              </button>
            </div>

            {/* 인증번호 입력 및 확인 영역 */}
            <div className="flex items-start gap-2 w-full">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isVerified || !sendCodeMutation.isSuccess}
                className="flex-1 h-11 p-3 pl-4 rounded-lg border border-px border-border-strong bg-background-default placeholder:text-body placeholder:text-text-placeholder focus:outline-none focus:border-border-active disabled:bg-neutral-5 disabled:text-text-disabled"
                placeholder="인증번호 6자리 입력"
              />
              <button
                onClick={() => {
                  if (!code) return alert('인증번호를 입력해주세요.');
                  confirmCodeMutation.mutate();
                }}
                disabled={isVerified || confirmCodeMutation.isPending || !code}
                className={`w-31 h-11 px-6 py-3 flex items-center justify-center rounded-lg transition-opacity ${
                  isVerified
                    ? 'bg-neutral-20'
                    : 'bg-orange-60 disabled:opacity-50'
                }`}
              >
                <p
                  className={`text-label1 whitespace-nowrap ${isVerified ? 'text-neutral-40' : 'text-white'}`}
                >
                  {isVerified
                    ? '인증 완료'
                    : confirmCodeMutation.isPending
                      ? '확인 중...'
                      : '인증 완료'}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton
          onClick={() => commonSignupMutation.mutate()}
          disabled={!isVerified}
        >
          다음
        </DefaultButton>
      </div>
    </div>
  );
}
