'use client';

import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useState } from 'react';

import OrderStatusBar from '@/app/customer/order/[orderId]/_components/OrderStatusBar';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import SectionDivider from '@/components/ui/SectionDivider';
import Ellipse from '@/public/icons/icon_ellipse.svg';
import Alert from '@/public/icons/icon_alert.svg';
import { components } from '@/src/types/schema';
import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';
import CheckBoxTrueIcon from '@/public/icons/icon_checkboxTrue.svg';
import BoundingBoxIcon from '@/public/icons/icon_checkboxFalse.svg';
import ArrowLeft from '@/public/icons/icon_arrow_left_padding.svg';

import Link from 'next/link';

type ApiOrderDetailResponse =
  components['schemas']['ApiResponseOrderDetailResponse_OrderDetailDTO'];
type OrderDetailData =
  components['schemas']['OrderDetailResponse_OrderDetailDTO'];
type ApiOrderCancelResponse =
  components['schemas']['ApiResponseOrderCancelResponse'];

const formatOrderDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
};

const formatTime = (timeStr?: string) => {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
};

const formatKoreanTime = (timeStr?: string) => {
  if (!timeStr) return '';
  const [hourStr, minStr] = timeStr.split(':');
  if (!hourStr || !minStr) return timeStr; // 예외 처리

  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);

  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const minuteText = minute > 0 ? ` ${minute}분` : '';

  return `${period} ${displayHour}시${minuteText}`;
};

const getStepFromStatus = (status?: string) => {
  switch (status) {
    case 'PENDING':
    case 'PAID':
      return 0;
    case 'ACCEPTED':
      return 1;
    case 'COMPLETED':
      return 2;
    default:
      return 0;
  }
};

const CANCEL_REASONS = [
  '단순 변심',
  '메뉴 및 수량 잘못 선택',
  '중복 주문',
  '픽업 일정, 위치, 인원 변경',
];

export default function CustomerOrderDetail() {
  const params = useParams();
  const orderId = params.orderId as string;
  const queryClient = useQueryClient();

  const [modalOn, setModalOn] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>(
    CANCEL_REASONS[0]
  );

  const { data, isLoading } = useQuery<OrderDetailData | undefined>({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      const res = await fetchClient<ApiOrderDetailResponse>(
        `/api/orders/${orderId}`
      );
      if (!res.isSuccess) throw new Error(res.message);

      return res.data;
    },
    enabled: !!orderId,
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const res = await fetchClient<ApiOrderCancelResponse>(
        `/api/orders/${orderId}/cancel`,
        {
          method: 'PATCH',
          body: JSON.stringify({ cancelReason: selectedReason }),
        }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      setModalOn(false);
      queryClient.invalidateQueries({ queryKey: ['orderDetail', orderId] });
    },
    onError: (error) => {
      alert(`주문 취소에 실패했습니다: ${error.message}`);
    },
  });

  const cancelOrder = () => setModalOn(true);

  const handleCancelSubmit = () => cancelMutation.mutate();

  if (isLoading || !data) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-white pb-16 items-center justify-center">
        로딩 중...
      </div>
    );
  }

  const {
    storeName,
    pickupDate,
    pickupTime,
    ordererInfo,
    orderMenus,
    paymentInfo,
    orderStatus,
  } = data;

  const formattedPickupDate = formatOrderDate(pickupDate);
  const formattedPickupTime = formatTime(pickupTime);
  const formattedOrderTime = formatTime(ordererInfo?.orderTime);

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
    <div className="w-full flex pb-16 flex-col items-center gap-5 bg-white">
      <header className="w-full flex pt-10 items-start gap-2.5 self-stretch pb-1">
        <div className="w-full flex p-4 items-center justify-between self-stretch">
          <Link href="/customer/order/status">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
          </Link>
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 상세
          </h1>
          <div />
        </div>
      </header>

      <main className="flex px-4 flex-col items-center gap-5 self-stretch">
        {orderStatus === 'REJECTED' ? (
          <div className="w-full flex flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-0.75">
              <p className="text-text-subtle font-semibold">{storeName}</p>
              <p className="text-headline1 font-semibold">
                주문이 거절되었습니다.
              </p>
              <div className="flex items-center gap-1">
                <p className="text-text-subtlest text-label1">
                  {formattedPickupDate}
                </p>
                <Ellipse className="size-0.5 text-text-subtlest" />
                <p className="text-text-subtlest text-label1">
                  {formattedPickupTime}
                </p>
              </div>
            </div>
          </div>
        ) : orderStatus === 'CANCELLED' ? (
          <div className="w-full flex flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-0.75">
              <p className="text-text-subtle font-semibold">{storeName}</p>
              <p className="text-headline1 font-semibold">
                주문이 취소되었습니다.
              </p>
              <div className="flex items-center gap-1">
                <p className="text-text-subtlest text-label1">
                  {formattedPickupDate}
                </p>
                <Ellipse className="size-0.5 text-text-subtlest" />
                <p className="text-text-subtlest text-label1">
                  {formattedPickupTime}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <OrderStatusBar
            storeName={storeName || ''}
            currentStep={getStepFromStatus(orderStatus)}
            pickupDate={formattedPickupDate}
            pickupTime={formattedPickupTime}
            paymentMethod={
              paymentInfo?.paymentMeans === 'TOSS' ? '토스페이' : '카카오페이'
            }
          />
        )}
      </main>

      <SectionDivider className="w-full h-1.5" />

      <section className="flex flex-col items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h1>
          <OrderCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storeCart={mappedStoreCart as any}
            pickupDate={formattedPickupDate}
            pickupTime={formattedPickupTime}
            hidePickupInfo
            noBorder
          />
        </div>
      </section>

      <SectionDivider className="w-full h-1.5" />

      <section className="flex flex-col items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            결제 정보
          </h1>
          <div className="flex flex-col items-start gap-2 self-stretch">
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

      <SectionDivider className="w-full h-1.5" />

      <section className="flex flex-col items-start self-stretch px-4">
        <h1 className="text-text-default text-headline3 font-semibold pb-3">
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
              <Ellipse className="size-0.5 text-text-default" />
              <p className="text-text-default text-body">
                {formatKoreanTime(ordererInfo?.orderTime)}
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

      {orderStatus !== 'REJECTED' &&
        orderStatus !== 'CANCELLED' &&
        orderStatus !== 'COMPLETED' && (
          <div className="w-full flex flex-col items-start justify-center">
            <SectionDivider className="w-full h-1.5 mb-5" />
            <div className="w-full flex flex-col gap-2.5 px-4">
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
          </div>
        )}

      {modalOn && (
        <DialogModal
          icon={<AlertIcon className="text-status-danger w-11 h-11" />}
          title="주문을 취소하시겠습니까?"
          description="취소 사유를 선택해주세요"
          primaryButton={{
            label: '돌아가기',
            onClick: () => setModalOn(false),
          }}
          secondaryButton={{
            label: cancelMutation.isPending ? '처리 중' : '취소하기',
            onClick: handleCancelSubmit,
          }}
          onClose={() => setModalOn(false)}
        >
          <div className="w-full flex flex-col gap-1 mt-1">
            {CANCEL_REASONS.map((reason) => {
              const isSelected = selectedReason === reason;
              return (
                <label
                  key={reason}
                  className="flex items-center gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-background-subtle transition-colors"
                  onClick={() => setSelectedReason(reason)}
                >
                  <div className="flex items-center justify-center w-5 h-5 shrink-0">
                    {isSelected ? (
                      <CheckBoxTrueIcon className="w-5 h-5 text-icon-default" />
                    ) : (
                      <BoundingBoxIcon className="w-5 h-5 text-icon-disable" />
                    )}
                  </div>
                  <span
                    className={`text-label1 pt-0.5 ${
                      isSelected
                        ? 'text-text-default font-medium'
                        : 'text-text-subtle'
                    }`}
                  >
                    {reason}
                  </span>
                </label>
              );
            })}
          </div>
        </DialogModal>
      )}
    </div>
  );
}
