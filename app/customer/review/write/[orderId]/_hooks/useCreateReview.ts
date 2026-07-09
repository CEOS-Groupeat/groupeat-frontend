import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse } from '@/app/customer/search/_types/store.type';
import type {
  CreateReviewRequest,
  CreateReviewResponse,
} from '../_types/reviewWrite.type';

export function useCreateReview() {
  return useMutation({
    mutationFn: async (payload: CreateReviewRequest) => {
      const res = await fetchClient<ApiResponse<CreateReviewResponse>>(
        '/api/reviews',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}
