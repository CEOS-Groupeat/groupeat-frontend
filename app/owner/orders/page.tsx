'use client';

import { useState } from 'react';
import OwnerOrderHeader from '@/components/owner/OwnerOrderHeader';
import SegmentedControl from '@/components/owner/SegmentedControl';
import OrderEmptyState from '@/components/owner/OrderEmptyState';
import InfoToast from '@/components/owner/InfoToast';

const INITIAL_COUNTS = [
  { value: 'pending', count: 3 },
  { value: 'confirmed', count: 0 },
  { value: 'past', count: 0 },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('pending');
  // 사업자 대시보드 api 연동 후 실제 카운트로 교체할 예정
  const [counts, setCounts] = useState(INITIAL_COUNTS);

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
        // activeTab에 따라 대기중/확정/지난주문 컴포넌트 분기 처리 예정
        <div className="px-4">대기중/확정/지난주문 컴포넌트 분기 처리 예정</div>
      )}
      {activeTab === 'pending' && <InfoToast />}
    </div>
  );
}
