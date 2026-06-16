'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import UpArrow from '@/public/icons/icon_arrow_up.svg';
import DateFilter from '@/app/customer/search/_components/filters/DateFilter';
import { MenuListApiResponse, Menu } from '@/src/types/api';
import { ApiResponse, PickupTimeInfo } from '@/types/store';
import MenuBottomSheet from '@/app/customer/store/[storeId]/_components/MenuBottomSheet';
import { useCartStore } from '@/store/useCartStore';
import FloatingCartBar from '@/app/customer/store/[storeId]/_components/FloatingCartBar';

export default function StoreOptions() {
  const params = useParams();
  const storeId = params.storeId as string;

  const storeCarts = useCartStore((state) => state.storeCarts);

  const [isDateExpanded, setIsDateExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const formattedDate =
    selectedDate && selectedTime
      ? `${selectedDate} ${selectedTime}`
      : undefined;

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
      queryKey: ['pickupTimes', storeId, selectedDate],
      queryFn: async () => {
        const response = await fetchClient(
          `/api/stores/${storeId}/pickup-times?date=${selectedDate}`
        );
        const result = response as unknown as ApiResponse<PickupTimeInfo>;
        if (!result.isSuccess) throw new Error(result.message);
        return result.data;
      },
      enabled: !!storeId && !!selectedDate,
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
    const currentStoreCart = storeCarts.find(
      (cart) => cart.storeId?.toString() === storeId
    );
    if (!currentStoreCart || !currentStoreCart.cartItems) return 0;

    return currentStoreCart.cartItems
      .filter((item) => item.menuSummary?.includes(menuName))
      .reduce((acc, item) => acc + (item.quantity || 0), 0);
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
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-text-default flex items-center gap-1">
                  픽업 일자
                  {formattedDate && (
                    <div className="w-1 h-1 rounded-full bg-brand-default" />
                  )}
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
                  <DateFilter
                    date={selectedDate}
                    times={selectedTime ? [selectedTime] : []}
                    onDateChange={handleDateChange}
                    onTimeChange={handleTimeChange}
                  />
                </div>

                <div className="w-full flex flex-col items-start gap-0.5 self-stretch">
                  <p className="text-caption1 text-text-subtlest">
                    {formattedDate || '일시를 선택해주세요'}
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

                {menuData?.map((menu) => {
                  const quantityInCart = getMenuCartQuantity(menu.name || '');

                  return (
                    <div
                      key={menu.menuId!}
                      className="flex flex-col w-full gap-6 py-4 border-b border-border-default"
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
                            <img
                              src={menu.imageUrl}
                              alt={menu.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-neutral-20" />
                          )}

                          {quantityInCart > 0 ? (
                            <button
                              onClick={() => handleMenuSelect(menu)}
                              className="relative z-10 w-6 h-6 flex items-center justify-center text-white text-xs font-semibold"
                              style={{
                                borderRadius: 'var(--Radius-full, 999px)',
                                background: 'var(--brand-default, #F45C33)',
                                boxShadow: '0 0 13px 0 rgba(0, 0, 0, 0.20)',
                              }}
                            >
                              {quantityInCart}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMenuSelect(menu)}
                              className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm text-lg leading-none"
                            >
                              +
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
          pickupDate={selectedDate}
          pickupTime={selectedTime}
          onClose={() => setSelectedMenu(null)}
        />
      )}
      <FloatingCartBar 
        storeId={storeId} 
        pickupDateTime={formattedDate}
      />
    </>
  );
}
