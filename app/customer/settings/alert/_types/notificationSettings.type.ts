import type { GetResponse } from '@/src/types/api';
import type { components } from '@/src/types/schema';

export type NotificationSettingsResponse = GetResponse<'/api/customer/mypage/notification-settings'>;
export type NotificationSettingsData = NonNullable<NotificationSettingsResponse['data']>;
export type NotificationSettingsUpdateRequest =
  components['schemas']['CustomerNotificationSettingsUpdateRequest'];