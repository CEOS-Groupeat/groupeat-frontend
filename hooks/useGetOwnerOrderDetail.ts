// hooks/useGetOwnerOrderDetail.ts
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { operations } from '@/src/types/schema';

type GetOwnerOrderDetailOp = operations['getOrderDetail'];
type OrderDetailResponse = GetOwnerOrderDetailOp['responses'][200]['content']['*/*'];

export function useGetOwnerOrderDetail(orderId: number) {
  return useQuery({
    queryKey: ['owner', 'orders', orderId],
    queryFn: async () => {
      const res = await fetchClient<OrderDetailResponse>(`/api/owner/orders/${orderId}`, {
        method: 'GET',
      });

      if (!res.isSuccess) {
        throw new Error(res.message || '주문 상세 정보를 가져오는 데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!orderId && !isNaN(orderId),
  });
}