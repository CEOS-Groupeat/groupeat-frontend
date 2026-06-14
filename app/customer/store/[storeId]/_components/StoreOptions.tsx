'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import UpArrow from '@/public/icons/icon_arrow_up.svg';
//import DateFilter from '@/app/customer/search/_components/filters/DateFilter';
//  PickupTimeInfo 타입 임포트 추가
import {
  ApiResponse,
  Menu,
  MenusResponse,
  PickupTimeInfo,
} from '@/types/store';
import MenuBottomSheet from '@/app/customer/store/[storeId]/_components/MenuBottomSheet';

export default function StoreOptions() {
  const params = useParams();
  const storeId = params.storeId as string;

  const [isDateExpanded, setIsDateExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const formattedDate =
    selectedDate && selectedTime
      ? `${selectedDate} ${selectedTime}`
      : undefined;

  // ── 데이터 패칭 영역 ──

  // 1. 메뉴 데이터 패칭
  const { data: menuData, isLoading: isMenuLoading } = useQuery<Menu[]>({
    queryKey: ['menus', storeId],
    queryFn: async () => {
      const response = await fetchClient(`/api/stores/${storeId}/menus`);
      const result = response as unknown as ApiResponse<MenusResponse>;
      if (!result.isSuccess) throw new Error(result.message);
      return result.data.menus;
    },
    enabled: !!storeId,
  });

  //  2. 픽업 시간 데이터 패칭 추가
  const { data: pickupData, isLoading: isPickupLoading } =
    useQuery<PickupTimeInfo>({
      // 1. queryKey에 selectedDate를 포함시킵니다.
      // 이렇게 해야 사용자가 날짜를 바꿀 때마다 React Query가 새로운 날짜의 데이터를 캐싱하고 리패칭합니다.
      queryKey: ['pickupTimes', storeId, selectedDate],
      queryFn: async () => {
        const response = await fetchClient(
          `/api/stores/${storeId}/pickup-times?date=${selectedDate}`
        );
        const result = response as unknown as ApiResponse<PickupTimeInfo>;
        if (!result.isSuccess) throw new Error(result.message);
        return result.data;
      },
      // 3. storeId뿐만 아니라 실제로 사용자가 날짜를 선택(selectedDate가 존재)했을 때만 API가 날아가도록 방어코드를 세웁니다.
      enabled: !!storeId && !!selectedDate,
    });
  return (
    <>
      <div className="w-full flex flex-col px-4 pt-2.5 pb-30 gap-3">
        {/* 1. 픽업 일자 드롭다운 섹션 */}
        <div className="w-full flex flex-col justify-center items-start gap-2.5 self-stretch">
          <div className="flex flex-col items-start self-stretch w-full border-b border-px border-border-subtle">
            <button
              type="button"
              onClick={() => setIsDateExpanded((prev) => !prev)}
              className={`w-full h-11 flex items-center justify-between ${
                isDateExpanded ? '' : 'border-b border-border-subtle pb-3 '
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-text-default">
                  픽업 일자
                </span>
                {formattedDate && !isDateExpanded && (
                  <span className="text-xs font-medium text-brand-default">
                    {formattedDate}
                  </span>
                )}
              </div>
              {isDateExpanded ? (
                <UpArrow className="size-5 text-icon-default" />
              ) : (
                <DownArrow className="size-5 text-icon-subtlest" />
              )}
            </button>

            {isDateExpanded && (
              <div className="w-full flex flex-col animate-in fade-in slide-in-from-top-2 duration-200 pb-5">
                <div className="pb-5">
                  {/* <DateFilter
                    date={selectedDate}
                    time={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                    //  나중에 DateFilter 내부 로직을 짤 때 이 데이터를 프롭으로 넘겨주면 유용합니다!
                    // openTime={pickupData?.openTime}
                    // closeTime={pickupData?.closeTime}
                    // interval={pickupData?.intervalMinutes}
                  /> */}
                </div>

                <div className="w-full flex flex-col items-start gap-0.5 self-stretch">
                  <p className="text-caption1 text-text-subtlest">
                    {formattedDate || '일시를 선택해주세요'}
                  </p>
                  <div className="flex items-start gap-1">
                    <p className="text-label1 text-text-default">
                      픽업 가능 수량
                    </p>
                    {/*  하드코딩된 '100개'를 API 데이터로 교체 */}
                    <p className="text-brand-default text-label1 font-semibold">
                      {isPickupLoading
                        ? '확인 중...'
                        : `${pickupData?.dailyAvailableQuantity ?? 0}개`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. 메뉴 드롭다운 섹션 (이전 코드와 동일) */}
        <div className="w-full flex flex-col justify-center items-start gap-2.5 self-stretch">
          <div className="flex flex-col items-start self-stretch w-full">
            <button
              type="button"
              onClick={() => setIsMenuExpanded((prev) => !prev)}
              className={`w-full flex items-center justify-between ${
                isMenuExpanded ? '' : 'pb-3 border-b border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-body font-semibold text-text-default">
                  메뉴
                </span>
              </div>
              {isMenuExpanded ? (
                <UpArrow className="text-icon-default size-5" />
              ) : (
                <DownArrow className="text-icon-subtlest size-5" />
              )}
            </button>

            {isMenuExpanded && (
              <div className="w-full flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                {isMenuLoading && (
                  <div className="py-8 text-center text-label1 text-text-subtlest">
                    메뉴를 불러오는 중입니다...
                  </div>
                )}

                {menuData?.map((menu) => (
                  <div
                    key={menu.menuId}
                    className="flex flex-col w-full gap-6 py-4 border-b border-border-default"
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col">
                        <p className="text-label1 font-medium text-text-default">
                          {menu.name}
                        </p>
                        <p className="text-body font-bold text-text-default">
                          {menu.basePrice.toLocaleString()}원
                        </p>
                        <p className="text-label2 text-text-subtlest mt-1.5 line-clamp-2 pr-4">
                          {menu.description}
                        </p>
                      </div>

                      <div className="w-22.5 h-22.5 bg-neutral-10 rounded-xl shrink-0 flex items-end justify-end p-1.5 relative overflow-hidden bg-black">
                        {menu.imageUrl ? (
                          <img
                            src={menu.imageUrl}
                            alt={menu.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-neutral-20" />
                        )}

                        <button
                          onClick={() => setSelectedMenu(menu)}
                          className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {!isMenuLoading && menuData?.length === 0 && (
                  <div className="py-8 text-center text-label1 text-text-subtlest">
                    등록된 메뉴가 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMenu && (
        <MenuBottomSheet
          storeId={storeId}
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
        />
      )}
    </>
  );
}
