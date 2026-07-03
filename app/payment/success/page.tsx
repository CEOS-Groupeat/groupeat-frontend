// app/payment/success/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchClient } from '@/lib/fetchClient';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRequested = useRef(false);

  useEffect(() => {
    // 1. 토스가 URL 쿼리로 넘겨준 데이터 추출
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    
    // 2. 우리가 앞서 심어둔 최종 목적지 추출
    const destination = searchParams.get('destination');

    if (!paymentKey || !orderId || !amount) {
      alert('비정상적인 접근입니다.');
      router.replace('/home');
      return;
    }

    const confirmPayment = async () => {
      if (isRequested.current) return;
      isRequested.current = true;

      try {
        // 3. 백엔드로 토스 결제 '최종 승인' 요청 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await fetchClient('/api/payments/confirm', {
          method: 'POST',
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        if (res.isSuccess) {
          if (destination) {
            router.replace(destination);
          } else {
            router.replace(`/customer/order/${res.data.paymentId}`);
          }
        } else {
          alert('결제 승인에 실패했습니다: ' + res.message);
          router.replace('/payment/fail');
        }
      } catch (error) {
        console.error('결제 승인 에러:', error);
        alert('결제 처리 중 오류가 발생했습니다.');
        router.replace('/payment/fail');
      }
    };

    confirmPayment();
  }, [router, searchParams]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-['Pretendard']">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin w-8 h-8 border-4 border-brand-default border-t-transparent rounded-full" />
        <p className="text-text-default text-headline3 font-semibold">
          결제를 확인하고 있습니다...
        </p>
      </div>
    </div>
  );
}