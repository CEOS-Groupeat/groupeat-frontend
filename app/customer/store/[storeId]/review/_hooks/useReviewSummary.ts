import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ReviewSummaryResponse } from '@/src/types/api';

export function useReviewSummary(storeId: string) {
  return useQuery({
    queryKey: ['reviewSummary', storeId],
    queryFn: async () => {
      const res = await fetchClient<ReviewSummaryResponse>(
        `/api/stores/${storeId}/reviews/summary`
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '리뷰 요약 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
    enabled: !!storeId,
  });
}