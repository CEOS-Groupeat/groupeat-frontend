import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { MyReviewListResponse } from '../_types/myReview.type';

interface MyReviewsParams {
  lastReviewId?: number;
  size?: number;
}

export function useMyReviews({
  lastReviewId,
  size = 10,
}: MyReviewsParams = {}) {
  return useQuery({
    queryKey: ['myReviews', lastReviewId, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (lastReviewId !== undefined) {
        params.append('lastReviewId', String(lastReviewId));
      }
      params.append('size', String(size));

      const res = await fetchClient<MyReviewListResponse>(
        `/api/reviews/my?${params.toString()}`
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '내 리뷰 목록을 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
