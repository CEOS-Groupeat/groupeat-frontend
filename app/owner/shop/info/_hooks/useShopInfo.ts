import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ShopInfoResponse } from '../_types/shop.type';

export function useShopInfo() {
  return useQuery({
    queryKey: ['shopInfo'],
    queryFn: async () => {
      try {
        const res = await fetchClient<ShopInfoResponse>('/api/owner/store');
        if (!res.isSuccess) {
          throw new Error(res.message ?? '가게 정보를 불러오지 못했어요.');
        }
        return res.data;
      } catch (error) {
        // fetchClient가 던진 에러 메시지로 STORE4042 케이스 구분
        if (
          error instanceof Error &&
          error.message.includes('사업자 회원의 가게를 찾을 수 없습니다')
        ) {
          return null; // 신규 사장님, 정상 케이스
        }
        throw error;
      }
    },
  });
}
