/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import UpArrow from '@/public/icons/icon_arrow_up.svg';
import AddIcon from '@/public/icons/icon_add_store.svg';
import StoreDateFilter from '@/app/customer/store/[storeId]/_components/StoreDateFilter';
import { MenuListApiResponse, Menu } from '@/src/types/api';
import { ApiResponse, PickupTimeInfo } from '@/types/store';
import MenuBottomSheet from '@/app/customer/store/[storeId]/_components/MenuBottomSheet';
import { useCartStore } from '@/store/useCartStore';
import FloatingCartBar from '@/app/customer/store/[storeId]/_components/FloatingCartBar';
import Image from 'next/image';
import { useStoreDetail } from '@/app/customer/store/_hooks/useStoreDetail';

// 💡 1. 픽업 가능 시간 목록을 생성하는 유틸리티 함수 추가
const generateAvailableTimes = (
  openTime?: string,
  closeTime?: string
): string[] => {
  if (!openTime || !closeTime) return [];

  // "10:00:00" -> 10, 0
  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  const open = parseTime(openTime);
  const close = parseTime(closeTime);
  const times: string[] = [];

  let currentHours = open.hours;
  let currentMinutes = open.minutes;

  // 마감 시간과 같거나 작을 때까지 30분 단위로 시간 생성
  while (
    currentHours < close.hours ||
    (currentHours === close.hours && currentMinutes <= close.minutes)
  ) {
    const formattedHours = currentHours.toString().padStart(2, '0');
    const formattedMinutes = currentMinutes.toString().padStart(2, '0');

    // "HH:MM" 형식으로 배열에 추가 (서버에 넘겨줄 형식과 동일하게 맞춤)
    times.push(`${formattedHours}:${formattedMinutes}`);

    currentMinutes += 30;
    if (currentMinutes >= 60) {
      currentHours += 1;
      currentMinutes = 0;
    }
  }

  return times;
};

export default function StoreOptions() {
  const params = useParams();
  const storeId = params.storeId as string;
  const { data: store } = useStoreDetail(storeId);

  const availableTimes = generateAvailableTimes(
    store?.pickupOpenTime,
    store?.pickupCloseTime
  );

  const storeCarts = useCartStore((state) => state.storeCarts);
  const globalPickupDate = useCartStore((state) => state.pickupDate);
  const globalPickupTime = useCartStore((state) => state.pickupTime);

  const [isDateExpanded, setIsDateExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const activeDate = selectedDate ?? globalPickupDate ?? undefined;
  const activeTime =
    selectedDate !== undefined ? selectedTime : (globalPickupTime ?? undefined);

  const displayTime = activeTime ? activeTime.slice(0, 5) : undefined;

  const formattedDate = (() => {
    if (!activeDate || !displayTime) return undefined;

    const [, monthStr, dayStr] = activeDate.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    const [hourStr, minuteStr] = displayTime.split(':');
    const hour = parseInt(hourStr, 10);

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${month}월 ${day}일 ${period} ${displayHour}:${minuteStr}`;
  })();

  const hasMenuInCart = (() => {
    const safeStoreCarts = Array.isArray(storeCarts) ? storeCarts : [];
    const currentStoreCart = safeStoreCarts.find(
      (cart) => cart.storeId?.toString() === storeId
    );
    return (currentStoreCart?.cartItems?.length || 0) > 0;
  })();

  const { data: menuData, isLoading: isMenuLoading } = useQuery<Menu[]>({
    queryKey: ['menus', storeId],
    queryFn: async () => {
      const response = await fetchClient<MenuListApiResponse>(
        `/api/stores/${storeId}/menus`
      );
      if (!response.isSuccess) throw new Error(response.message);
      return response.data?.menus || [];
    },
    enabled: !!storeId,
  });

  const { data: pickupData, isLoading: isPickupLoading } =
    useQuery<PickupTimeInfo>({
      queryKey: ['pickupTimes', storeId, activeDate],
      queryFn: async () => {
        const response = await fetchClient(
          `/api/stores/${storeId}/pickup-times?date=${activeDate}`
        );
        const result = response as unknown as ApiResponse<PickupTimeInfo>;
        if (!result.isSuccess) throw new Error(result.message);
        return result.data;
      },
      enabled: !!storeId && !!activeDate,
    });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeChange = (times: string[]) => {
    if (times.length > 0) {
      setSelectedTime(times[times.length - 1]);
    } else {
      setSelectedTime(undefined);
    }
  };

  const handleMenuSelect = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const getMenuCartQuantity = (menuName: string) => {
    const safeStoreCarts = Array.isArray(storeCarts) ? storeCarts : [];
    const currentStoreCart = safeStoreCarts.find(
      (cart) => cart.storeId?.toString() === storeId
    );
    if (!currentStoreCart || !currentStoreCart.cartItems) return 0;

    return currentStoreCart.cartItems
      .filter((item: any) => item.menuName === menuName)
      .reduce((acc: any, item: any) => acc + (item.quantity || 0), 0);
  };

  return (
    <>
      <div className="w-full flex flex-col px-4 pt-2.5 pb-30 gap-3">
        <div className="w-full flex flex-col justify-center items-start gap-2.5 self-stretch">
          <div className="flex flex-col items-start self-stretch w-full border-b border-px border-border-subtle">
            <button
              type="button"
              onClick={() => setIsDateExpanded((prev) => !prev)}
              className={`w-full h-11 flex items-center justify-between ${
                isDateExpanded ? '' : 'border-b border-border-subtle pb-3 '
              }`}
            >
              <div className="flex items-start gap-1">
                <span className="text-base font-semibold text-text-default flex items-center gap-1">
                  픽업 일자
                </span>
                <div className="flex pr-1 pt-0.5 items-center gap-2.5">
                  {formattedDate && !isDateExpanded && (
                    <div className="w-1 h-1 rounded-full bg-brand-default" />
                  )}
                </div>
              </div>
              {isDateExpanded ? (
                <UpArrow className="size-5 text-icon-default" />
              ) : (
                <DownArrow className="size-5 text-icon-subtlest" />
              )}
            </button>

            {isDateExpanded && (
              <div className="w-full flex flex-col animate-in fade-in slide-in-from-top-2 duration-200 pb-5">
                <StoreDateFilter
                  date={activeDate}
                  times={displayTime ? [displayTime] : []}
                  minOrderDays={store?.minOrderDays ?? 0}
                  closedDays={store?.closedDays ?? undefined}
                  scheduleStartDate={store?.scheduleStartDate}
                  scheduleEndDate={store?.scheduleEndDate}
                  onDateChange={handleDateChange}
                  onTimeChange={handleTimeChange}
                  availableTimes={availableTimes}
                />

                {activeDate && (
                  <div className="w-full flex flex-col items-start gap-0.5 self-stretch mt-5 border-border-default">
                    <p className="text-caption1 text-text-subtlest">
                      {formattedDate || '시간을 선택해주세요'}
                    </p>
                    <div className="flex items-start gap-1">
                      <p className="text-label1 text-text-default">
                        픽업 가능 수량
                      </p>
                      <p className="text-brand-default text-label1 font-semibold">
                        {isPickupLoading
                          ? '확인 중...'
                          : `${pickupData?.dailyAvailableQuantity ?? 0}개`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-start gap-2.5 self-stretch">
          <div className="flex flex-col items-start self-stretch w-full">
            <button
              type="button"
              onClick={() => setIsMenuExpanded((prev) => !prev)}
              className={`w-full flex items-center justify-between ${
                isMenuExpanded ? '' : 'pb-3 border-b border-border-subtle'
              }`}
            >
              <div className="flex items-start gap-1">
                <span className="text-base font-semibold text-text-default flex items-center gap-1">
                  메뉴
                </span>
                <div className="flex pr-1 pt-0.5 items-center gap-2.5">
                  {hasMenuInCart && !isMenuExpanded && (
                    <div className="w-1 h-1 rounded-full bg-brand-default" />
                  )}
                </div>
              </div>

              {isMenuExpanded ? (
                <UpArrow className="text-icon-default size-5 shrink-0" />
              ) : (
                <DownArrow className="text-icon-subtlest size-5 shrink-0" />
              )}
            </button>

            {isMenuExpanded && (
              <div className="w-full flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                {isMenuLoading && (
                  <div className="py-8 text-center text-label1 text-text-subtlest">
                    메뉴를 불러오는 중입니다...
                  </div>
                )}

                {menuData?.map((menu) => {
                  const quantityInCart = getMenuCartQuantity(menu.name || '');

                  return (
                    <div
                      key={menu.menuId!}
                      onClick={() => handleMenuSelect(menu)}
                      className="flex flex-col w-full gap-5 py-4 border-b border-border-default cursor-pointer"
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col">
                          <p className="text-label1 font-medium text-text-default">
                            {menu.name}
                          </p>
                          <p className="text-body font-bold text-text-default">
                            {(menu.basePrice || 0).toLocaleString()}원
                          </p>
                          <p className="text-label2 text-text-subtlest mt-1.5 line-clamp-2 pr-4">
                            {menu.description}
                          </p>
                        </div>

                        <div className="w-22.5 h-22.5 bg-neutral-10 rounded-xl shrink-0 flex items-end justify-end p-1.5 relative overflow-hidden bg-black">
                          {menu.imageUrl ? (
                            <Image
                              src={menu.imageUrl}
                              alt={menu.name || '메뉴 이미지'}
                              fill
                              className="object-cover"
                              priority={false}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-neutral-20" />
                          )}

                          {quantityInCart > 0 ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuSelect(menu);
                              }}
                              className="relative z-10 w-6.5 h-6.5 flex items-center justify-center text-label2 rounded-full bg-brand-default text-white"
                            >
                              {quantityInCart}
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuSelect(menu);
                              }}
                              className="z-10 w-6.5 h-6.5 bg-white rounded-full flex justify-center items-center shadow-sm aspect-square"
                            >
                              <AddIcon className="w-[17.33px] h-[17.33px] text-icon-default" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

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
          pickupDate={activeDate}
          pickupTime={activeTime}
          dailyAvailableQuantity={pickupData?.dailyAvailableQuantity}
          dailyMinOrderQuantity={pickupData?.dailyMinOrderQuantity}
          onClose={() => setSelectedMenu(null)}
        />
      )}
      <FloatingCartBar storeId={storeId} pickupDateTime={formattedDate} />
    </>
  );
}
