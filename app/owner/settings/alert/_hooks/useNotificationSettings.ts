import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { NotificationSettingsResponse } from '../_types/notificationSettings.type';

export function useNotificationSettings() {
  return useQuery({
    queryKey: ['ownerNotificationSettings'],
    queryFn: async () => {
      const res = await fetchClient<NotificationSettingsResponse>(
        '/api/owner/mypage/notification-settings'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '알림 설정을 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
