import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse } from '@/app/customer/search/_types/store.type';
import type { OrderDetail } from '../_types/orderDetail.type';

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      const res = await fetchClient<ApiResponse<OrderDetail>>(
        `/api/orders/${orderId}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    enabled: !!orderId,
  });
}
