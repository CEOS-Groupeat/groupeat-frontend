import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  NotificationSettingsResponse,
  NotificationSettingsUpdateRequest,
} from '../_types/notificationSettings.type';

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: NotificationSettingsUpdateRequest) => {
      const res = await fetchClient<NotificationSettingsResponse>(
        '/api/customer/mypage/notification-settings',
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '알림 설정 변경에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
    },
  });
}