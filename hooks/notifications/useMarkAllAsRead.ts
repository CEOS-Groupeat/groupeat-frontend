import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { PatchResponse } from '@/src/types/api';

type MarkAllAsReadResponse = PatchResponse<'/api/notifications/read-all'>;

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetchClient<MarkAllAsReadResponse>(
        '/api/notifications/read-all',
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