import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { CustomerOrderListResponse } from '@/src/types/api'; 

type OrderFilter = 'ALL' | 'IN_PROGRESS' | 'PAST';

interface CustomerOrderParams {
  filter: OrderFilter;
  lastOrderId?: number;
  size?: number;
}

export function useCustomerOrders({ filter, lastOrderId, size = 20 }: CustomerOrderParams) {
  return useQuery({
    queryKey: ['customerOrders', filter, lastOrderId],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('filter', filter);
      if (lastOrderId) params.append('lastOrderId', String(lastOrderId));
      params.append('size', String(size));

      const res = await fetchClient<CustomerOrderListResponse>(
        `/api/orders?${params.toString()}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}