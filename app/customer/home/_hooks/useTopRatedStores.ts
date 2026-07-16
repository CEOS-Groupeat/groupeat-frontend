import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { TopRatedStoresResponse } from '../_types/recommendation.type';

export function useTopRatedStores() {
  return useQuery({
    queryKey: ['topRatedStores'],
    queryFn: async () => {
      const res = await fetchClient<TopRatedStoresResponse>(
        '/api/recommendations/top-rated'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '추천 가게를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
