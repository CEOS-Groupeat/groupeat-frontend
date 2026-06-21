import EmptyStateImage from '@/public/icons/emptyState-owner-order.svg';

export default function OrderEmptyState() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-1 mb-[100px]">
      <EmptyStateImage className="w-[140px] h-[123px]" />
      <span className="text-label1 text-text-placeholder font-medium font-['Pretendard']">
        주문 내역이 없습니다.
      </span>
    </div>
  );
}
