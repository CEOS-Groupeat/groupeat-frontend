'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';

import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
// import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderForm from '@/app/customer/order/request/_components/OrderForm';
import OrderInfo from '@/app/customer/order/request/_components/OrderInfo';
import OrderRequestHeader from '@/app/customer/order/request/_components/OrderRequestHeader';
import DefaultButton from '@/components/ui/ButtonDefault';
import SectionDivider from '@/components/ui/SectionDivider';

export default function CustomerOrderRequestPage() {
  const storeCarts = useCartStore((state) => state.storeCarts);
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

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [groupName, setGroupName] = useState('');
  const [requests, setRequests] = useState('');

  const [paymentProvider, setPaymentProvider] = useState<
    'toss' | 'kakao' | null
  >('toss');
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'ONSITE'>(
    'PREPAID'
  );

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
        const tossPayments = await loadTossPayments(
          process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!
        );

        if (paymentProvider === 'toss') {
          await tossPayments.requestPayment('토스페이', {
            amount: orderData.amount,
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

    if (paymentMethod === 'PREPAID') {
      if (!paymentProvider) return alert('결제 수단을 선택해주세요.');

      // 💡 카카오페이 선택 시 백엔드로 주문 생성 요청이 가지 않도록 사전 차단
      if (paymentProvider === 'kakao') {
        return alert(
          '카카오페이는 현재 준비 중입니다. 다른 결제 수단을 이용해주세요.'
        );
      }
    }

    createOrderMutation.mutate();
  };

  return (
    <main className="w-full min-h-dvh pt-10 pb-52.5">
      <OrderRequestHeader />

      <section className="w-full flex flex-col items-start gap-3 mt-4 px-4">
        <div className="flex items-center gap-3 self-stretch">
          <h2 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h2>
        </div>
        {/* <OrderCard
          storeCart={currentCart}
          pickupDate= 전역상태 추가시 등록
          pickupTime= 전역상태 추가시 등록
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
        paymentProvider={paymentProvider}
        setPaymentProvider={setPaymentProvider}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <SectionDivider className="my-6" />

      <div className="flex px-4 flex-col items-start gap-2.5 self-stretch">
        <h1 className="text-text-default text-headline3 font-semibold">
          결제 금액
        </h1>
        <OrderPrice />
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
