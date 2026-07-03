'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { components } from '@/src/types/schema'; // 💡 OpenAPI 추출 타입

import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import BackButton from '@/components/ui/BackButton';
import SectionDivider from '@/components/ui/SectionDivider';
import Ellipse from '@/public/icons/icon_ellipse.svg';

type OrderDetailResponse = components['schemas']['ApiResponseOrderDetailDTO'];

// 💡 헬퍼 함수: 날짜 포맷 (2026-07-02 -> 7월 2일)
const formatOrderDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
};

export default function OwnerOrderDetail() {
  const params = useParams();
  const orderId = params.orderId as string;

  // 💡 사장님용 주문 상세 조회 API 연동
  const { data, isLoading } = useQuery({
    queryKey: ['ownerOrderDetail', orderId],
    queryFn: async () => {
      // API 명세 상의 getOwnerOrderDetail 엔드포인트 호출
      const res = await fetchClient<OrderDetailResponse>(
        `/api/owner/orders/${orderId}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    enabled: !!orderId,
  });

  const cancelOrder = () => {
    // todo: 주문취소
    return;
  };

  if (isLoading || !data) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-white pb-16 items-center justify-center">
        로딩 중...
      </div>
    );
  }

  const { ordererInfo, orderMenus, paymentInfo } = data;

  // 💡 OrderCard 컴포넌트 Props 규격에 맞게 데이터 매핑
  const mappedStoreCart = {
    storeId: 0,
    storeName: '가게명 (API 추가 필요)', // 🚨 스키마에 가게 정보 없음
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
    <div className="w-full flex pb-16 flex-col items-center gap-6 bg-white">
      <header className="w-full flex pt-10 items-start gap-2.5 self-stretch">
        <div className="w-full flex p-4 items-center justify-between self-stretch">
          <BackButton />
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 상세
          </h1>
          <div />
        </div>
      </header>

      <section className="flex flex-col pb-1 items-start self-stretch px-4">
        <h1 className="text-text-default text-headline3 font-semibold pb-2">
          주문자 정보
        </h1>
        <div className="flex flex-col items-start gap-2.75 self-stretch">
          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              주문자명
            </p>
            <p className="text-text-default text-body">
              {ordererInfo?.customerName}
            </p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              연락처
            </p>
            <p className="text-text-default text-body">
              {ordererInfo?.phoneNumber}
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
              {/* 🚨 API 스키마에 시간값이 존재하지 않음 */}
              <p className="text-text-default text-body">시간 확인 불가</p>
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

      <SectionDivider />

      <section className="flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h1>
          <OrderCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storeCart={mappedStoreCart as any} // Option 매핑으로 인한 타입 단언
            pickupDate="날짜 누락" // 🚨
            pickupTime="시간 누락" // 🚨
          />
        </div>
      </section>

      <SectionDivider className="w-full my-5" />

      <section className="flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            결제 정보
          </h1>
          <div className="flex flex-col items-start gap-2 self-stretch">
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
              originalPrice={paymentInfo?.originalTotalAmount ?? 0}
              discountAmount={paymentInfo?.totalDiscountAmount ?? 0}
              finalPrice={paymentInfo?.finalPaymentAmount ?? 0}
              discountRate={paymentInfo?.discountRate ?? 0}
              // TODO: 팀원 확인 필요
              perPersonAmount={paymentInfo?.perPersonAmount ?? 0}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
