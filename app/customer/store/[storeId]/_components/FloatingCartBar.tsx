'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';
import OrderSummaryBar from '@/components/cart/OrderSummaryBar';
import { components } from '@/src/types/schema';
import Ellipse from '@/public/icons/icon_ellipse.svg'; // ✅ Ellipse 아이콘 추가

type ApiCartListResponse = components['schemas']['ApiResponseCartListResponse'];
type CartListResponse = components['schemas']['CartListResponse'];
type StoreCart = components['schemas']['StoreCartDTO'];
type CartItem = components['schemas']['CartItemDTO'];

export default function FloatingCartBar({
  storeId,
  pickupDateTime, // 기존 문자열 prop도 예비로 유지
}: {
  storeId: string;
  pickupDateTime?: string;
}) {
  const router = useRouter();

  const storeCarts = useCartStore((state) => state.storeCarts);
  const setStoreCarts = useCartStore((state) => state.setStoreCarts);
  const setPickupInfo = useCartStore((state) => state.setPickupInfo);

  const { data: fetchedData } = useQuery<CartListResponse | undefined>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetchClient<ApiCartListResponse>('/api/carts');

      if (!response.isSuccess) {
        throw new Error(response.message || '장바구니 조회 실패');
      }
      return response.data;
    },
  });

  useEffect(() => {
    if (fetchedData) {
      setStoreCarts(fetchedData.storeCarts || []);

      if (fetchedData.pickupDate && fetchedData.pickupTime) {
        setPickupInfo(fetchedData.pickupDate, fetchedData.pickupTime);
      }
    }
  }, [fetchedData, setStoreCarts, setPickupInfo]);

  const safeStoreCarts = Array.isArray(storeCarts) ? storeCarts : [];

  const currentStoreCart = safeStoreCarts.find(
    (cart: StoreCart) => cart.storeId?.toString() === storeId
  );

  if (
    !currentStoreCart ||
    !currentStoreCart.cartItems ||
    currentStoreCart.cartItems.length === 0
  ) {
    return null;
  }

  const totalQuantity = currentStoreCart.cartItems.reduce(
    (acc: number, item: CartItem) => acc + (item.quantity || 0),
    0
  );

  const firstItemName = currentStoreCart.cartItems[0].menuName || '메뉴';
  const summaryText =
    currentStoreCart.cartItems.length > 1
      ? `${firstItemName} 외 ${currentStoreCart.cartItems.length - 1}건`
      : firstItemName;

  const originalTotal = currentStoreCart.cartItems.reduce(
    (acc: number, item: CartItem) =>
      acc + (item.unitPrice || 0) * (item.quantity || 0),
    0
  );
  const finalTotal = currentStoreCart.storeTotalPrice || 0;

  // ✅ Req 5: 서버 데이터 기반 포맷팅 (N월 N일 <Ellipse/> 오후 N시 N분)
  let displayDateTime: React.ReactNode = pickupDateTime || '픽업 일시 미지정';

  if (fetchedData?.pickupDate && fetchedData?.pickupTime) {
    const [, monthStr, dayStr] = fetchedData.pickupDate.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    const [hourStr, minStr] = fetchedData.pickupTime.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const minuteText = minute > 0 ? ` ${minute}분` : '';

    displayDateTime = (
      <div className="flex items-center gap-1.5">
        <span className="text-label2 font-normal text-text-subtlest">
          {month}월 {day}일
        </span>
        <Ellipse className="size-0.5 text-text-subtlest shrink-0" />
        <span className="text-label2 font-normal text-text-subtlest">
          {period} {displayHour}시{minuteText}
        </span>
      </div>
    );
  }

  return (
    <OrderSummaryBar
      pickupDateTime={displayDateTime} // 변경된 ReactNode를 전달
      summaryText={summaryText}
      totalQuantity={totalQuantity}
      originalPrice={originalTotal}
      finalPrice={finalTotal}
      buttonText="장바구니 가기"
      onButtonClick={() => router.push('/customer/cart')}
    />
  );
}
