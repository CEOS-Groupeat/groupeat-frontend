import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OwnerReviewSummaryResponse } from '../_types/ownerReview.type';

export function useOwnerReviewSummary() {
  return useQuery({
    queryKey: ['ownerReviewSummary'],
    queryFn: async () => {
      const res = await fetchClient<OwnerReviewSummaryResponse>(
        '/api/owner/reviews/summary'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '리뷰 요약 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
