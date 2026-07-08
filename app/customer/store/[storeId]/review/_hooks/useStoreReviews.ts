import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ReviewListResponse } from '../_types/review.type';

interface StoreReviewParams {
  storeId: string;
  lastReviewId?: number;
  size?: number;
}

export function useStoreReviews({
  storeId,
  lastReviewId,
  size = 10,
}: StoreReviewParams) {
  return useQuery({
    queryKey: ['storeReviews', storeId, lastReviewId, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (lastReviewId) params.append('lastReviewId', String(lastReviewId));
      params.append('size', String(size));

      const res = await fetchClient<ReviewListResponse>(
        `/api/stores/${storeId}/reviews?${params.toString()}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}
