import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OwnerDashboardResponse } from '@/src/types/api';

export function useOwnerDashboard() {
  return useQuery({
    queryKey: ['ownerDashboard'],
    queryFn: async () => {
      const res = await fetchClient<OwnerDashboardResponse>(
        '/api/owner/dashboard/summary'
      );
      if (!res.isSuccess) throw new Error(res.message ?? '대시보드 정보를 불러오지 못했어요.');
      return res.data;
    },
  });
}
