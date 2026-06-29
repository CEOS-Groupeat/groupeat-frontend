// app/owner/orders/[orderId]/page.tsx (예시 경로)
'use client';

import { useParams } from 'next/navigation';
import { useGetOwnerOrderDetail } from '@/hooks/useGetOwnerOrderDetail';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import BackButton from '@/components/ui/BackButton';
import SectionDivider from '@/components/ui/SectionDivider';
import Ellipse from '@/public/icons/icon_ellipse.svg';

export default function OwnerOrderDetail() {
  const params = useParams();
  const orderId = Number(params.orderId);

  const {
    data: orderDetail,
    isLoading,
    isError,
    error,
  } = useGetOwnerOrderDetail(orderId);

  const cancelOrder = () => {
    // todo: 주문취소 로직 추가 예정
    return;
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white text-body text-text-subtle">
        주문 상세 정보를 불러오는 중입니다...
      </div>
    );
  }

  // 에러 상태 처리
  if (isError || !orderDetail) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-4 px-4">
        <p className="text-status-danger text-body font-semibold">
          {error?.message || '주문 정보를 찾을 수 없습니다.'}
        </p>
        <BackButton />
      </div>
    );
  }

  // 데이터 구조 분해 할당 (openAPI TS 타입 추론 적용)
  const { ordererInfo, orderMenus, paymentInfo } = orderDetail;

  // 날짜 포맷 변환 유틸 (예: "2026-06-20" -> "6월 20일")
  const formatOrderDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const [_, month, day] = dateStr.split('-');
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
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

      {/* 1. 주문자 정보 섹션 데이터 바인딩 */}
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
              {/* 타임스탬프 파싱이 추가로 필요할 경우 파싱 로직 확장 가능 */}
              <Ellipse />
              <p className="text-text-default text-body">오후 12시 00일</p>
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

      {/* 2. 주문 정보 섹션 - 복수 메뉴 렌더링 대응 */}
      <section className="w-full flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch w-full">
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h1>
          {orderMenus?.map((menu, index) => (
            <OrderCard
              key={index}
              menuName={menu.menuName}
              quantity={menu.quantity}
              menuImageUrl={menu.menuImageUrl}
              discountRate={menu.discountRate}
              totalAmount={menu.totalAmount}
              // 명세상 options 배열 구조 전달 필요 시 주입 처리
              options={menu.options?.map((o) => o.optionName)}
            />
          ))}
        </div>
      </section>

      <SectionDivider className="w-full my-5" />

      {/* 3. 결제 정보 섹션 데이터 바인딩 */}
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
                {paymentInfo?.paymentMeans || '카드결제'}
              </p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-subtlest text-label1">총 금액</p>
              <p className="text-text-default text-label1 font-semibold">
                {paymentInfo?.finalPaymentAmount?.toLocaleString()}원
              </p>
            </div>
            {/* 하위 컴포넌트에도 정합성을 맞추기 위해 결제 데이터 전달 */}
            <OrderPrice/>
          </div>
        </div>
      </section>
    </div>
  );
}
