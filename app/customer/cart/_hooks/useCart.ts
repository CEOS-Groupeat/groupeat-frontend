import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { useCartStore } from '@/store/useCartStore';
import type { CartListResponse } from '@/src/types/api';
import { useEffect } from 'react';

export function useCart() {
  const setStoreCarts = useCartStore((state) => state.setStoreCarts);
  const setPickupInfo = useCartStore((state) => state.setPickupInfo);

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetchClient<CartListResponse>('/api/carts');
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setStoreCarts(query.data.storeCarts || []);
      setPickupInfo(query.data.pickupDate ?? '', query.data.pickupTime ?? '');
    }
  }, [query.data, setStoreCarts, setPickupInfo]);

  return query;
}
