import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse } from '@/app/customer/search/_types/store.type';
import type {
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '../_types/upload.type';

export function usePresignedUrl() {
  return useMutation({
    mutationFn: async (payload: PresignedUrlRequest) => {
      const res = await fetchClient<ApiResponse<PresignedUrlResponse>>(
        '/api/uploads/images/presigned-url?domain=REVIEW',
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
