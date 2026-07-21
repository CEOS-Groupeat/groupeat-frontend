'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import OwnerOrderHeader from '@/app/owner/orders/_components/OwnerOrderHeader';
import SegmentedControl from '@/app/owner/orders/_components/SegmentedControl';
import OrderEmptyState from '@/app/owner/orders/_components/OrderEmptyState';
import InfoToast from '@/app/owner/orders/_components/InfoToast';
import ToastError from '@/components/ui/ToastError';
import OrderProcessModal from '@/app/owner/orders/_components/OrderProcessModal';
import OrderRejectModal from '@/app/owner/orders/_components/OrderRejectModal';
import OrderApproveModal from './_components/OrderApproveModal';
import OrderPickupCompleteModal from './_components/OrderPickupCompleteModal';
import PickupCompleteToast from './_components/PickupCompleteToast';
import OrderList from './_components/OrderList';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import { useOwnerOrders } from './_hooks/useOwnerOrders';
import { useApproveOrder } from './_hooks/useApproveOrder';
import { useRejectOrder } from './_hooks/useRejectOrder';
import { usePickupComplete } from './_hooks/usePickupComplete';

function OrdersContent() {
  const searchParams = useSearchParams();
  const initialTab =
    (searchParams.get('tab') as 'WAITING' | 'CONFIRMED' | 'PAST') ?? 'WAITING';

  const [activeTab, setActiveTab] = useState<'WAITING' | 'CONFIRMED' | 'PAST'>(
    initialTab
  );

  const { data: waitingData } = useOwnerOrders({ tab: 'WAITING', size: 1 });
  const { data: confirmedData } = useOwnerOrders({ tab: 'CONFIRMED', size: 1 });
  const { data: pastData } = useOwnerOrders({ tab: 'PAST', size: 1 });

  const {
    data: orderData,
    isLoading,
    isError,
  } = useOwnerOrders({ tab: activeTab });

  const counts = [
    { value: 'WAITING' as const, count: waitingData?.totalElements ?? 0 },
    { value: 'CONFIRMED' as const, count: confirmedData?.totalElements ?? 0 },
    { value: 'PAST' as const, count: pastData?.totalElements ?? 0 },
  ];

  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectOrderId, setRejectOrderId] = useState<number | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approveOrderId, setApproveOrderId] = useState<number | null>(null);
  const [showPickupCompleteModal, setShowPickupCompleteModal] = useState(false);
  const [pickupCompleteOrderId, setPickupCompleteOrderId] = useState<
    number | null
  >(null);
  const [showPickupToast, setShowPickupToast] = useState(false);
  const pickupToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (message: string) => {
    if (errorToastTimerRef.current) {
      clearTimeout(errorToastTimerRef.current);
    }
    setErrorMessage(message);
    setShowErrorToast(true);
    errorToastTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
      errorToastTimerRef.current = null;
    }, 2000);
  };

  const { mutateAsync: approveOrder, isPending: isApproving } =
    useApproveOrder();
  const { mutateAsync: rejectOrder } = useRejectOrder();
  const { mutateAsync: pickupComplete, isPending: isPickupCompleting } =
    usePickupComplete();

  useEffect(() => {
    return () => {
      if (pickupToastTimerRef.current) {
        clearTimeout(pickupToastTimerRef.current);
      }
      if (errorToastTimerRef.current) {
        clearTimeout(errorToastTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-background-default font-['Pretendard']">
      <OwnerOrderHeader />
      <SegmentedControl
        value={activeTab}
        onChange={setActiveTab}
        counts={counts}
      />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">로딩 중...</span>
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">
            주문 목록을 불러오지 못했어요.
          </span>
        </div>
      ) : !orderData?.orderList || orderData.orderList.length === 0 ? (
        <OrderEmptyState />
      ) : (
        <OrderList
          orders={orderData?.orderList ?? []}
          onReject={(orderId) => {
            setRejectOrderId(orderId);
            setShowRejectModal(true);
          }}
          onApprove={(orderId) => {
            setApproveOrderId(orderId);
            setShowApproveModal(true);
          }}
          onPickupComplete={(orderId) => {
            setPickupCompleteOrderId(orderId);
            setShowPickupCompleteModal(true);
          }}
        />
      )}
      {activeTab === 'WAITING' && (
        <InfoToast onInfoClick={() => setShowProcessModal(true)} />
      )}
      {showProcessModal && (
        <OrderProcessModal onClose={() => setShowProcessModal(false)} />
      )}
      {showRejectModal && rejectOrderId !== null && (
        <OrderRejectModal
          onClose={() => {
            setShowRejectModal(false);
            setRejectOrderId(null);
          }}
          onReject={async () => {
            try {
              await rejectOrder(rejectOrderId);
              setShowRejectModal(false);
              setRejectOrderId(null);
            } catch (error) {
              console.error('거절 실패:', error);
              showError('거절 처리에 실패했어요. 다시 시도해주세요.');
            }
          }}
        />
      )}
      {showApproveModal && approveOrderId !== null && (
        <OrderApproveModal
          onClose={() => {
            setShowApproveModal(false);
            setApproveOrderId(null);
          }}
          onApprove={async () => {
            try {
              await approveOrder(approveOrderId);
              setShowApproveModal(false);
              setApproveOrderId(null);
            } catch (error) {
              console.error('승인 실패:', error);
              showError('승인 처리에 실패했어요. 다시 시도해주세요.');
            }
          }}
          isLoading={isApproving}
        />
      )}
      {showPickupCompleteModal && pickupCompleteOrderId !== null && (
        <OrderPickupCompleteModal
          onClose={() => {
            setShowPickupCompleteModal(false);
            setPickupCompleteOrderId(null);
          }}
          onPickupComplete={async () => {
            try {
              await pickupComplete(pickupCompleteOrderId);
              setShowPickupCompleteModal(false);
              setPickupCompleteOrderId(null);

              if (pickupToastTimerRef.current) {
                clearTimeout(pickupToastTimerRef.current);
              }

              setShowPickupToast(true);
              pickupToastTimerRef.current = setTimeout(() => {
                setShowPickupToast(false);
                pickupToastTimerRef.current = null;
              }, 2000);
            } catch (error) {
              console.error('픽업 완료 처리 실패:', error);
              const message =
                error instanceof Error
                  ? error.message
                  : '픽업 완료 처리에 실패했어요. 다시 시도해주세요.';
              showError(message);
            }
          }}
          isLoading={isPickupCompleting}
        />
      )}
      {showPickupToast && (
        <PickupCompleteToast text="픽업 완료 처리되었습니다." />
      )}
      {showErrorToast && <ToastError text={errorMessage} />}

      <OwnerNavbar />
    </div>
  );
}

export default function Orders() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-background-default">
          <span className="text-sm text-text-subtle">로딩 중...</span>
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
