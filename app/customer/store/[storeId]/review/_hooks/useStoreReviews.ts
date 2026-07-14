import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ReviewListResponse } from '@/src/types/api';
import { SORT_OPTIONS } from '../_constants/sortOptions';

type SortType = (typeof SORT_OPTIONS)[number]['value'];

interface StoreReviewParams {
  storeId: string;
  sortType?: SortType;
  lastReviewId?: number;
  size?: number;
}

export function useStoreReviews({
  storeId,
  sortType = 'LATEST',
  lastReviewId,
  size = 10,
}: StoreReviewParams) {
  return useQuery({
    queryKey: ['storeReviews', storeId, sortType, lastReviewId, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('sortType', sortType);
      if (lastReviewId !== undefined) {
        params.append('lastReviewId', String(lastReviewId));
      }
      params.append('size', String(size));

      const res = await fetchClient<ReviewListResponse>(
        `/api/stores/${storeId}/reviews?${params.toString()}`
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '리뷰 목록을 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
