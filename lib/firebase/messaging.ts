import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type MessagePayload,
} from 'firebase/messaging';
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

// 포그라운드 상태(앱을 직접 보고 있을 때)에서 메시지 수신 감지
// 반환값은 구독 해제 함수(unsubscribe) — 컴포넌트 언마운트 시 호출 필요
export async function listenForegroundMessages(
  callback: (payload: MessagePayload) => void
): Promise<(() => void) | null> {
  const supported = await isSupported();
  if (!supported) return null;

  const messaging = getMessaging(app);
  const unsubscribe = onMessage(messaging, (payload) => {
    callback(payload);
  });

  return unsubscribe;
}
