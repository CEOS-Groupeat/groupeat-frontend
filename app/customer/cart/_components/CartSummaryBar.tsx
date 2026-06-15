'use client';

import type {
  CalculatedCartResponse,
  CartListResponse,
  CalculatedCartItem,
  StoreCart,
  CartItem,
} from '../_types/cart.type';

interface CartSummaryBarProps {
  summary: CalculatedCartResponse | null;
  cartData: CartListResponse | null;
  onOrder: () => void;
}

export default function CartSummaryBar({
  summary,
  cartData,
  onOrder,
}: CartSummaryBarProps) {
  if (!summary) return null;

  const firstCalculatedItem: CalculatedCartItem = summary.calculatedItems[0];
  const firstItemName =
    cartData?.storeCarts
      .find((store: StoreCart) => store.storeId === summary.storeId)
      ?.cartItems.find(
        (item: CartItem) => item.cartItemId === firstCalculatedItem.cartItemId
      )?.menuSummary ?? '';

  const summaryText =
    firstItemName +
    (summary.calculatedItems.length > 1
      ? ` 외 ${summary.calculatedItems.length - 1}건`
      : '');

  return (
    <div className="fixed bottom-0 left-0 w-full z-sticky">
      <div className="bg-background-default rounded-t-3xl shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.04)] px-4 pt-3 pb-6 font-['Pretendard']">
        <div className="flex justify-between items-end pb-2.5">
          <div className="flex flex-col">
            <span className="text-label2 font-normal text-text-subtle">
              {summaryText}
            </span>
            <span className="text-body font-semibold text-brand-default">
              총 {summary.totalQuantity}개
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-label2 font-normal text-text-subtlest">
              {summary.totalOriginalPrice.toLocaleString()}원
            </span>
            <span className="text-headline3 font-semibold text-text-default">
              {summary.finalPaymentAmount.toLocaleString()}원
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOrder}
          className="w-full text-center px-12 py-3 bg-brand-default text-text-inverse text-headline3 font-semibold rounded-xl"
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
