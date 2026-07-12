'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
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
  onReviewClick?: (orderId: number) => void;
}

export default function CustomerOrderCard({
  order,
  onReviewClick,
}: CustomerOrderCardProps) {
  const router = useRouter();

  const badgeText = STATUS_MAP[order.orderStatus ?? ''] ?? '';
  const menuSummary = order.menuSummary ?? '';

  const handleCardClick = () => {
    router.push(`/customer/order/${order.orderId}`);
  };

  const handleStoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/customer/store/${order.storeId}`);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      aria-label={`${order.storeName} 주문 상세 보기`}
      className="w-full p-4 bg-background-default rounded-xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col gap-1.5"
    >
      <OrderStatusBadge badgeText={badgeText} />

      {/* 주문 정보 */}
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center">
              <span className="text-headline3 font-semibold text-text-default">
                {order.storeName}
              </span>
              <button
                type="button"
                onClick={handleStoreClick}
                aria-label="가게 상세 보기"
              >
                <ChevronIcon className="size-4 text-icon-disable pl-2" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-caption1 font-normal text-text-subtlest">
              <span>{order.pickupDate}</span>
              <div className="size-0.5 bg-text-subtlest rounded-full" />
              <span>
                {order.pickupTime ? formatPickupTime(order.pickupTime) : ''}
              </span>
            </div>
          </div>
          <span className="text-label2 font-medium text-text-default">
            {menuSummary}
          </span>
        </div>

        {/* 이미지 */}
        <div className="relative w-[66px] h-[66px] rounded-lg overflow-hidden shrink-0">
          <Image
            src={order.storeImageUrl ?? '/images/image_logo.png'}
            alt="메뉴 이미지"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 리뷰 버튼 (픽업 완료일 때만) */}
      {order.orderStatus === 'COMPLETED' && (
        <div className="pt-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!order.hasReview) {
                onReviewClick?.(order.orderId ?? 0);
              }
            }}
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
      )}
    </div>
  );
}
