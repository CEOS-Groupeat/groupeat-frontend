'use client';

import { useRouter } from 'next/navigation';

interface OrderListProps {
  orderId: number | undefined;
  isReorder: boolean;
  eventName: string;
  customerName: string;
  pickupTime: string;
  menu: string;
  quantity: string;
}

export default function OrderList({
  orderId,
  isReorder,
  eventName,
  customerName,
  pickupTime,
  menu,
  quantity,
}: OrderListProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/owner/orders/${orderId}`)}
      className="w-full flex p-3 flex-col items-start gap-2 rounded-lg border border-px border-border-subtle bg-static-white shadow-[6px_6px_54px_0_rgba(0, 0, 0, 0.05)] cursor-pointer"
    >
      <div className="flex pb-2 flex-col items-end gap-1 self-stretch border-b border-px border-border-default">
        <div className="flex flex-col items-start gap-1.5 self-stretch">
          {isReorder && (
            <div className="flex px-1.5 py-0.5 items-center justify-center gap-2.5 rounded-sm bg-brand-background">
              <p className="text-caption1 text-brand-default font-semibold">
                재주문
              </p>
            </div>
          )}
          <div className="flex justify-between items-center self-stretch">
            <div className="flex flex-col items-start">
              <p className="text-text-subtlest text-caption1">{eventName}</p>
              <p className="text-body text-text-default font-semibold">
                {customerName}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-caption1 text-text-subtlest">픽업 시간</p>
              <p className="text-body text-text-default font-semibold">
                {pickupTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1">
          <p className="text-caption1 text-text-subtlest">메뉴</p>
          <p className="text-text-default text-caption1 font-semibold">
            {menu}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-text-subtlest text-caption1">수량</p>
          <p className="text-text-default text-caption1 font-semibold">
            {quantity}개
          </p>
        </div>
      </div>
    </div>
  );
}
