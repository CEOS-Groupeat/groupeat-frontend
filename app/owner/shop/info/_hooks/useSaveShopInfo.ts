import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  SaveShopInfoRequest,
  SaveShopInfoResponse,
} from '../_types/shop.type';

export function useSaveShopInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveShopInfoRequest) => {
      const res = await fetchClient<SaveShopInfoResponse>('/api/owner/store', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (!res.isSuccess) {
        throw new Error(res.message ?? '가게 정보 저장에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopInfo'] });
    },
  });
}
