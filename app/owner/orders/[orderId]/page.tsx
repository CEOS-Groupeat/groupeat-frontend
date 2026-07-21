'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import BackButton from '@/components/ui/BackButton';
import SectionDivider from '@/components/ui/SectionDivider';
import Ellipse from '@/public/icons/icon_ellipse.svg';

import { components } from '@/src/types/schema';

type ApiResponseOrderDetailResponse =
  components['schemas']['ApiResponseOrderDetailResponse_OrderDetailDTO'];
type OrderDetailData =
  components['schemas']['OrderDetailResponse_OrderDetailDTO'];

const formatOrderDateTime = (dateStr?: string, timeStr?: string) => {
  if (!dateStr || !timeStr) return '일시 미상';

  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const [hourStr, minStr] = timeStr.split(':');
  if (!hourStr || !minStr) return '일시 미상';

  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);

  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const minuteText = minute > 0 ? ` ${minute}분` : '';

  return (
    <div className="flex items-center gap-1">
      <p className="text-text-default text-body">
        {month}월 {day}일
      </p>
      <Ellipse className="size-0.5 text-text-default shrink-0" />
      <p className="text-text-default text-body">
        {period} {displayHour}시{minuteText}
      </p>
    </div>
  );
};

export default function OwnerOrderDetail() {
  const params = useParams();
  const orderId = params.orderId as string;

  const {
    data: orderDetail,
    isLoading,
    isError,
  } = useQuery<OrderDetailData | undefined>({
    queryKey: ['ownerOrderDetail', orderId],
    queryFn: async () => {
      const res = await fetchClient<ApiResponseOrderDetailResponse>(
        `/api/owner/orders/${orderId}`
      );
      if (!res.isSuccess) throw new Error(res.message);

      return res.data;
    },
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white text-body text-text-subtle">
        주문 상세 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !orderDetail) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-4 px-4">
        <p className="text-status-danger text-body font-semibold">
          주문 정보를 찾을 수 없거나 에러가 발생했습니다.
        </p>
        <BackButton />
      </div>
    );
  }

  const { storeName, ordererInfo, orderMenus, paymentInfo } = orderDetail;

  const mappedStoreCart = {
    storeId: 0,
    storeName: storeName || '',
    storeTotalPrice: paymentInfo?.originalTotalAmount,
    cartItems: orderMenus?.map((menu, idx) => ({
      cartItemId: idx,
      menuName: menu.menuName,
      imageUrl: menu.menuImageUrl,
      quantity: menu.quantity,
      optionNames: menu.options?.map((opt) => opt.optionName ?? '') ?? [],
      unitPrice: (menu.totalAmount ?? 0) / (menu.quantity ?? 1),
      discountRate: menu.discountRate,
      finalPrice: menu.totalAmount,
    })),
  };

  return (
    <div className="w-full flex pb-9 flex-col items-center gap-5 bg-background-default">
      <header className="w-full flex pt-10 items-start gap-2.5 self-stretch">
        <div className="w-full flex p-4 items-center justify-between self-stretch">
          <BackButton />
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 상세
          </h1>
          <div />
        </div>
      </header>

      <section className="w-full flex flex-col pb-1 items-start self-stretch px-4">
        <h1 className="text-text-default text-headline3 font-semibold pb-3">
          주문자 정보
        </h1>
        <div className="flex flex-col items-start gap-2.75 self-stretch">
          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              주문자명
            </p>
            <p className="text-text-default text-body">
              {ordererInfo?.customerName || '미지정'}
            </p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              연락처
            </p>
            <p className="text-text-default text-body">
              {ordererInfo?.phoneNumber || '미지정'}
            </p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              주문 일자
            </p>
            {formatOrderDateTime(
              ordererInfo?.orderDate,
              ordererInfo?.orderTime
            )}
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              단체명
            </p>
            <p className="text-text-default text-body">
              {ordererInfo?.groupName || '없음'}
            </p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              요청사항
            </p>
            <p className="text-text-default text-body">
              {ordererInfo?.requests || '없음'}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider className="h-1.5" />

      <section className="w-full flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch w-full">
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h1>
          <OrderCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storeCart={mappedStoreCart as any}
            hidePickupInfo={true}
            noBorder={true}
          />
        </div>
      </section>

      <SectionDivider className="w-full h-1.5" />

      <section className="w-full flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch w-full">
          <h1 className="text-text-default text-headline3 font-semibold">
            결제 정보
          </h1>
          <div className="flex flex-col items-start gap-2 self-stretch w-full">
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-default text-label1">결제 방식</p>
              <p className="text-text-default text-label1">
                {paymentInfo?.paymentMethod === 'PREPAID'
                  ? '선결제'
                  : '현장결제'}
              </p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-default text-label1">결제 수단</p>
              <p className="text-text-default text-label1">
                {paymentInfo?.paymentMeans === 'TOSS'
                  ? '토스페이'
                  : '카카오페이'}
              </p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-default text-label1">총 금액</p>
              <p className="text-text-default text-label1 font-semibold">
                {paymentInfo?.finalPaymentAmount?.toLocaleString() ?? 0}원
              </p>
            </div>

            <OrderPrice
              perPersonAmount={paymentInfo?.perPersonAmount ?? 0}
              originalPrice={paymentInfo?.originalTotalAmount ?? 0}
              discountAmount={paymentInfo?.totalDiscountAmount ?? 0}
              finalPrice={paymentInfo?.finalPaymentAmount ?? 0}
              discountRate={paymentInfo?.discountRate ?? 0}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
