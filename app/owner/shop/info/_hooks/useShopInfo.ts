import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ShopInfoResponse } from '../_types/shop.type';

export function useShopInfo() {
  return useQuery({
    queryKey: ['shopInfo'],
    queryFn: async () => {
      const res = await fetchClient<ShopInfoResponse>('/api/owner/store');
      if (!res.isSuccess) {
        throw new Error(res.message ?? '가게 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}