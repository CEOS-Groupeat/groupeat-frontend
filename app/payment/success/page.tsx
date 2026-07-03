'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchClient } from '@/lib/fetchClient';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. URL 주소창에서 토스가 넘겨준 3가지 핵심 데이터 추출
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // 필수 파라미터가 하나라도 없으면 에러 처리
    if (!orderId || !paymentKey || !amount) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('error');
      setErrorMessage('결제 인증 정보가 누락되었습니다.');
      return;
    }

    // 2. 백엔드(서버)로 최종 결제 승인(Confirm) 요청을 보냅니다.
    const confirmPayment = async () => {
      try {
        const payload = {
          paymentKey,
          orderId,
          amount: Number(amount), // 백엔드 명세에 맞춰 숫자로 변환
        };

        // POST /api/payments/confirm 호출
        await fetchClient('/api/payments/confirm', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        // 3. 백엔드에서 최종 승인이 완료되면 (주문 상태 PAID) 완료 페이지로 이동
        setStatus('success');
        // 뒤로가기 방지를 위해 push 대신 replace 사용
        router.replace(`/order/complete?orderId=${orderId}`); 
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // 이미 승인된 결제이거나, 금액 불일치 등 서버에서 차단한 경우
        setStatus('error');
        setErrorMessage(error.message || '결제 승인 중 오류가 발생했습니다.');
      }
    };

    // 컴포넌트 마운트 시 최초 1회 승인 로직 실행
    confirmPayment();
  }, [orderId, paymentKey, amount, router]);

  // 진행 상태에 따른 간단한 UI 처리
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center font-pretendard">
        <p className="text-body font-medium text-text-default">결제를 최종 승인하는 중입니다...</p>
        <p className="text-caption1 text-text-subtlest mt-2">창을 닫거나 새로고침하지 마세요.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 font-pretendard">
        <p className="text-body font-semibold text-brand-default">결제 승인 실패</p>
        <p className="text-label1 text-text-default">{errorMessage}</p>
        <button 
          onClick={() => router.replace('/customer/order/request')}
          className="px-4 py-2 border border-border-default rounded-lg text-text-default"
        >
          주문 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return null; // success 상태일 때는 즉시 리다이렉트되므로 빈 화면 렌더링
}

// Next.js 빌드 시 useSearchParams 에러를 막기 위한 Suspense 래핑
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full" />}>
      <SuccessContent />
    </Suspense>
  );
}