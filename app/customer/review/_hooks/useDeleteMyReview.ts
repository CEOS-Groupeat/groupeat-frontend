import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { DeleteMyReviewResponse } from '../_types/myReview.type';

export function useDeleteMyReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      const res = await fetchClient<DeleteMyReviewResponse>(
        `/api/reviews/${reviewId}`,
        { method: 'DELETE' }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '리뷰 삭제에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });
}
