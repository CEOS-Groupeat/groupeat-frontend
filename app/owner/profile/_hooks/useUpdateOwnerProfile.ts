import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  OwnerProfileResponse,
  OwnerProfileUpdateRequest,
} from '../_types/profile.type';

export function useUpdateOwnerProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: OwnerProfileUpdateRequest) => {
      const res = await fetchClient<OwnerProfileResponse>(
        '/api/owner/mypage/profile',
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '프로필 수정에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerProfile'] });
    },
  });
}