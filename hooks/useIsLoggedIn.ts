import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { GetResponse } from '@/src/types/api';

type MeResponse = GetResponse<'/api/auth/me'>;

export function useIsLoggedIn() {
  const { data, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await fetchClient<MeResponse>('/api/auth/me');
      if (!res.isSuccess) return null;
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoggedIn: !!data && data.memberStatus === 'ACTIVE',
    isLoading,
  };
}
