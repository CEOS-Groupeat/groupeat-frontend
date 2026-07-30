// app/payment/fail/page.tsx
'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BigAlertIcon from '@/public/icons/icon_modal_alert.svg';

function PaymentFailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const message = searchParams.get('message');

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-background-default px-4">
      <BigAlertIcon className="text-status-danger w-11 h-11" />

      <div className="flex flex-col items-center gap-1">
        <p className="text-headline3 font-semibold text-text-default">
          결제에 실패했습니다.
        </p>
        <p className="text-label1 text-text-subtlest text-center">
          {message || '결제가 정상적으로 처리되지 않았어요. 다시 시도해주세요.'}
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.replace('/customer/cart?from=payment')}
        className="w-full max-w-[320px] h-11 mt-2 rounded-lg bg-brand-default text-text-inverse font-semibold"
      >
        장바구니로 돌아가기
      </button>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-background-default">
          <div className="animate-spin w-8 h-8 border-4 border-brand-default border-t-transparent rounded-full" />
        </div>
      }
    >
      <PaymentFailContent />
    </Suspense>
  );
}
