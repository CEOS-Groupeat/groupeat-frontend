import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  OwnerReviewListResponse,
  OwnerReviewListParams,
} from '../_types/ownerReview.type';

export function useOwnerReviews(params: OwnerReviewListParams = {}) {
  return useQuery({
    queryKey: ['ownerReviews', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.lastReviewId !== undefined) {
        searchParams.append('lastReviewId', String(params.lastReviewId));
      }
      if (params.lastRating !== undefined) {
        searchParams.append('lastRating', String(params.lastRating));
      }
      if (params.sortType) {
        searchParams.append('sortType', params.sortType);
      }
      if (params.size !== undefined) {
        searchParams.append('size', String(params.size));
      }

      const res = await fetchClient<OwnerReviewListResponse>(
        `/api/owner/reviews?${searchParams.toString()}`
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '리뷰 목록을 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
