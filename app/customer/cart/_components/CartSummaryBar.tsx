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
  if (!summary || (summary.calculatedItems ?? []).length === 0) return null;

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
