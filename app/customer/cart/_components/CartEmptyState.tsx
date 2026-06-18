export default function CartEmptyState() {
  return (
    <div className="flex flex-col justify-center items-center mt-[138px]">
      <div className="size-[150px] bg-text-disabled rounded-[15.4px] mb-5" />
      <span className="text-body text-text-subtle font-medium font-['Pretendard'] mb-3">
        장바구니에 담은 메뉴가 없습니다
      </span>
    </div>
  );
}
