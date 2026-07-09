import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OrderProcessResponse } from '@/src/types/api';

export function usePickupComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      const res = await fetchClient<OrderProcessResponse>(
        `/api/orders/${orderId}/complete-pickup`,
        { method: 'PATCH' }
      );
      if (!res.isSuccess)
        throw new Error(res.message ?? '픽업 완료 처리에 실패했어요.');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerOrders'] });
      queryClient.invalidateQueries({ queryKey: ['ownerDashboard'] });
    },
  });
}
