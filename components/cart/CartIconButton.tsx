'use client';

import { useRouter } from 'next/navigation';
import CartIcon from '@/public/icons/icon-shopping_cart.svg';
import { useCart } from '@/app/customer/cart/_hooks/useCart';

interface CartIconButtonProps {
  iconColor?: string;
  badgeColor?: string;
  badgeTextColor?: string;
}

export default function CartIconButton({
  iconColor = 'text-icon-inverse',
  badgeColor = 'bg-brand-default',
  badgeTextColor = 'text-text-inverse',
}: CartIconButtonProps) {
  const router = useRouter();
  const { data: cart } = useCart();

  const totalCount = cart?.totalItemCount ?? 0;

  return (
    <button
      type="button"
      onClick={() => router.push('/customer/cart')}
      aria-label={
        totalCount > 0
          ? `장바구니로 이동, ${totalCount}개 담김`
          : '장바구니로 이동'
      }
      className="relative size-6"
    >
      <CartIcon className={`size-6 ${iconColor}`} />
      {totalCount > 0 && (
        <div
          aria-hidden="true"
          className={`absolute left-[13px] top-[-6px] min-w-[16px] h-4 px-0.5 ${badgeColor} rounded-full flex items-center justify-center`}
        >
          <span className={`text-caption2 font-semibold ${badgeTextColor}`}>
            {totalCount}
          </span>
        </div>
      )}
    </button>
  );
}
