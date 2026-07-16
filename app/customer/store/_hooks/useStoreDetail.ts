// src/hooks/queries/useStoreDetail.ts (파일 생성)
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { ApiResponse, StoreDetail as StoreDetailType } from '@/types/store';

export function useStoreDetail(storeId: string) {
  return useQuery<StoreDetailType>({
    queryKey: ['storeDetail', storeId],
    queryFn: async () => {
      const response = await fetchClient(`/api/stores/${storeId}`);
      const result = response as unknown as ApiResponse<StoreDetailType>;
      if (!result.isSuccess) throw new Error(result.message);
      return result.data;
    },
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5,
  });
}