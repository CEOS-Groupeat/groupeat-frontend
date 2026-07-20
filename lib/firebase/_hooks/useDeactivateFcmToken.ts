import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { DeleteResponse, DeleteRequest } from '@/src/types/api';

type FcmDeactivateResponse =
  DeleteResponse<'/api/notifications/fcm-registrations'>;
type FcmDeactivateRequest =
  DeleteRequest<'/api/notifications/fcm-registrations'>;

export function useDeactivateFcmToken() {
  return useMutation({
    mutationFn: async (registrationToken: string) => {
      const payload: FcmDeactivateRequest = { registrationToken };

      const res = await fetchClient<FcmDeactivateResponse>(
        '/api/notifications/fcm-registrations',
        {
          method: 'DELETE',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? 'FCM 토큰 비활성화에 실패했어요.');
      }
      return res.data;
    },
  });
}
