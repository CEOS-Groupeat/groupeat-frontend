/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useSignupStore } from '@/store/useSignupStore';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/components/ui/ButtonDefault';

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
  
  //  1. 인증 실패 상태 관리 (에러 메시지 및 붉은 테두리 토글용)
  const [isError, setIsError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNumbers.length <= 11) {
      setPhoneNumber(onlyNumbers);
    }
  };

  // 인증번호 입력 시 동작 (에러 상태 초기화)
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (isError) setIsError(false); //  유저가 다시 타이핑을 시작하면 에러 상태를 풀어줍니다.
  };

  // 1. 인증번호 발송 API
  const sendCodeMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/phone-verifications/send', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      }),
    onSuccess: () => {
      alert('인증번호가 발송되었습니다. ');
      
      setIsError(false); // 재발송 시 기존 에러 초기화
      setCode('');
    },
    onError: () => alert('인증번호 발송에 실패했습니다.'),
  });

  // 3. 공통 회원가입 API 호출 (인증 성공 시 이어서 실행됨)
  // 3. 공통 회원가입 API 호출
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
    onError: (error) => {
      console.error(error);
      alert('회원가입 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  });

  // 2. 인증번호 확인 API
  const confirmCodeMutation = useMutation({
    mutationFn: async () =>
      fetchClient('/api/phone-verifications/confirm', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, code }),
      }),
    onSuccess: () => {
      //  인증 성공 시 에러 상태를 풀고(Verified), 즉시 다음 단계(공통 회원가입 API)로 넘어갑니다.
      setIsVerified(true);
      setIsError(false);
      commonSignupMutation.mutate();
    },
    onError: () => {
      //  인증 실패 시 에러 상태를 true로 변경하여 UI 경고를 띄웁니다.
      setIsError(true);
    },
  });

  // '다음' 버튼 클릭 핸들러
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
                disabled={isVerified || sendCodeMutation.isPending || !phoneNumber}
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

            {/* 인증번호 입력 영역 */}
            <div className="flex flex-col items-start w-full gap-2">
              <input
                type="text"
                value={code}
                onChange={handleCodeChange}
                disabled={isVerified || !sendCodeMutation.isSuccess}
                className={`w-full h-11 p-3 pl-4 rounded-lg border border-px transition-colors ${
                  //  isError가 true일 경우 붉은색 border 적용
                  isError 
                    ? 'border-status-danger bg-status-danger-bg focus:border-status-danger' 
                    : 'border-border-strong bg-background-default focus:border-border-active'
                } placeholder:text-body placeholder:text-text-placeholder focus:outline-none disabled:bg-neutral-5 disabled:text-text-disabled`}
                placeholder="인증번호 6자리 입력"
              />
              {/*  에러 발생 시 출력되는 메시지 */}
              {isError && (
                <p className="text-status-danger text-caption1">
                  인증번호가 틀렸습니다
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  하단 '다음' 버튼 */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4">
        <DefaultButton
          onClick={handleNextStep}
          //  code가 1글자 이상 입력되면 활성화되도록 조건 변경
          disabled={code.length === 0 || confirmCodeMutation.isPending || commonSignupMutation.isPending}
        >
          {confirmCodeMutation.isPending || commonSignupMutation.isPending 
            ? '처리 중...' 
            : '다음'}
        </DefaultButton>
      </div>
    </div>
  );
}