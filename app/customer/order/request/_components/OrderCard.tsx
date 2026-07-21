'use client';

import Ellipse from '@/public/icons/icon_ellipse.svg';
import Image from 'next/image';
import { StoreCart } from '@/src/types/api';

interface OrderCardProps {
  storeCart: StoreCart | null | undefined;
  pickupDate?: string;
  pickupTime?: string;
  hidePickupInfo?: boolean;
  noBorder?: boolean;
}

const formatPickupDate = (dateStr?: string) => {
  if (!dateStr) return '날짜 미지정';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
};

const formatPickupTime = (timeStr?: string) => {
  if (!timeStr) return '시간 미지정';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;

  let hour = parseInt(parts[0], 10);
  const min = parseInt(parts[1], 10);
  const ampm = hour >= 12 ? '오후' : '오전';

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  return `${ampm} ${hour}시 ${min > 0 ? `${min}분` : ''}`.trim();
};

export default function OrderCard({
  storeCart,
  pickupDate,
  pickupTime,
  hidePickupInfo = false,
  noBorder = false,
}: OrderCardProps) {
  if (!storeCart || !storeCart.cartItems) return null;

  return (
    <div
      className={`w-full flex flex-col items-start gap-3 bg-background-default ${
        noBorder ? '' : 'p-4 border border-px rounded-xl border-border-default'
      }`}
    >
      {!hidePickupInfo && (
        <div className="flex flex-col items-start gap-0.5 self-stretch">
          <p className="text-text-default text-body font-semibold">
            {storeCart.storeName}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-text-subtlest text-label1">
              {formatPickupDate(pickupDate)}
            </p>
            <Ellipse className="size-0.5 text-text-subtlest" />
            <p className="text-text-subtlest text-label1">
              {formatPickupTime(pickupTime)}
            </p>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col items-start gap-5 self-stretch ${hidePickupInfo ? '' : 'mt-3'}`}
      >
        {storeCart.cartItems.map((item) => {
          return (
            <div
              key={item.cartItemId}
              className="w-full flex items-start gap-3"
            >
              <div className="relative w-14 h-14 shrink-0 aspect-square rounded-[7px] bg-brand-background overflow-hidden">
                <Image
                  src={
                    item.imageUrl?.startsWith('/') ||
                    item.imageUrl?.startsWith('http')
                      ? item.imageUrl
                      : '/images/image_logo.png'
                  }
                  alt={item.menuName ?? '메뉴 이미지'}
                  className="object-cover"
                  fill
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex flex-col items-start gap-2 flex-1">
                <div className="flex flex-col items-start gap-0.5 self-stretch">
                  <p className="text-text-default text-label1 font-semibold truncate">
                    {item.menuName}
                  </p>

                  {item.optionNames && item.optionNames.length > 0 && (
                    <p className="self-stretch text-text-subtle text-caption1 leading-4.5 whitespace-pre-line line-clamp-2">
                      {item.optionNames.join('\n')}
                    </p>
                  )}

                  <div className="flex flex-col items-start self-stretch mt-2">
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-text-default text-caption1">수량</p>
                      <p className="text-text-default text-label1 font-semibold">
                        {item.quantity}개
                      </p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-text-default text-caption1">가격</p>
                      <div className="flex items-center gap-1.5">
                        {item.discountRate !== undefined &&
                          item.discountRate > 0 && (
                            <p className="text-brand-default text-caption2 font-medium">
                              {item.discountRate}% 할인
                            </p>
                          )}
                        <p className="text-text-default text-label1 font-semibold">
                          {(item.finalPrice ?? 0).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
