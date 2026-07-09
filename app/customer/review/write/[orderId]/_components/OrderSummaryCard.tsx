'use client';

import Image from 'next/image';
import type { OrderDetail } from '../_types/orderDetail.type';
import { formatDateWithDots } from '../_utils/formatDate';

interface OrderSummaryCardProps {
  order: OrderDetail;
  children?: React.ReactNode;
}

export default function OrderSummaryCard({
  order,
  children,
}: OrderSummaryCardProps) {
  const representativeImage = order.orderMenus[0]?.menuImageUrl;

  return (
    <div className="w-full px-3 py-4 bg-border-divider rounded-xl flex flex-col gap-5 font-['Pretendard']">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          {representativeImage && (
            <div className="relative size-16 rounded-md overflow-hidden shrink-0">
              <Image
                src={representativeImage}
                alt={order.storeName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center gap-1">
            <span className="text-headline3 font-semibold text-text-default">
              {order.storeName}
            </span>
            <span className="text-label2 font-normal text-text-subtlest">
              {formatDateWithDots(order.ordererInfo.orderDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {order.orderMenus.map((menu, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="text-label1 font-medium text-text-default">
                {menu.menuName}
              </span>
              <span className="text-label1 font-medium text-text-default">
                {menu.quantity}개
              </span>
            </div>
          ))}
        </div>

        {/* 별점 입력 (StarRatingInput을 children으로 받음) */}
        {children && <div className="flex items-center h-8">{children}</div>}
      </div>
    </div>
  );
}
