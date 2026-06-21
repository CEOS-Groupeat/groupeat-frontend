'use client';

import { useState } from 'react';
import OwnerOrderHeader from '@/components/owner/OwnerOrderHeader';
import SegmentedControl from '@/components/owner/SegmentedControl';
import OrderEmptyState from '@/components/owner/OrderEmptyState';
import InfoToast from '@/components/owner/InfoToast';
import OrderProcessModal from '@/components/owner/OrderProcessModal';
import OrderRejectModal from '@/components/owner/OrderRejectModal';
import OrderList from './_components/OrderList';

import { MOCK_ORDERS } from '@/app/owner/orders/_constants/orders.mock';

const INITIAL_COUNTS = [
  { value: 'pending', count: 3 },
  { value: 'confirmed', count: 0 },
  { value: 'past', count: 0 },
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
              orders={MOCK_ORDERS}
              onReject={(orderId) => {
                setRejectOrderId(orderId);
                setShowRejectModal(true);
              }}
              onApprove={(orderId) => console.log('승인', orderId)}
            />
          )}
          {/* 추후 구현 예정 (확정, 지난 주문 탭)
          {activeTab === 'confirmed' && (
            <OrderList orders={MOCK_CONFIRMED_ORDERS} />
          )}
          {activeTab === 'past' && <OrderList orders={MOCK_PAST_ORDERS} />} 
          */}
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
