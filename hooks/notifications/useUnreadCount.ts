import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { GetResponse } from '@/src/types/api';

type UnreadCountResponse = GetResponse<'/api/notifications/unread-count'>;

export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: async () => {
      const res = await fetchClient<UnreadCountResponse>(
        '/api/notifications/unread-count'
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });
}