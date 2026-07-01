'use client';

import { useState } from 'react';
import { useCustomerOrders } from '../_hooks/useCustomerOrders';
import SegmentedControl from './SegmentedControl';
import CustomerOrderCard from './CustomerOrderCard';

export default function OrderStatusContent() {
  const [activeTab, setActiveTab] = useState<'IN_PROGRESS' | 'PAST'>(
    'IN_PROGRESS'
  );

  const { data: progressData, isLoading: isProgressLoading } =
    useCustomerOrders({ filter: 'IN_PROGRESS' });
  const { data: pastData, isLoading: isPastLoading } = useCustomerOrders({
    filter: 'PAST',
  });

  const counts = [
    { value: 'IN_PROGRESS', count: progressData?.totalElements ?? 0 },
    { value: 'PAST', count: pastData?.totalElements ?? 0 },
  ];

  const data = activeTab === 'IN_PROGRESS' ? progressData : pastData;
  const isLoading =
    activeTab === 'IN_PROGRESS' ? isProgressLoading : isPastLoading;

  return (
    <>
      <SegmentedControl
        value={activeTab}
        onChange={(val) => setActiveTab(val as 'IN_PROGRESS' | 'PAST')}
        counts={counts}
      />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">로딩 중...</span>
        </div>
      ) : !data?.orderList || data.orderList.length === 0 ? (
        // TODO: 빈 화면 컴포넌트 추가
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">
            주문 내역이 없습니다.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.orderList.map((order) => (
            <CustomerOrderCard
              key={order.orderId}
              order={order}
              //onReviewClick={(orderId) => console.log('리뷰 작성', orderId)}
            />
          ))}
        </div>
      )}
    </>
  );
}
