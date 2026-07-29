import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { PatchResponse } from '@/src/types/api';

type MarkAsReadResponse = PatchResponse<'/api/notifications/{notificationId}/read'>;

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const res = await fetchClient<MarkAsReadResponse>(
        `/api/notifications/${notificationId}/read`,
        { method: 'PATCH' }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}