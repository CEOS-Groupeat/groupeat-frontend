//'use client';

//import { useRouter } from 'next/navigation';
//import Image from 'next/image';
import ChevronIcon from '@/public/icons/icon-right_chevron.svg';
import type { CustomerOrder } from '@/src/types/api';
import OrderStatusBadge from './OrderStatusBadge';
import { formatPickupTime } from '../_utils/formatTime';

const STATUS_MAP: Record<string, string> = {
  PENDING: '승인 대기',
  PAID: '승인 대기',
  ACCEPTED: '픽업 예정',
  COMPLETED: '픽업 완료',
  REJECTED: '주문 거절',
  CANCELLED: '주문 취소',
};

interface CustomerOrderCardProps {
  order: CustomerOrder;
  // TODO: 리뷰 버튼 구현 시 추가
  // onReviewClick?: (orderId: number) => void;
}

export default function CustomerOrderCard({
  order,
  //onReviewClick,
}: CustomerOrderCardProps) {
  //const router = useRouter();

  const badgeText = STATUS_MAP[order.orderStatus ?? ''] ?? '';

  const menuSummary =
    order.items && order.items.length > 0
      ? order.items.length > 1
        ? `${order.items[0]?.menuName} 외 ${order.items.length - 1}개`
        : order.items[0]?.menuName
      : '';

  return (
    <div className="w-full p-4 bg-background-default rounded-xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col gap-1.5">
      <OrderStatusBadge badgeText={badgeText} />

      {/* 주문 정보 */}
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center">
              {/* <span className="text-headline3 font-semibold text-text-default">
                {order.storeName}
              </span> */}
              <button
                type="button"
                onClick={() => {
                  // TODO: storeId 필드 추가 후 라우팅 연결
                  // router.push(`/customer/store/${order.storeId}`)
                }}
                aria-label="주문 상세 보기"
              >
                <ChevronIcon className="size-4 text-icon-disable rotate-180" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-caption1 font-normal text-text-subtlest">
              <span>{order.pickupDate}</span>
              <div className="size-0.5 bg-text-subtlest rounded-full" />
              <span>{formatPickupTime(order.pickupTime ?? '')}</span>
            </div>
          </div>
          <span className="text-label2 font-medium text-text-default">
            {menuSummary}
          </span>
        </div>

        {/* 이미지 */}
        {/* <div className="relative size-16 rounded-lg overflow-hidden shrink-0">
          <Image
            src={order.storeImageUrl ?? '/images/image_logo.png'}
            alt="메뉴 이미지"
            fill
            className="object-cover"
          />
        </div> */}
      </div>

      {/* 리뷰 버튼 (픽업 완료일 때만) */}
      {/* {order.orderStatus === 'COMPLETED' && (
        <div className="pt-1.5">
          <button
            type="button"
            onClick={() =>
              !order.hasReview && onReviewClick?.(order.orderId ?? 0)
            }
            disabled={order.hasReview}
            className={`w-full h-[38px] p-3 rounded-lg text-label2 font-semibold
              ${
                order.hasReview
                  ? 'bg-background-subtlest text-text-subtlest'
                  : 'bg-brand-default text-text-inverse'
              }`}
          >
            {order.hasReview ? '리뷰 작성 완료' : '리뷰 작성'}
          </button>
        </div>
      )} */}
    </div>
  );
}
