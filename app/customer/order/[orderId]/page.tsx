'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

import OrderStatusBar from '@/app/customer/order/[orderId]/_components/OrderStatusBar';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import SectionDivider from '@/components/ui/SectionDivider';
import Ellipse from '@/public/icons/icon_ellipse.svg';
import Alert from '@/public/icons/icon_alert.svg';
import BackButton from '@/components/ui/BackButton';
import { components } from '@/src/types/schema';

type OrderDetailResponse = components['schemas']['ApiResponseOrderDetailDTO'];

// 헬퍼 함수: 날짜 포맷 (2026-07-02 -> 7월 2일)
const formatOrderDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
};

// 헬퍼 함수: 주문 상태를 OrderStatusBar의 Step으로 변환
const getStepFromStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
    case 'PAID':
      return 1;
    case 'ACCEPTED':
      return 2;
    case 'COMPLETED':
      return 3;
    default:
      return 1;
  }
};

export default function CustomerOrderDetail() {
  const params = useParams();
  const orderId = params.orderId as string;

  const { data, isLoading } = useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      const res = await fetchClient<OrderDetailResponse>(
        `/api/orders/${orderId}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    enabled: !!orderId,
  });

  const cancelOrder = () => {
    // todo: 주문취소 (openapi의 cancelOrder 엔드포인트 연결)
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

  // 💡 OpenAPI 스키마에 orderStatus가 누락되어 있어 임시로 타입 단언하여 사용합니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderStatus = (data as any).orderStatus as string;

  // OrderCard 컴포넌트 Props 규격에 맞게 데이터 매핑
  const mappedStoreCart = {
    storeId: 0,
    storeName: '가게명 (API 추가 필요)',
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

      <main className="flex px-4 flex-col items-center gap-5 self-stretch">
        {/* 💡 조건부 렌더링: REJECTED, CANCELLED 상태 처리 */}
        {orderStatus === 'REJECTED' ? (
          <div className="w-full flex flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-0.75">
              <p className="text-text-subtle font-semibold">
                가게명 (API 추가 필요)
              </p>
              <p className="text-headline1 font-semibold">
                주문이 거절되었습니다.
              </p>
              <div className="flex items-center gap-1">
                <p className="text-text-subtlest text-label1">날짜 누락</p>
                <Ellipse className="w-1 h-1 text-text-subtlest" />
                <p className="text-text-subtlest text-label1">시간 누락</p>
                <div className="flex items-center gap-1 mt-0.5"></div>
              </div>
            </div>
          </div>
        ) : orderStatus === 'CANCELLED' ? (
          <div className="w-full flex flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-0.75">
              <p className="text-text-subtle font-semibold">
                가게명 (API 추가 필요)
              </p>
              <p className="text-headline1 font-semibold">
                주문이 취소되었습니다.
              </p>
              <div className="flex items-center gap-1">
                <p className="text-text-subtlest text-label1">날짜 누락</p>
                <Ellipse className="w-1 h-1 text-text-subtlest" />
                <p className="text-text-subtlest text-label1">시간 누락</p>
                <div className="flex items-center gap-1 mt-0.5"></div>
              </div>
            </div>
          </div>
        ) : (
          <OrderStatusBar
            storeName="가게명 (API 추가 필요)"
            currentStep={getStepFromStatus(orderStatus)}
            pickupDate="날짜 누락 (API)"
            pickupTime="시간 누락 (API)"
            paymentMethod={
              paymentInfo?.paymentMeans === 'TOSS' ? '토스페이' : '카카오페이'
            }
          />
        )}
      </main>

      <SectionDivider className="w-full" />

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

      <SectionDivider className="w-full" />

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
              perPersonAmount={paymentInfo?.perPersonAmount ?? 0}
              originalPrice={paymentInfo?.originalTotalAmount ?? 0}
              discountAmount={paymentInfo?.totalDiscountAmount ?? 0}
              finalPrice={paymentInfo?.finalPaymentAmount ?? 0}
              discountRate={paymentInfo?.discountRate ?? 0}
            />
          </div>
        </div>
      </section>

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
              {/* 스키마에 orderTime이 존재하지 않음 */}
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

      {/* 💡 거절/취소/완료 상태일 때는 '주문 취소하기' 버튼 숨김 처리 (선택 사항) */}
      {orderStatus !== 'REJECTED' &&
        orderStatus !== 'CANCELLED' &&
        orderStatus !== 'COMPLETED' && (
          <div className="w-full flex flex-col items-start justify-center px-4 gap-2.5">
            <SectionDivider className="w-full" />
            <button
              onClick={cancelOrder}
              className="w-full h-12 rounded-xl flex justify-center items-center py-3 px-12 font-semibold border border-border-default"
            >
              주문 취소하기
            </button>
            <div className="flex items-start gap-1">
              <Alert className="text-icon-disable w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-text-subtlest text-label2 font-medium">
                주문 정보 변경을 원하시면 취소 후 재주문해 주세요.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
