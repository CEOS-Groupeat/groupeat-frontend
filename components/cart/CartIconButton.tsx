'use client';

import { useRouter } from 'next/navigation';
import CartIcon from '@/public/icons/icon-shopping_cart.svg';
import { useCartQuery } from '@/hooks/useCartQuery';
import { useCartStore } from '@/store/useCartStore';

interface CartIconButtonProps {
  iconColor?: string;
}

export default function CartIconButton({
  iconColor = 'text-icon-inverse',
}: CartIconButtonProps) {
  const router = useRouter();
  useCartQuery();
  const storeCarts = useCartStore((state) => state.storeCarts);

  const totalCount =
    storeCarts?.reduce(
      (acc, store) => acc + (store.cartItems ?? []).length,
      0
    ) ?? 0;

  return (
    <button
      type="button"
      onClick={() => router.push('/customer/cart')}
      aria-label="장바구니로 이동"
      className="relative size-6"
    >
      <CartIcon className={`size-6 ${iconColor}`} />
      {totalCount > 0 && (
        <div className="absolute left-[13px] top-[-6px] min-w-[16px] h-4 px-0.5 bg-brand-default rounded-full flex items-center justify-center">
          <span className="text-caption2 font-semibold text-text-inverse font-['Pretendard']">
            {totalCount}
          </span>
        </div>
      )}
    </button>
  );
}
