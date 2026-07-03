'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';

import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderForm from '@/app/customer/order/request/_components/OrderForm';
import OrderInfo from '@/app/customer/order/request/_components/OrderInfo';
import OrderRequestHeader from '@/app/customer/order/request/_components/OrderRequestHeader';
import DefaultButton from '@/components/ui/ButtonDefault';
import SectionDivider from '@/components/ui/SectionDivider';

export default function CustomerOrderRequestPage() {
  const storeCarts = useCartStore((state) => state.storeCarts);
  const discountRate = useCartStore((state) => state.discountRate);
  const currentCart = storeCarts?.[0];
  const cartItems = currentCart?.cartItems || [];
  

  const cartItemIds = cartItems
    .map((item) => item.cartItemId)
    .filter((id): id is number => id !== undefined);

  const firstItemName = cartItems[0]?.menuName || '메뉴';
  const orderName =
    cartItems.length > 1
      ? `${firstItemName} 외 ${cartItems.length - 1}건`
      : firstItemName;

  // 총 상품 금액 및 할인 로직 계산
  const originalTotal = cartItems.reduce(
    (acc, item) => acc + (item.unitPrice ?? 0) * (item.quantity ?? 1),
    0
  );
  const discountTotal = cartItems.reduce(
    (acc, item) => acc + (item.discountAmount ?? 0),
    0
  );
  const finalTotal = currentCart?.storeTotalPrice || 0;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [groupName, setGroupName] = useState('');
  const [requests, setRequests] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'ONSITE'>(
    'PREPAID'
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [widgets, setWidgets] = useState<any>(null);

  // 1. 위젯 초기화
  useEffect(() => {
    async function initWidgets() {
      if (!process.env.NEXT_PUBLIC_TOSS_WIDGET_KEY) return;
      try {
        const tossPayments = await loadTossPayments(
          process.env.NEXT_PUBLIC_TOSS_WIDGET_KEY
        );
        const widgetInstance = tossPayments.widgets({ customerKey: ANONYMOUS });
        setWidgets(widgetInstance);
      } catch (error) {
        console.error('위젯 초기화 실패:', error);
      }
    }
    initWidgets();
  }, []);

  // 2. 위젯 렌더링 및 금액 설정
  useEffect(() => {
    async function renderWidgets() {
      if (widgets && paymentMethod === 'PREPAID') {
        await widgets.setAmount({ currency: 'KRW', value: finalTotal });
        await widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        });
        await widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        });
      }
    }
    renderWidgets();
  }, [widgets, paymentMethod, finalTotal]);

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        cartItemIds,
        customerName,
        customerPhone,
        groupName,
        requests,
        paymentMethod,
      };

      return fetchClient('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: async (response: any) => {
      const orderData = response.data;

      if (paymentMethod === 'ONSITE') {
        window.location.href = `/order/complete?orderId=${orderData.orderId}`;
        return;
      }

      try {
        if (widgets) {
          await widgets.requestPayment({
            orderId: orderData.orderId,
            orderName: orderName,
            customerName: orderData.customerName,
            successUrl: `${window.location.origin}/payment/success`,
            failUrl: `${window.location.origin}/payment/fail`,
          });
        }
      } catch (error) {
        console.error('결제창 호출 실패:', error);
      }
    },
  });

  const handlePaymentSubmit = () => {
    if (cartItemIds.length === 0) return alert('장바구니가 비어 있습니다.');
    if (!customerName.trim() || !customerPhone.trim())
      return alert('주문자 이름과 연락처를 입력해주세요.');

    createOrderMutation.mutate();
  };

  return (
    <main className="w-full min-h-dvh pt-10 pb-52.5">
      <OrderRequestHeader />

      {/* 주문 정보 섹션 */}
      <section className="w-full flex flex-col items-start gap-3 mt-4 px-4">
        <div className="flex items-center gap-3 self-stretch">
          <h2 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h2>
        </div>
        {/* 💡 주석 처리되었던 OrderCard 활성화 */}
        {/* <OrderCard
          storeCart={currentCart}
          // 임시 하드코딩 (추후 전역 상태나 API에서 넘어온 시간 데이터로 교체하세요)
          pickupDate="2026-07-08"
          pickupTime="14:30:00"
        /> */}
      </section>

      <SectionDivider className="my-6" />

      <section className="w-full flex flex-col items-start gap-3 mt-4 px-4">
        <OrderForm
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          groupName={groupName}
          setGroupName={setGroupName}
          requests={requests}
          setRequests={setRequests}
        />
      </section>

      <SectionDivider className="my-6" />

      <OrderInfo
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <SectionDivider className="my-6" />

      <div className="flex px-4 flex-col items-start gap-2.5 self-stretch">
        <h1 className="text-text-default text-headline3 font-semibold">
          결제 금액
        </h1>
        <OrderPrice
          originalPrice={originalTotal}
          discountAmount={discountTotal}
          finalPrice={finalTotal}
          discountRate={discountRate}
        />
      </div>

      <div className="fixed w-full bottom-6 px-4">
        <DefaultButton
          onClick={handlePaymentSubmit}
          disabled={createOrderMutation.isPending}
        >
          {createOrderMutation.isPending ? '주문 처리 중...' : '결제하기'}
        </DefaultButton>
      </div>
    </main>
  );
}
