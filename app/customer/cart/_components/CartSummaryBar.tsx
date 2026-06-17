'use client';

import OrderSummaryBar from '@/components/cart/OrderSummaryBar';
import type {
  CalculatedCartResponse,
  CalculatedCartItem,
  StoreCart,
  CartItem,
} from '../_types/cart.type';

interface CartSummaryBarProps {
  summary: CalculatedCartResponse | null;
  cartData: StoreCart[] | null;
  onOrder: () => void;
}

export default function CartSummaryBar({
  summary,
  cartData,
  onOrder,
}: CartSummaryBarProps) {
  if (!summary || summary.calculatedItems.length === 0) return null;

  const firstCalculatedItem: CalculatedCartItem = summary.calculatedItems[0];
  const firstItemName =
    cartData
      ?.find((store: StoreCart) => store.storeId === summary.storeId)
      ?.cartItems.find(
        (item: CartItem) => item.cartItemId === firstCalculatedItem.cartItemId
      )?.menuSummary ?? '';

  const summaryText =
    firstItemName +
    (summary.calculatedItems.length > 1
      ? ` 외 ${summary.calculatedItems.length - 1}건`
      : '');

  return (
    <OrderSummaryBar
      summaryText={summaryText}
      totalQuantity={summary.totalQuantity}
      originalPrice={summary.totalOriginalPrice}
      finalPrice={summary.finalPaymentAmount}
      buttonText="주문하기"
      onButtonClick={onOrder}
    />
  );
}
