import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse, CalculateCartRequest, CalculatedCartResponse } from '../_types/cart.type';

export function useCalculateCart() {
  return useMutation({
    mutationFn: async (request: CalculateCartRequest) => {
      const res = await fetchClient<ApiResponse<CalculatedCartResponse>>('/api/carts/calculate', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}