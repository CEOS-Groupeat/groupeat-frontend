import { getMessaging, getToken, isSupported } from 'firebase/messaging';
import { app } from './config';

// 권한 팝업을 띄우고, 허용되면 토큰 발급
export async function requestFcmToken(): Promise<string | null> {
  const supported = await isSupported();
  if (!supported) return null;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return null;

  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    return token ?? null;
  } catch (error) {
    console.error('FCM 토큰 발급 실패:', error);
    return null;
  }
}

// 팝업 없이, 이미 허용된 경우에만 조용히 토큰 재발급
export async function silentlyGetFcmTokenIfGranted(): Promise<string | null> {
  const supported = await isSupported();
  if (!supported) return null;

  if (Notification.permission !== 'granted') return null;

  const messaging = getMessaging(app);
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    return token ?? null;
  } catch (error) {
    console.error('FCM 토큰 재발급 실패:', error);
    return null;
  }
}
