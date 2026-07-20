import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { PostResponse, PostRequest } from '@/src/types/api';

type FcmRegisterResponse = PostResponse<'/api/notifications/fcm-registrations'>;
type FcmRegisterRequest = PostRequest<'/api/notifications/fcm-registrations'>;

export function useRegisterFcmToken() {
  return useMutation({
    mutationFn: async (registrationToken: string) => {
      const payload: FcmRegisterRequest = {
        registrationToken,
        platform: 'WEB',
      };

      const res = await fetchClient<FcmRegisterResponse>(
        '/api/notifications/fcm-registrations',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? 'FCM 토큰 등록에 실패했어요.');
      }
      return res.data;
    },
  });
}
