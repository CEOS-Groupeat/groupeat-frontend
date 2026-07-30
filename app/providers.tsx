// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSetupFcm } from '@/lib/firebase/_hooks/useSetupFcm';
import { listenForegroundMessages } from '@/lib/firebase/messaging';
import FcmForegroundToast from '@/components/ui/FcmForegroundToast';

function FcmSetup() {
  useSetupFcm();

  const [notification, setNotification] = useState<{
    title: string;
    body: string;
  } | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    listenForegroundMessages((payload) => {
      setNotification({
        title: payload.notification?.title ?? '알림',
        body: payload.notification?.body ?? '',
      });

      setTimeout(() => setNotification(null), 5000);
    }).then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  if (!notification) return null;

  return (
    <FcmForegroundToast
      title={notification.title}
      body={notification.body}
      onClose={() => setNotification(null)}
    />
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // useState를 사용하여 컴포넌트 마운트 시 한 번만 QueryClient가 생성되도록 보장합니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 옵션 (선택 사항)
            retry: false,
            staleTime: 1000 * 60 * 5, // 5분
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FcmSetup />
      {children}
    </QueryClientProvider>
  );
}
