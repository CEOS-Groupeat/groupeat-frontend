'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { ApiResponse, StoreDetail as StoreDetailType } from '@/types/store';

import Ticket from '@/public/icons/icon_ticket.svg';
import HeartOff from '@/public/icons/icon_heartOff.svg';
import HeartOn from '@/public/icons/icon_heartOn.svg';
import Star from '@/public/icons/icon_star.svg';
import Alert from '@/public/icons/icon_alert.svg';
import Place from '@/public/icons/icon_place.svg';
import Phone from '@/public/icons/icon_phone.svg';
import Calendar from '@/public/icons/icon_calendar.svg';
import Notice from '@/public/icons/icon_notice.svg';
import ArrowUp from '@/public/icons/icon_arrow_up.svg';

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

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const {
    data: store,
    isLoading,
    isError,
  } = useQuery<StoreDetailType>({
    queryKey: ['storeDetail', storeId],
    queryFn: async () => {
      const response = await fetchClient(`/api/stores/${storeId}`);
      const result = response as unknown as ApiResponse<StoreDetailType>;

      if (!result.isSuccess) {
        throw new Error(result.message);
      }
      return result.data;
    },
    enabled: !!storeId,
  });

  // 로딩 및 에러 처리 (스켈레톤 UI를 넣기 좋은 자리입니다)
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
      <div className="flex flex-col items-start self-stretch">
        <div className="flex flex-col items-start gap-1 self-stretch">
          <div className="flex p-4 flex-col items-center gap-1 self-stretch">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex flex-col items-start gap-1 self-stretch">
                {/* 조건부 렌더링: 할인 정보가 있을 때만 뱃지 표시 */}
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

                <div className="flex flex-col items-start gap-2 self-stretch mt-1">
                  <div className="flex flex-col items-start gap-1 self-stretch">
                    <div className="flex justify-between items-center self-stretch">
                      <div className="flex items-center gap-1.5">
                        <h1 className="text-headline1 font-bold text-text-default">
                          {store.storeName}
                        </h1>
                        <p className="text-label2 text-text-subtlest">
                          {/* 백엔드 스펙에 카테고리가 없다면 고정 텍스트를 쓰거나 백엔드에 추가 요청 필요 */}
                          샌드위치·김밥
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-pressed={isFavorite}
                        onClick={() => setIsFavorite((v) => !v)}
                        className="rounded"
                      >
                        {isFavorite ? (
                          <HeartOn className="w-6 h-6" />
                        ) : (
                          <HeartOff className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  <Star />
                  <p className="text-label2 text-text-default">
                    {store.reviewRating.toFixed(1)}
                  </p>
                  <p className="text-label2 text-text-default">
                    ({store.reviewCount})
                  </p>
                  <p className="text-label2 text-text-default">&gt;</p>
                </div>

                <h3 className="text-label1 self-stretch mt-2 text-text-default whitespace-pre-line">
                  {/* 설명에 \n 이 있을 경우 줄바꿈이 적용되도록 whitespace-pre-line 추가 */}
                  {store.description}
                </h3>
              </div>
              <div className="w-full h-[0.75px] bg-border-default my-1" />
            </div>

            {/* 하단 상세 정보 리스트 */}
            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex items-start gap-1">
                  <div className="flex pt-0.5 items-center gap-2.5">
                    <Alert className="text-brand-default w-4 h-4" />
                  </div>
                  <p className="text-brand-default text-label2 leading-4.5">
                    최소 {store.minOrderDays}일 전 주문
                  </p>
                </div>

                <div className="flex items-start gap-1">
                  <div className="flex pt-0.5 items-center gap-2.5">
                    <Place className="text-icon-subtlest" />
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
                    {/* 💡 변환된 휴무일 함수 적용 영역 */}
                    {formatClosedDays(store.closedDays)}
                  </p>
                </div>
              </div>

              {/* 주문 프로세스 아코디언 (퍼블리싱 영역) */}
              <div className="flex w-full px-3 pt-2 pb-2.5 flex-col items-start gap-3 border border-border-default border-px rounded-lg bg-background-default mt-2">
                <div className="flex w-full justify-between items-center cursor-pointer">
                  <div className="flex justify-center items-center gap-1.5">
                    <Notice className="text-icon-subtlest w-4 h-4" />
                    <p className="text-text-default text-label2 font-medium">
                      주문 프로세스 안내
                    </p>
                  </div>
                  <ArrowUp
                    width={16}
                    height={16}
                    className="text-icon-default"
                  />
                </div>
                {/* <p className="text-label2 text-text-subtlest">{store.orderProcess}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
