import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';
import type { CartListResponse } from '@/src/types/api';
import { useEffect } from 'react';

export function useCart() {
  const setStoreCarts = useCartStore((state) => state.setStoreCarts);

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res =
        await fetchClient<CartListResponse>('/api/carts');
      if (!res.isSuccess) throw new Error(res.message);
      return res.data?.storeCarts || [];
    },
  });

  useEffect(() => {
    if (query.data) {
      setStoreCarts(query.data);
    }
  }, [query.data, setStoreCarts]);

  return query;
}
