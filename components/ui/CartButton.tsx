import CartIcon from '@/public/icons/icon_shoppingCart.svg';

interface CartButtonProps {
  count?: number;
  onClick?: () => void;
}

export default function CartButton({ count = 0, onClick }: CartButtonProps) {
  return (
    <button type="button" onClick={onClick} className="size-6 relative">
      <CartIcon className="size-[26px] text-icon-subtle" />

      {/*상품 있을 때만 배지 표시*/}
      {count > 0 && (
        <div className="min-w-[16px] px-1 h-4 absolute left-[14.08px] bottom-[15.38px] bg-brand-default rounded-full flex justify-center items-center">
          <span className="text-caption2 font-semibold text-text-inverse font-['Pretendard']">
            {count > 99 ? '99+' : count}
          </span>
        </div>
      )}
    </button>
  );
}
