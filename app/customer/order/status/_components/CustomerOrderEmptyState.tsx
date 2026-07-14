import EmptyState from '@/public/illust/illust_CustomerNoOrder.svg';

export default function CustomerOrderEmptyState() {
  return (
    <div className="flex flex-col px-[84px] gap-5 items-center justify-center mt-[142px]">
      <EmptyState aria-hidden="true" />
      <div className="flex flex-col items-center">
        <p className="text-body font-medium text-text-subtle font-['Pretendard']">
          주문한 가게가 없습니다
        </p>
      </div>
    </div>
  );
}
