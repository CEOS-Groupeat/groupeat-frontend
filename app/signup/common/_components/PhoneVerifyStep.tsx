/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useSignupStore } from '@/store/useSignupStore';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/components/ui/ButtonDefault';

// 임시 확인용
function extractVerificationCode(message: string): string | null {
  const match = message.match(/\d{4,10}/); 
  return match ? match[0] : null;
}

export default function PhoneVerifyStep() {
  const router = useRouter();
  const {
    phoneNumber,
    setPhoneNumber,
    signupToken,
    agreements,
    memberType,
    setMemberId,
  } = useSignupStore();

  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null); // 임시 확인용

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (isError) setIsError(false);
  };

  // 1. 인증번호 발송 API
  const sendCodeMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/phone-verifications/send', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      }),
    onSuccess: (response: any) => { // 임시 확인용
      alert('인증번호가 발송되었습니다.');
      setIsError(false);
      setCode('');

      const message = response.data?.message ?? ''; // 임시 확인용
      const extractedCode = extractVerificationCode(message);// 임시 확인용
      setDevCode(extractedCode); // 임시 확인용
    },
    onError: (error: any) => {
      alert(error.message || '인증번호 발송에 실패했습니다.');
    },
  });

  // 2. 공통 회원가입 API 호출
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
    onSuccess: (response: any) => {
      const payload = response.data || response;

      if (payload.memberId) {
        setMemberId(payload.memberId);
      }

      if (payload.memberType === 'CUSTOMER') {
        router.replace('/signup/customer');
      } else if (payload.memberType === 'BUSINESS') {
        router.replace('/signup/business');
      } else {
        console.error('회원가입 중 오류가 발생했습니다.', payload.memberType);
      }
    },
    onError: (error: any) => {
      alert(
        error.message ||
          '회원가입 처리에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    },
  });

  // 3. 인증번호 확인 API
  const confirmCodeMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/phone-verifications/confirm', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, code }),
      }),
    onSuccess: () => {
      setIsVerified(true);
      setIsError(false);
      commonSignupMutation.mutate();
    },
    onError: (error: any) => {
      setIsError(true);
    },
  });

  const handleNextStep = () => {
    if (!code) return;
    if (isVerified) {
      commonSignupMutation.mutate();
    } else {
      confirmCodeMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 self-stretch mt-3 pb-24">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        <div className="flex w-full flex-col items-start gap-4">
          <h2 className="text-body font-semibold">휴대폰 본인 인증</h2>

          <div className="flex flex-col items-start gap-3 self-stretch w-full">
            <div className="flex items-start gap-2 w-full">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                disabled={isVerified}
                className="flex-1 h-11 pl-4 pr-3 py-3 rounded-lg border border-px border-border-default placeholder:text-body placeholder:text-text-placeholder focus:outline-none focus:border-border-active disabled:bg-neutral-5 disabled:text-text-disabled"
                placeholder="휴대폰 번호 입력"
              />

              {/* 전송 버튼 동적 UI 및 클릭 방어 로직 적용 */}
              <button
                onClick={() => {
                  if (isVerified) return; // 이중 방어: 인증 완료 시 클릭 이벤트 즉시 차단
                  if (!phoneNumber) return alert('휴대폰 번호를 입력해주세요.');
                  sendCodeMutation.mutate();
                }}
                disabled={
                  isVerified || sendCodeMutation.isPending || !phoneNumber
                }
                className={`w-31 h-11 px-6 py-3 flex items-center justify-center rounded-lg transition-all disabled:opacity-50 ${
                  phoneNumber && !isVerified
                    ? 'bg-brand-default'
                    : 'bg-background-subtlest'
                }`}
              >
                <p
                  className={`text-label1 whitespace-nowrap ${
                    phoneNumber && !isVerified
                      ? 'text-white font-semibold'
                      : 'text-text-subtlest'
                  }`}
                >
                  {isVerified
                    ? '전송 완료'
                    : sendCodeMutation.isPending
                      ? '전송 중...'
                      : '인증번호 전송'}
                </p>
              </button>
            </div>

            <div className="flex flex-col items-start w-full gap-2">
              <input
                type="text"
                value={code}
                onChange={handleCodeChange}
                disabled={isVerified || !sendCodeMutation.isSuccess}
                className={`w-full h-11 p-3 pl-4 rounded-lg border border-px transition-colors ${
                  isError
                    ? 'border-status-danger bg-status-danger-bg focus:border-status-danger'
                    : 'border-border-strong bg-background-default focus:border-border-active'
                } placeholder:text-body placeholder:text-text-placeholder focus:outline-none disabled:bg-neutral-5 disabled:text-text-disabled`}
                placeholder="인증번호 6자리 입력"
              />
              {isError && (
                <p className="text-status-danger text-caption1">
                  인증번호가 틀렸습니다
                </p>
              )}
              {/* 임시확인용 */}
              {devCode && (
                <p className="text-caption1 text-brand-default font-semibold">
                  (개발용) 인증번호: {devCode}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton
          onClick={handleNextStep}
          disabled={
            code.length === 0 ||
            confirmCodeMutation.isPending ||
            commonSignupMutation.isPending
          }
        >
          {confirmCodeMutation.isPending || commonSignupMutation.isPending
            ? '처리 중...'
            : '다음'}
        </DefaultButton>
      </div>
    </div>
  );
}
