import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  CreateReplyRequest,
  CreateReplyResponse,
} from '../_types/ownerReview.type';

interface CreateReplyParams {
  reviewId: number;
  payload: CreateReplyRequest;
}

export function useCreateReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, payload }: CreateReplyParams) => {
      const res = await fetchClient<CreateReplyResponse>(
        `/api/owner/reviews/${reviewId}/reply`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '답글 작성에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerReviews'] });
    },
  });
}
