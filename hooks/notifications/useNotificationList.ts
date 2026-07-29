import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { GetResponse } from '@/src/types/api';

type NotificationListResponse = GetResponse<'/api/notifications'>;

export function useNotificationList() {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam }: { pageParam: number | undefined }) => {
      const params = new URLSearchParams();
      if (pageParam) params.set('lastNotificationId', String(pageParam));
      params.set('size', '20');

      const res = await fetchClient<NotificationListResponse>(
        `/api/notifications?${params.toString()}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
  });
}
