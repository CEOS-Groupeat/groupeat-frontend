import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  ApiResponse,
  OrderProcessResponse,
  RejectOrderRequest,
} from '../_types/order.type';

export function useRejectOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      rejectReason,
    }: { orderId: number } & RejectOrderRequest) => {
      const res = await fetchClient<ApiResponse<OrderProcessResponse>>(
        `/api/orders/${orderId}/reject`,
        {
          method: 'PATCH',
          body: JSON.stringify({ rejectReason }),
        }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
