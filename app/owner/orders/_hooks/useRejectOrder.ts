import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OrderProcessResponse } from '@/src/types/api';

export function useRejectOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      const res = await fetchClient<OrderProcessResponse>(
        `/api/orders/${orderId}/reject`,
        { method: 'PATCH' }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerOrders'] });
      queryClient.invalidateQueries({ queryKey: ['ownerDashboard'] });
    },
  });
}
