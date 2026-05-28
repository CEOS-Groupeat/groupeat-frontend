import CartIcon from '@/public/icons/icon_shoppingCart.svg';

interface CartButtonProps {
  count?: number; // 담긴 상품 수 (0이면 배지 숨김)
  onClick?: () => void;
}

export default function CartButton({ count = 0, onClick }: CartButtonProps) {
  return (
    <button type="button" onClick={onClick} className="size-6 relative">
      <CartIcon className="size-5 text-icon-default" />

      {/*상품 있을 때만 배지 표시*/}
      {count > 0 && (
        <div className="w-4 absolute left-[12px] top-[-6px] bg-brand-default rounded-full flex justify-center items-center">
          <span className="text-xs font-semibold text-text-inverse leading-4">
            {count > 99 ? '99+' : count}
          </span>
        </div>
      )}
    </button>
  );
}
