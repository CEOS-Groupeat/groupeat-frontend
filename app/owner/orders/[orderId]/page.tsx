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

const formatOrderDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
};

const formatOrderTime = (timeStr?: string) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;

  const hour = parseInt(parts[0], 10);
  const minute = parts[1];
  const ampm = hour >= 12 ? '오후' : '오전';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  return `${ampm} ${displayHour}시 ${minute}분`;
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

  const {
    storeName,
    ordererInfo,
    orderMenus,
    paymentInfo,
  } = orderDetail;

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
    <div className="w-full flex pb-9 flex-col items-center gap-6 bg-background-default">
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
        <h1 className="text-text-default text-headline3 font-semibold pb-2">
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
            <div className="flex items-center gap-1">
              <p className="text-text-default text-body">
                {formatOrderDate(ordererInfo?.orderDate)}
              </p>
              <Ellipse />
              <p className="text-text-default text-body">
                {formatOrderTime(ordererInfo?.orderTime)}
              </p>
            </div>
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
            storeCart={mappedStoreCart}
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
              <p className="text-text-subtlest text-label1">결제 방식</p>
              <p className="text-text-default text-label1">
                {paymentInfo?.paymentMethod === 'PREPAID'
                  ? '선결제'
                  : '현장결제'}
              </p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-subtlest text-label1">결제 수단</p>
              <p className="text-text-default text-label1">
                {paymentInfo?.paymentMeans === 'TOSS'
                  ? '토스페이'
                  : '카카오페이'}
              </p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-subtlest text-label1">총 금액</p>
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
