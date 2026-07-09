import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OwnerOrderListResponse } from '@/src/types/api';

interface OwnerOrdersParams {
  tab: 'WAITING' | 'CONFIRMED' | 'PAST';
  filterDate?: string;
  lastOrderId?: number;
  size?: number;
}

export function useOwnerOrders({
  tab,
  filterDate,
  lastOrderId,
  size = 20,
}: OwnerOrdersParams) {
  return useQuery({
    queryKey: ['ownerOrders', tab, filterDate, lastOrderId, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('tab', tab);
      if (filterDate) params.append('filterDate', filterDate);
      if (lastOrderId !== undefined) {
        params.append('lastOrderId', String(lastOrderId));
      }
      params.append('size', String(size));

      const res = await fetchClient<OwnerOrderListResponse>(
        `/api/owner/orders?${params.toString()}`
      );
      if (!res.isSuccess) throw new Error(res.message ?? '주문 목록을 불러오지 못했어요.');
      return res.data;
    },
  });
}
