import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse, OrderProcessResponse } from '../_types/order.type';

export function usePickupComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      const res = await fetchClient<ApiResponse<OrderProcessResponse>>(
        `/api/orders/${orderId}/complete-pickup`,
        { method: 'PATCH' }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}