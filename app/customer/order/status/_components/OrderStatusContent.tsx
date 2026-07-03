'use client';

import { useState } from 'react';
import { useCustomerOrders } from '../_hooks/useCustomerOrders';
import SegmentedControl from './SegmentedControl';
import CustomerOrderCard from './CustomerOrderCard';

export default function OrderStatusContent() {
  const [activeTab, setActiveTab] = useState<'IN_PROGRESS' | 'PAST'>(
    'IN_PROGRESS'
  );

  const { data: progressData } = useCustomerOrders({
    filter: 'IN_PROGRESS',
    size: 1,
  });
  const { data: pastData } = useCustomerOrders({ filter: 'PAST', size: 1 });

  const { data, isLoading, isError } = useCustomerOrders({ filter: activeTab });

  const counts = [
    { value: 'IN_PROGRESS', count: progressData?.totalElements ?? 0 },
    { value: 'PAST', count: pastData?.totalElements ?? 0 },
  ];

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
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">
            주문 내역을 불러오지 못했어요.
          </span>
        </div>
      ) : !data?.orderList || data.orderList.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">
            주문 내역이 없습니다.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.orderList.map((order, index) => (
            <CustomerOrderCard key={order.orderId ?? index} order={order} />
          ))}
        </div>
      )}
    </>
  );
}
