'use client';

import OrderSummaryBar from '@/components/cart/OrderSummaryBar';
import type {
  CalculatedCartData,
  CalculatedCartItem,
  StoreCart,
} from '@/src/types/api';

interface CartSummaryBarProps {
  summary: CalculatedCartData | null;
  cartData: StoreCart[] | null;
  onOrder: () => void;
}

export default function CartSummaryBar({
  summary,
  cartData,
  onOrder,
}: CartSummaryBarProps) {
  const hasItems = summary && (summary.calculatedItems ?? []).length > 0;

  if (!hasItems) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-sticky px-4 pt-3 pb-6 bg-background-default rounded-t-3xl flex flex-col items-center animate-in slide-in-from-bottom-full duration-300 overflow-hidden">
        <button
          type="button"
          disabled
          className="self-stretch h-13 px-12 py-3 bg-background-subtlest rounded-xl flex flex-col justify-center items-center"
        >
          <span className="text-center text-text-subtlest text-headline3 font-semibold font-['Pretendard']">
            주문하기
          </span>
        </button>
      </div>
    );
  }

  const firstCalculatedItem: CalculatedCartItem = (summary.calculatedItems ??
    [])[0];

  const firstItemName =
    cartData
      ?.find((store) => store.storeId === summary.storeId)
      ?.cartItems?.find(
        (item) => item.cartItemId === firstCalculatedItem.cartItemId
      )?.menuName ?? '메뉴';

  const summaryText =
    firstItemName +
    ((summary.calculatedItems ?? []).length > 1
      ? ` 외 ${(summary.calculatedItems ?? []).length - 1}건`
      : '');

  return (
    <OrderSummaryBar
      summaryText={summaryText}
      totalQuantity={summary.totalQuantity ?? 0}
      originalPrice={summary.totalOriginalPrice ?? 0}
      finalPrice={summary.finalPaymentAmount ?? 0}
      buttonText="주문하기"
      onButtonClick={onOrder}
    />
  );
}
