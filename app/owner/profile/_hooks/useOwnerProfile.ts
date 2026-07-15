import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OwnerProfileResponse } from '../_types/profile.type';

export function useOwnerProfile() {
  return useQuery({
    queryKey: ['ownerProfile'],
    queryFn: async () => {
      const res = await fetchClient<OwnerProfileResponse>(
        '/api/owner/mypage/profile'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '프로필 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}