'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';
import OrderSummaryBar from '@/components/cart/OrderSummaryBar';
import { components } from '@/src/types/schema';

type ApiCartListResponse = components['schemas']['ApiResponseCartListResponse'];
type CartListResponse = components['schemas']['CartListResponse'];
type StoreCart = components['schemas']['StoreCartDTO'];
type CartItem = components['schemas']['CartItemDTO'];

export default function FloatingCartBar({
  storeId,
  pickupDateTime,
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
      
      // 알맹이만 반환
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
    (acc: number, item: CartItem) => acc + (item.unitPrice || 0) * (item.quantity || 0),
    0
  );
  const finalTotal = currentStoreCart.storeTotalPrice || 0;

  return (
    <OrderSummaryBar
      pickupDateTime={pickupDateTime || '픽업 일시 미지정'}
      summaryText={summaryText}
      totalQuantity={totalQuantity}
      originalPrice={originalTotal}
      finalPrice={finalTotal}
      buttonText="장바구니 가기"
      onButtonClick={() => router.push('/customer/cart')}
    />
  );
}