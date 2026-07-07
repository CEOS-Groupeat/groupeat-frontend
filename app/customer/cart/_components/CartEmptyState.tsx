import EmptyShoppingCart from '@/public/illust/illust_EmptyShoppingCart.svg';

export default function CartEmptyState() {
  return (
    <div className="flex flex-col justify-center items-center mt-40 px-[82px]">
      <EmptyShoppingCart aria-hidden="true" />
      <span className="text-body text-text-subtle font-medium font-['Pretendard'] text-center">
        장바구니에 담은 메뉴가 없습니다
      </span>
    </div>
  );
}
