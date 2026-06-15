'use client'

import { useRouter } from 'next/navigation';

export default function CartEmptyState() {
    const router = useRouter();
     
  return (
    <div className="flex flex-col justify-center items-center mt-[138px]">
      <div className="size-[150px] bg-text-disabled rounded-[15.4px] mb-5" />
      <span className="text-body text-text-subtle font-medium font-['Pretendard'] mb-3">
        장바구니에 담은 메뉴가 없습니다
      </span>
      <button
        type="button"
        onClick={() => router.push('/customer/order/status')}
        className="bg-background-subtlest px-6 py-3 rounded-lg"
      >
        <span className="text-label1 text-text-subtlest font-semibold font-['Pretendard']">
          재주문하기
        </span>
      </button>
    </div>
  );
}
