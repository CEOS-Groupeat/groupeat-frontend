// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useSetupFcm } from '@/lib/firebase/_hooks/useSetupFcm';

function FcmSetup() {
  useSetupFcm();
  return null;
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
