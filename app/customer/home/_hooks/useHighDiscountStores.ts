import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { HighDiscountStoresResponse } from '../_types/recommendation.type';

export function useHighDiscountStores() {
  return useQuery({
    queryKey: ['highDiscountStores'],
    queryFn: async () => {
      const res = await fetchClient<HighDiscountStoresResponse>(
        '/api/recommendations/high-discount'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '추천 가게를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
