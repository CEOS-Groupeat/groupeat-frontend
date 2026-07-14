import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse } from '@/types/api';
import type {
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '../types/upload.type';

type ImageDomain = 'STORE' | 'MENU' | 'PROFILE' | 'REVIEW';

interface PresignedUrlParams extends PresignedUrlRequest {
  domain: ImageDomain;
}

export function usePresignedUrl() {
  return useMutation({
    mutationFn: async ({ domain, ...payload }: PresignedUrlParams) => {
      const res = await fetchClient<ApiResponse<PresignedUrlResponse>>(
        `/api/uploads/images/presigned-url?domain=${domain}`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess)
        throw new Error(res.message ?? '이미지 업로드 URL 발급에 실패했어요.');
      return res.data;
    },
  });
}
