import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OwnerReviewListResponse } from '../_types/ownerReview.type';

interface OwnerReviewsParams {
  lastReviewId?: number;
  size?: number;
}

export function useOwnerReviews({
  lastReviewId,
  size = 10,
}: OwnerReviewsParams = {}) {
  return useQuery({
    queryKey: ['ownerReviews', lastReviewId, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (lastReviewId !== undefined) {
        params.append('lastReviewId', String(lastReviewId));
      }
      params.append('size', String(size));

      const res = await fetchClient<OwnerReviewListResponse>(
        `/api/owner/reviews?${params.toString()}`
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '리뷰 목록을 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
