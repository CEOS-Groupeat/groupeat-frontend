'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { GetResponse } from '@/src/types/api';
import { silentlyGetFcmTokenIfGranted } from '../messaging';
import { useRegisterFcmToken } from './useRegisterFcmToken';

type MeResponse = GetResponse<'/api/auth/me'>;

export function useSetupFcm() {
  const { mutate: registerToken } = useRegisterFcmToken();

  const { data: me } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await fetchClient<MeResponse>('/api/auth/me');
      if (!res.isSuccess) return null;
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분간 재요청 안 함
  });

  useEffect(() => {
    if (!me || me.memberStatus !== 'ACTIVE') return;

    const setup = async () => {
      const token = await silentlyGetFcmTokenIfGranted();
      if (token) {
        registerToken(token);
      }
    };

    setup();
  }, [me, registerToken]);
}
