'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import Ticket from '@/public/icons/icon_ticket.svg';
import Star from '@/public/icons/icon_star.svg';
import BellIcon from '@/public/icons/icon_bell_active.svg';
import AlertIcon from '@/public/icons/icon_alert.svg';
import Place from '@/public/icons/icon_place.svg';
import Phone from '@/public/icons/icon_phone.svg';
import Calendar from '@/public/icons/icon_calendar.svg';
import Notice from '@/public/icons/icon_notice.svg';
import ArrowUp from '@/public/icons/icon_arrow_up.svg';
import ArrowDown from '@/public/icons/icon_arrow_down.svg';
import { useStoreDetail } from '@/app/customer/store/_hooks/useStoreDetail';

const DAY_MAP: Record<string, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const formatClosedDays = (daysString?: string | null) => {
  if (!daysString) return '연중무휴';
  const days = daysString
    .split(',')
    .map((d) => DAY_MAP[d.trim()] || d.trim())
    .join(', ');
  return `${days} 휴무`;
};

export default function StoreDetail() {
  const params = useParams();
  const storeId = params.storeId as string;
  const [isProcessExpanded, setIsProcessExpanded] = useState<boolean>(false);

  const { data: store, isLoading, isError } = useStoreDetail(storeId);

  if (isLoading)
    return (
      <div className="p-8 text-center text-text-subtlest">
        가게 정보를 불러오는 중입니다...
      </div>
    );
  if (isError || !store)
    return (
      <div className="p-8 text-center text-brand-default">
        가게 정보를 불러오는데 실패했습니다.
      </div>
    );

  return (
    <div className="flex flex-col items-center self-stretch">
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="flex p-4 flex-col items-center gap-1 self-stretch">
          <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-col items-start gap-1 self-stretch">
              {store.discountRate > 0 && (
                <div className="flex pl-2 pr-2.5 py-1 flex-col justify-center items-start gap-2 rounded-full bg-status-info-bg">
                  <div className="flex items-center gap-4.5 self-stretch">
                    <div className="flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5" />
                      <p className="text-caption1 text-status-info font-semibold">
                        {store.discountConditionQuantity}개 이상 주문 시{' '}
                        {store.discountRate}% 할인
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="flex flex-col items-start gap-1 self-stretch">
                  <div className="flex justify-between items-center self-stretch">
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-headline1 font-bold text-text-default">
                        {store.storeName}
                      </h1>
                      <p className="text-label2 text-text-subtlest">
                        샌드위치·김밥
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-icon-star" />
                <p className="text-label2 font-medium text-text-default">
                  {store.reviewRating.toFixed(1)}
                </p>
                <p className="text-label2 font-medium text-text-default">
                  ({store.reviewCount})
                </p>
                <p className="text-label2 font-medium text-text-default">&gt;</p>
              </div>

              <h3 className="text-label1 self-stretch mt-2 text-text-default whitespace-pre-line">
                {store.description}
              </h3>
            </div>
            <div className="w-full h-[0.75px] bg-border-default my-3" />
          </div>

          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex items-start gap-1">
                <div className="flex pt-0.5 items-center gap-2.5">
                  <BellIcon className="text-brand-default w-4 h-4" />
                </div>
                <p className="text-brand-default text-label2 font-semibold leading-4.5">
                  최소 {store.minOrderDays}일 전 주문
                </p>
              </div>

              <div className="flex items-start gap-1">
                <div className="flex pt-0.5 items-center gap-2.5">
                  <AlertIcon className="text-brand-default w-4 h-4" />
                </div>
                <p className="text-brand-default text-label2 font-semibold leading-4.5">
                  주문 가능 수량 최소 {store.minOrderQuantity ?? 0}개 ~ 최대 {store.maxOrderQuantity ?? 99}개
                </p>
              </div>

              <div className="flex items-start gap-1">
                <div className="flex pt-0.5 items-center gap-2.5">
                  <Place className="text-icon-subtlest w-4 h-4" />
                </div>
                <p className="text-text-subtle text-label2 leading-4.5">
                  {store.address}
                </p>
              </div>

              <div className="flex items-start gap-1">
                <div className="flex pt-0.5 items-center gap-2.5">
                  <Phone className="text-icon-subtlest" />
                </div>
                <p className="text-text-subtle text-label2 leading-4.5">
                  Tel. {store.phoneNumber}
                </p>
              </div>

              <div className="flex items-start gap-1">
                <div className="flex pt-0.5 items-center gap-2.5">
                  <Calendar className="text-icon-subtlest" />
                </div>
                <p className="text-text-subtle text-label2 leading-4.5">
                  {formatClosedDays(store.closedDays)}
                </p>
              </div>
            </div>

            <div className="flex w-full px-3 py-2.5 flex-col items-start gap-3 border border-border-default border-px rounded-lg bg-background-default">
              <div
                className="flex w-full justify-between items-center cursor-pointer"
                onClick={() => setIsProcessExpanded((prev) => !prev)}
              >
                <div className="flex justify-center items-center gap-1.5">
                  <Notice className="text-icon-subtlest w-4 h-4" />
                  <p className="text-text-default text-label2 font-medium">
                    주문 프로세스 안내
                  </p>
                </div>
                {isProcessExpanded ? (
                  <ArrowUp
                    width={16}
                    height={16}
                    className="text-icon-default"
                  />
                ) : (
                  <ArrowDown
                    width={16}
                    height={16}
                    className="text-icon-default"
                  />
                )}
              </div>

              {isProcessExpanded && (
                <div className="w-full flex p-2.5 flex-col items-start gap-2.5 self-stretch animate-in fade-in slide-in-from-top-1 duration-200 rounded-lg bg-hover">
                  <div className="flex flex-col items-start gap-0.5 self-stretch">
                    <p className="text-label2 text-text-default whitespace-pre-line">
                      1. 주문 요청서 제출 및 결제 (선결제 / 현장결제 예약금)
                    </p>
                    <p className="text-label2 text-text-default whitespace-pre-line">
                      2. 담당자 확인 후 주문 승인 (24시간 이내)
                    </p>
                    <p className="text-label2 text-text-default whitespace-pre-line">
                      3. 픽업
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
