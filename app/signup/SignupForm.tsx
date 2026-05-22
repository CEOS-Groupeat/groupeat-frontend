'use client';

import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSignupStore } from '@/store/useSignupStore';
import { fetchClient } from '@/lib/fetchClient';
import { useRouter } from 'next/router';

export default function SignupForm({ initialToken }: { initialToken: string }) {
  const { signupToken, phoneNumber, agreements, setSignupToken } = useSignupStore();
  const isInitialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      
      // 1. Zustand 스토어에 토큰 저장
      setSignupToken(initialToken);
      
      // 2. Next.js 라우터 대신 Web API를 사용하여 서버 재요청 없이 주소창만 세탁
      window.history.replaceState(null, '', '/signup');
    }
  }, [initialToken, setSignupToken]);

  // 2. 회원가입 API 전송 로직
  const submitSignup = useMutation({
    mutationFn: async () => {
      const payload = {
        signupToken,
        phoneNumber,
        agreements
      };

      return fetchClient('/api/signup/common', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      alert('회원가입 처리 중 문제가 발생했습니다.');
    }
  });

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">추가 정보 입력</h1>
      
      {/* 폼 UI 생략 (전화번호 입력, 약관 체크박스 등에서 Zustand 상태 업데이트) */}
      
      <button 
        onClick={() => submitSignup.mutate()}
        disabled={submitSignup.isPending || !signupToken}
        className="bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
      >
        {submitSignup.isPending ? '처리 중...' : '회원가입 완료'}
      </button>
    </div>
  );
}