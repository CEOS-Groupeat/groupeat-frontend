'use client';

import { useState, useRef, useEffect } from 'react';
import OwnerOrderHeader from '@/app/owner/orders/_components/OwnerOrderHeader';
import SegmentedControl from '@/app/owner/orders/_components/SegmentedControl';
import OrderEmptyState from '@/app/owner/orders/_components/OrderEmptyState';
import InfoToast from '@/app/owner/orders/_components/InfoToast';
import OrderProcessModal from '@/app/owner/orders/_components/OrderProcessModal';
import OrderRejectModal from '@/app/owner/orders/_components/OrderRejectModal';
import OrderApproveModal from './_components/OrderApproveModal';
import OrderPickupCompleteModal from './_components/OrderPickupCompleteModal';
import PickupCompleteToast from './_components/PickupCompleteToast';
import OrderList from './_components/OrderList';
import OwnerNavbar from '@/components/owner/OwnerNavbar';

import { MOCK_ORDERS } from '@/app/owner/orders/_constants/orders.mock';

import { useApproveOrder } from './_hooks/useApproveOrder';
import { useRejectOrder } from './_hooks/useRejectOrder';
import { usePickupComplete } from './_hooks/usePickupComplete';

const INITIAL_COUNTS = [
  {
    value: 'WAITING' as const,
    count: MOCK_ORDERS.filter((o) => o.status === 'pending').length,
  },
  {
    value: 'CONFIRMED' as const,
    count: MOCK_ORDERS.filter((o) => o.status === 'confirmed').length,
  },
  {
    value: 'PAST' as const,
    count: MOCK_ORDERS.filter((o) => o.status === 'past').length,
  },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState<'WAITING' | 'CONFIRMED' | 'PAST'>(
    'WAITING'
  );
  // 사업자 대시보드 api 연동 후 실제 카운트로 교체할 예정
  const [counts] = useState(INITIAL_COUNTS);
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

  const { mutateAsync: approveOrder } = useApproveOrder();
  const { mutateAsync: rejectOrder } = useRejectOrder();
  const { mutateAsync: pickupComplete } = usePickupComplete();

  const activeCount = counts.find((c) => c.value === activeTab)?.count ?? 0;

  useEffect(() => {
    return () => {
      if (pickupToastTimerRef.current) {
        clearTimeout(pickupToastTimerRef.current);
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
      {activeCount === 0 ? (
        <OrderEmptyState />
      ) : (
        <>
          {activeTab === 'WAITING' && (
            <OrderList
              orders={MOCK_ORDERS.filter((order) => order.status === 'pending')}
              onReject={(orderId) => {
                setRejectOrderId(orderId);
                setShowRejectModal(true);
              }}
              onApprove={(orderId) => {
                setApproveOrderId(orderId);
                setShowApproveModal(true);
              }}
            />
          )}
          {activeTab === 'CONFIRMED' && (
            <OrderList
              orders={MOCK_ORDERS.filter(
                (order) => order.status === 'confirmed'
              )}
              onPickupComplete={(orderId) => {
                setPickupCompleteOrderId(orderId);
                setShowPickupCompleteModal(true);
              }}
            />
          )}
          {activeTab === 'PAST' && (
            <OrderList
              orders={MOCK_ORDERS.filter((order) => order.status === 'past')}
            />
          )}
        </>
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
            }
          }}
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
            }
          }}
        />
      )}
      {showPickupToast && (
        <PickupCompleteToast text="픽업 완료 처리되었습니다." />
      )}
      <OwnerNavbar />
    </div>
  );
}
