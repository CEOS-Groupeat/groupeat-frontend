'use client';

import { useState } from 'react';
import OwnerOrderHeader from '@/app/owner/orders/_components/OwnerOrderHeader';
import SegmentedControl from '@/app/owner/orders/_components/SegmentedControl';
import OrderEmptyState from '@/app/owner/orders/_components/OrderEmptyState';
import InfoToast from '@/app/owner/orders/_components/InfoToast';
import OrderProcessModal from '@/app/owner/orders/_components/OrderProcessModal';
import OrderRejectModal from '@/app/owner/orders/_components/OrderRejectModal';
import OrderList from './_components/OrderList';

import { MOCK_ORDERS } from '@/app/owner/orders/_constants/orders.mock';

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
              onApprove={(orderId) => console.log('승인', orderId)}
            />
          )}
          {activeTab === 'confirmed' && (
            <OrderList
              orders={MOCK_ORDERS.filter(
                (order) => order.status === 'confirmed'
              )}
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
          onReject={() => {
            // 거절 API 연동 예정
            console.log('거절된 주문 ID:', rejectOrderId);
            setShowRejectModal(false);
            setRejectOrderId(null);
          }}
        />
      )}
    </div>
  );
}
