'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useRouter } from 'next/navigation';
import CalendarIcon from '@/public/icons/icon_calendar.svg'; // 캘린더 아이콘 임포트

export default function FloatingCartBar({ storeId }: { storeId: string }) {
  const router = useRouter();

  const { data: cartData } = useQuery({
    queryKey: ['cart', storeId],
    queryFn: async () => {
      if (!storeId) return null; 

      const response = await fetchClient(`/api/carts?storeId=${storeId}`);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = (response as Record<string, any>).isSuccess !== undefined ? response : (response as any).data;
      
      return payload.data?.storeCarts?.[0] || null; 
    },
    enabled: !!storeId, 
  });

  if (!cartData || cartData.cartItems.length === 0) return null;

  // 총 수량 및 요약 텍스트 계산
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalQuantity = cartData.cartItems.reduce((acc: any, item: any) => acc + item.quantity, 0);
  const firstItemName = cartData.cartItems[0].menuSummary.split(' ')[0]; // "반반 세트" 등 앞부분만 추출
  const summaryText = cartData.cartItems.length > 1 
    ? `${firstItemName} 외 ${cartData.cartItems.length - 1}건` 
    : firstItemName;

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 animate-in slide-in-from-bottom-full duration-300">
      <div className="bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 pt-4 pb-8">
        
        {/* 상단: 픽업 일시 (Zustand 등에서 꺼내와야 함) */}
        <div className="flex items-center gap-1.5 pb-3">
          <CalendarIcon className="w-4 h-4 text-icon-subtlest" />
          <span className="text-label2 text-text-subtlest">
            {/* 임시 하드코딩. 향후 전역 상태 연결 */}
            5월 12일 · 오후 5시
          </span>
        </div>

        {/* 중단: 요약 및 가격 */}
        <div className="flex justify-between items-end pb-4">
          <div className="flex flex-col gap-1">
            <p className="text-body text-text-default">{summaryText}</p>
            <p className="text-body font-bold text-brand-default">총 {totalQuantity}개</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {/* 할인 전 가격 (필요시 백엔드 데이터 활용) */}
            <p className="text-caption1 text-text-subtlest line-through">
              {(cartData.storeTotalPrice + 19600).toLocaleString()}원
            </p>
            <p className="text-headline3 font-bold text-text-default">
              {cartData.storeTotalPrice.toLocaleString()}원
            </p>
          </div>
        </div>

        {/* 하단: 장바구니 가기 버튼 */}
        <button 
          onClick={() => router.push('/cart')}
          className="w-full h-[52px] bg-brand-default text-white rounded-lg font-bold"
        >
          장바구니 가기
        </button>
      </div>
    </div>
  );
}