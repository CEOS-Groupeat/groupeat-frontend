import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse, CartListResponse } from '../_types/cart.type';

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetchClient<ApiResponse<CartListResponse>>('/api/carts');
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}