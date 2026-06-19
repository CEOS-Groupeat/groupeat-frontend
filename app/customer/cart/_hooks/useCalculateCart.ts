import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { CalculateCartRequest, CartCalculateResponse } from '@/src/types/api';

export function useCalculateCart() {
  return useMutation({
    mutationFn: async (request: CalculateCartRequest) => {
      const res = await fetchClient<CartCalculateResponse>('/api/carts/calculate', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}