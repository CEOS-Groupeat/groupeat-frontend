'use client';

import { useRouter } from 'next/navigation';
import RightChevronIcon from '@/public/icons/icon-right_chevron.svg';
import type { OwnerOrderStatus } from '@/src/types/api';

interface OrderCardProps {
  orderId: number;
  orderStatus: OwnerOrderStatus;
  isReorder: boolean;
  groupName: string;
  customerName: string;
  pickupDate: string;
  pickupTime: string;
  totalAmount: number;
  paymentMethod: 'PREPAID' | 'ON_SITE' | null;
  remainingHours: number | null;
  items: { menuName: string; quantity: number }[];
  onReject?: () => void;
  onApprove?: () => void;
  onPickupComplete?: () => void;
}

export default function OrderCard({
  orderId,
  orderStatus,
  isReorder,
  groupName,
  customerName,
  pickupDate,
  pickupTime,
  totalAmount,
  remainingHours,
  items,
  onReject,
  onApprove,
  onPickupComplete,
}: OrderCardProps) {
  const router = useRouter();

  const isWaiting = orderStatus === 'PAID';
  const isConfirmed = orderStatus === 'ACCEPTED';
  const isPast =
    orderStatus === 'COMPLETED' ||
    orderStatus === 'REJECTED' ||
    orderStatus === 'CANCELLED';

  return (
    <div className="w-full px-3 bg-background-default rounded-xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col overflow-hidden font-['Pretendard'] py-[14px]">
      {/* 뱃지 영역 */}
      <div className="flex items-center gap-2">
        {isReorder && (
          <span className="px-1.5 py-0.5 bg-brand-background rounded-sm text-caption1 font-semibold text-brand-default">
            재주문
          </span>
        )}
        {isWaiting && remainingHours !== null && (
          <span className="px-1.5 py-0.5 bg-background-subtlest rounded-sm text-caption2 font-medium text-text-subtle">
            {remainingHours}시간 이내 승인 필요
          </span>
        )}
      </div>

      {/* 주문 정보 영역 */}
      <div className="flex flex-col gap-1.5 mt-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-caption1 font-normal text-text-subtlest">
              {groupName}
            </span>
            <button
              type="button"
              onClick={() => router.push(`/owner/orders/${orderId}`)}
              aria-label="주문 상세 보기"
            >
              <RightChevronIcon className="size-5 text-icon-subtlest pl-2.5" />
            </button>
          </div>
          <span className="text-body font-semibold text-text-default">
            {customerName}
          </span>
        </div>

        <div className="w-full h-px bg-border-subtle" />

        <div className="pt-2 flex flex-col gap-[5px] text-label2">
          <div className="flex items-start gap-2">
            <span className="w-[55px] font-normal text-text-subtlest">
              픽업 일자
            </span>
            <span className="font-medium text-text-default">
              {pickupDate} {pickupTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[55px] font-normal text-text-subtlest">
              총금액
            </span>
            <span className="font-medium text-text-default">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {items.map((item, index) => (
              <div
                key={`${item.menuName}-${index}`}
                className="flex items-center gap-2"
              >
                <span
                  className={`w-[55px] font-normal text-text-subtlest ${index > 0 ? 'opacity-0' : ''}`}
                >
                  메뉴
                </span>
                <span className="font-medium text-text-default">
                  {item.menuName}
                </span>
                <span className="font-medium text-text-default">
                  x {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center gap-2 mt-4">
        {isWaiting && (
          <>
            <button
              type="button"
              onClick={onReject}
              className="flex-1 h-[38px] rounded-lg outline outline-1 outline-offset-[-1px] outline-border-default text-label2 font-semibold text-text-default"
            >
              거절
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="flex-[1.68] h-[38px] rounded-lg bg-brand-default text-label2 font-semibold text-text-inverse"
            >
              승인
            </button>
          </>
        )}
        {isConfirmed && (
          <button
            type="button"
            onClick={onPickupComplete}
            className="flex-1 h-[38px] rounded-lg bg-brand-default text-label2 font-semibold text-text-inverse"
          >
            픽업 완료
          </button>
        )}
        {isPast && (
          <button
            type="button"
            className="flex-1 h-[38px] rounded-lg bg-background-subtle text-label2 font-semibold text-text-subtlest"
          >
            {orderStatus === 'REJECTED'
              ? '주문 거절'
              : orderStatus === 'CANCELLED'
                ? '취소됨'
                : '픽업 완료'}
          </button>
        )}
      </div>
    </div>
  );
}
