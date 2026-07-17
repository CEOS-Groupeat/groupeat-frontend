import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { MyPageSummaryResponse } from '../_types/mypage.type';

export function useMyPageSummary() {
  return useQuery({
    queryKey: ['myPageSummary'],
    queryFn: async () => {
      const res = await fetchClient<MyPageSummaryResponse>(
        '/api/customer/mypage'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '마이페이지 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
