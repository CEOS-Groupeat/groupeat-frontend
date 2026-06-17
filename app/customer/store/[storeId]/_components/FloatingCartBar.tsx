'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import CalendarIcon from '@/public/icons/icon_calendar.svg';
import { useCartStore } from '@/store/useCartStore';
import { CartListResponse, StoreCart, CartItem } from '@/src/types/api';
import DefaultButton from '@/components/ui/ButtonDefault';

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

  const { data: fetchedCarts } = useQuery<StoreCart[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetchClient<CartListResponse>('/api/carts');
      if (!response.isSuccess) throw new Error(response.message);
      return response.data?.storeCarts || [];
    },
  });

  useEffect(() => {
    if (fetchedCarts) {
      setStoreCarts(fetchedCarts);
    }
  }, [fetchedCarts, setStoreCarts]);

  const currentStoreCart = storeCarts?.find(
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
    (acc, item: CartItem) => acc + (item.quantity || 0),
    0
  );

  const firstItemName =
    currentStoreCart.cartItems[0].menuSummary?.split(' ')[0] || '메뉴';
  const summaryText =
    currentStoreCart.cartItems.length > 1
      ? `${firstItemName} 외 ${currentStoreCart.cartItems.length - 1}건`
      : firstItemName;

  const originalTotal = currentStoreCart.cartItems.reduce(
    (acc, item: CartItem) => acc + (item.unitPrice || 0) * (item.quantity || 0),
    0
  );
  const finalTotal = currentStoreCart.storeTotalPrice || 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 animate-in slide-in-from-bottom-full duration-300">
      <div className="bg-white rounded-t-[35px] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 pt-5 pb-8">
        <div className="flex items-center gap-1.5 pb-4 pl-1">
          <CalendarIcon className="w-4 h-4 text-icon-subtlest" />
          <span className="text-label2 text-text-subtlest font-medium">
            {pickupDateTime || '픽업 일시 미지정'}
          </span>
        </div>

        <div className="flex justify-between items-end pb-5 pl-1 pr-1">
          <div className="flex flex-col gap-1.5">
            <p className="text-body text-text-default font-medium">
              {summaryText}
            </p>
            <p className="text-body font-bold text-brand-default">
              총 {totalQuantity}개
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-caption1 text-text-subtlest line-through">
              {originalTotal.toLocaleString()}원
            </p>
            <p className="text-headline3 font-bold text-text-default">
              {finalTotal.toLocaleString()}원
            </p>
          </div>
        </div>

        <DefaultButton
          onClick={() => router.push('/customer/cart')}
        >
          장바구니 가기
        </DefaultButton>
      </div>
    </div>
  );
}