import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { GetResponse } from '@/src/types/api';

type BusinessProfileResponse =
  GetResponse<'/api/owner/mypage/business-profile'>;

export function useOwnerBusinessProfile() {
  return useQuery({
    queryKey: ['ownerBusinessProfile'],
    queryFn: async () => {
      const res = await fetchClient<BusinessProfileResponse>(
        '/api/owner/mypage/business-profile'
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}
