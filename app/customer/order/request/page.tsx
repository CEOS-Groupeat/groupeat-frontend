'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';

import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import OrderForm from '@/app/customer/order/request/_components/OrderForm';
import OrderInfo from '@/app/customer/order/request/_components/OrderInfo';
import OrderRequestHeader from '@/app/customer/order/request/_components/OrderRequestHeader';
import DefaultButton from '@/components/ui/ButtonDefault';
import SectionDivider from '@/components/ui/SectionDivider';

import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';
import ToastError from '@/components/ui/ToastError';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';

const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

export default function CustomerOrderRequestPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentCart = useCartStore((state) => state.checkoutCart);
  const discountRate = useCartStore((state) => state.discountRate);
  const pickupDate = useCartStore((state) => state.pickupDate);
  const pickupTime = useCartStore((state) => state.pickupTime);

  useEffect(() => {
    if (
      !currentCart ||
      !currentCart.cartItems ||
      currentCart.cartItems.length === 0
    ) {
      alert('결제할 상품 정보가 없습니다. 장바구니로 이동합니다.');
      router.replace('/customer/cart');
    }
  }, [currentCart, router]);

  const cartItems = currentCart?.cartItems || [];

  const cartItemIds = cartItems
    .map((item) => item.cartItemId)
    .filter((id): id is number => id !== undefined);

  const firstItemName = cartItems[0]?.menuName || '메뉴';
  const orderName =
    cartItems.length > 1
      ? `${firstItemName} 외 ${cartItems.length - 1}건`
      : firstItemName;

  const originalTotal = cartItems.reduce(
    (acc, item) => acc + (item.unitPrice ?? 0) * (item.quantity ?? 1),
    0
  );
  const discountTotal = cartItems.reduce(
    (acc, item) => acc + (item.discountAmount ?? 0),
    0
  );
  const finalTotal = currentCart?.storeTotalPrice || 0;

  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'ON_SITE'>(
    'PREPAID'
  );
  const paymentAmount =
    paymentMethod === 'ON_SITE' ? Math.floor(finalTotal / 2) : finalTotal;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [groupName, setGroupName] = useState('');
  const [requests, setRequests] = useState('');

  const isFormValid = customerName.trim() !== '' && customerPhone.trim() !== '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [widgets, setWidgets] = useState<any>(null);
  const isWidgetRendered = useRef(false);

  useEffect(() => {
    history.pushState(null, '', location.href);

    const handlePopState = () => {
      history.pushState(null, '', location.href);
      setIsModalOpen(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCancelOrder = () => {
    setIsModalOpen(false);

    if (currentCart?.storeId) {
      router.push(`/customer/store/${currentCart.storeId}`);
    } else {
      router.push('/customer/cart');
    }
  };

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

  useEffect(() => {
    async function updateOrRenderWidgets() {
      if (!widgets) return;

      if (!isWidgetRendered.current) {
        isWidgetRendered.current = true;
        await widgets.setAmount({ currency: 'KRW', value: paymentAmount });
        await widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        });
        await widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        });
      } else {
        await widgets.setAmount({ currency: 'KRW', value: paymentAmount });
      }
    }

    updateOrRenderWidgets();
  }, [widgets, paymentAmount]);

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        cartItemIds,
        customerName,
        customerPhone: formatPhoneNumber(customerPhone),
        groupName,
        requests,
        paymentMethod,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await fetchClient('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!res.isSuccess) {
        const errorMsg =
          res.data?.customerPhone || res.message || '주문 요청에 실패했습니다.';
        throw new Error(errorMsg);
      }

      return res;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: async (response: any) => {
      const orderData = response.data;

      try {
        if (widgets) {
          await widgets.setAmount({ currency: 'KRW', value: orderData.amount });

          await widgets.requestPayment({
            orderId: orderData.orderId,
            orderName: orderName,
            customerName: orderData.customerName,
            successUrl: `${window.location.origin}/payment/success?destination=/customer/order/${orderData.paymentId}`,
            failUrl: `${window.location.origin}/payment/fail`,
          });
        }
      } catch (error) {
        console.error('결제창 호출 실패:', error);
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    },
  });

  const handlePaymentSubmit = () => {
    if (cartItemIds.length === 0) return alert('장바구니가 비어 있습니다.');
    if (!isFormValid) return alert('주문자 이름과 연락처를 입력해주세요.');

    createOrderMutation.mutate();
  };

  const perPersonAmount =
    cartItems.length > 0 ? (cartItems[0].unitPrice ?? 0) : 0;

  return (
    <>
      <main className="w-full min-h-dvh pt-10 pb-52.5 relative">
        {showError && <ToastError text={errorMessage} />}

        <OrderRequestHeader onBack={() => setIsModalOpen(true)} />

        <section className="w-full flex flex-col items-start gap-3 mt-4 px-4">
          <div className="flex items-center gap-3 self-stretch">
            <h2 className="text-text-default text-headline3 font-semibold">
              주문 정보
            </h2>
          </div>
          <OrderCard
            storeCart={currentCart}
            pickupDate={pickupDate || ''}
            pickupTime={pickupTime || ''}
          />
        </section>

        <SectionDivider className="my-6 h-2" />

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

        <SectionDivider className="my-6 h-2" />

        <OrderInfo
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <SectionDivider className="my-6 h-2" />

        <div className="flex px-4 flex-col items-start gap-2.5 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            결제 금액
          </h1>
          <OrderPrice
            perPersonAmount={perPersonAmount}
            originalPrice={originalTotal}
            discountAmount={discountTotal}
            finalPrice={paymentAmount}
            discountRate={discountRate}
          />
        </div>

        <div className="fixed w-full bottom-6 px-4 z-dropdown">
          <DefaultButton
            onClick={handlePaymentSubmit}
            disabled={createOrderMutation.isPending || !isFormValid}
          >
            {createOrderMutation.isPending
              ? '주문 처리 중...'
              : `${paymentAmount.toLocaleString()}원 결제하기`}
          </DefaultButton>
        </div>
      </main>

      {isModalOpen && (
        <DialogModal
          icon={<AlertIcon className="text-status-danger" />}
          title="해당 주문을 취소하시겠습니까?"
          description="입력된 내용은 사라집니다."
          primaryButton={{
            label: '돌아가기',
            onClick: () => setIsModalOpen(false),
          }}
          secondaryButton={{
            label: '취소하기',
            onClick: handleCancelOrder,
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
