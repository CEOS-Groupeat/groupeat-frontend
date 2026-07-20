'use client';

import { requestFcmToken } from '../messaging';
import { useRegisterFcmToken } from './useRegisterFcmToken';
import { useDeactivateFcmToken } from './useDeactivateFcmToken';

export function useFCMToken() {
  const { mutateAsync: registerToken, isPending: isRegistering } =
    useRegisterFcmToken();
  const { mutateAsync: deactivateToken, isPending: isDeactivating } =
    useDeactivateFcmToken();

  const enableNotification = async (): Promise<boolean> => {
    const token = await requestFcmToken();
    if (!token) return false;

    await registerToken(token);
    // 다음에 끌 때 사용할 수 있도록 토큰을 저장해둠
    localStorage.setItem('fcmToken', token);
    return true;
  };

  const disableNotification = async (): Promise<boolean> => {
    const token = localStorage.getItem('fcmToken');
    if (!token) return true;

    await deactivateToken(token);
    localStorage.removeItem('fcmToken');
    return true;
  };

  return {
    enableNotification,
    disableNotification,
    isPending: isRegistering || isDeactivating,
  };
}