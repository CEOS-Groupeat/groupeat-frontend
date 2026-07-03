'use client';

import { useState } from 'react';
import OwnerOrderHeader from '@/app/owner/orders/_components/OwnerOrderHeader';
import SegmentedControl from '@/app/owner/orders/_components/SegmentedControl';
import OrderEmptyState from '@/app/owner/orders/_components/OrderEmptyState';
import InfoToast from '@/app/owner/orders/_components/InfoToast';
import OrderProcessModal from '@/app/owner/orders/_components/OrderProcessModal';
import OrderRejectModal from '@/app/owner/orders/_components/OrderRejectModal';
import OrderList from './_components/OrderList';
import OwnerNavbar from '@/components/owner/OwnerNavbar';

import { MOCK_ORDERS } from '@/app/owner/orders/_constants/orders.mock';

import { useApproveOrder } from './_hooks/useApproveOrder';
import { useRejectOrder } from './_hooks/useRejectOrder';
import { usePickupComplete } from './_hooks/usePickupComplete';

const INITIAL_COUNTS = [
  {
    value: 'pending',
    count: MOCK_ORDERS.filter((o) => o.status === 'pending').length,
  },
  {
    value: 'confirmed',
    count: MOCK_ORDERS.filter((o) => o.status === 'confirmed').length,
  },
  {
    value: 'past',
    count: MOCK_ORDERS.filter((o) => o.status === 'past').length,
  },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('pending');
  // 사업자 대시보드 api 연동 후 실제 카운트로 교체할 예정
  const [counts] = useState(INITIAL_COUNTS);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectOrderId, setRejectOrderId] = useState<number | null>(null);
  const { mutateAsync: approveOrder } = useApproveOrder();
  const { mutateAsync: rejectOrder } = useRejectOrder();
  const { mutateAsync: pickupComplete } = usePickupComplete();

  const activeCount = counts.find((c) => c.value === activeTab)?.count ?? 0;

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
          {activeTab === 'pending' && (
            <OrderList
              orders={MOCK_ORDERS.filter((order) => order.status === 'pending')}
              onReject={(orderId) => {
                setRejectOrderId(orderId);
                setShowRejectModal(true);
              }}
              onApprove={async (orderId) => {
                try {
                  await approveOrder(orderId);
                  setActiveTab('confirmed');
                } catch (error) {
                  console.error('승인 실패:', error);
                }
              }}
            />
          )}
          {activeTab === 'confirmed' && (
            <OrderList
              orders={MOCK_ORDERS.filter(
                (order) => order.status === 'confirmed'
              )}
              onPickupComplete={async (orderId) => {
                try {
                  await pickupComplete(orderId);
                  setActiveTab('past');
                } catch (error) {
                  console.error('픽업 완료 처리 실패:', error);
                }
              }}
            />
          )}
          {activeTab === 'past' && (
            <OrderList
              orders={MOCK_ORDERS.filter((order) => order.status === 'past')}
            />
          )}
        </>
      )}
      {activeTab === 'pending' && (
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
              await rejectOrder({
                orderId: rejectOrderId,
                rejectReason: '재료 소진',
              });
              setShowRejectModal(false);
              setRejectOrderId(null);
              setActiveTab('past');
            } catch (error) {
              console.error('거절 실패:', error);
            }
          }}
        />
      )}
      <OwnerNavbar />
    </div>
  );
}
