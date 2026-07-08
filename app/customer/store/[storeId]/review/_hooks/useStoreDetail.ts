import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { ApiResponse } from '@/types/store';
import type { StoreDetail as StoreDetailType } from '@/types/store';

export function useStoreDetail(storeId: string) {
  return useQuery<StoreDetailType>({
    queryKey: ['storeDetail', storeId],
    queryFn: async () => {
      const response = await fetchClient(`/api/stores/${storeId}`);
      const result = response as unknown as ApiResponse<StoreDetailType>;

      if (!result.isSuccess) {
        throw new Error(result.message);
      }
      return result.data;
    },
    enabled: !!storeId,
  });
}