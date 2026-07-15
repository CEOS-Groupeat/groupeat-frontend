import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

export class ApiError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export function useWithdrawOwner() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetchClient<{
        isSuccess: boolean;
        code?: string;
        message?: string;
      }>('/api/owner/mypage/account', { method: 'DELETE' });

      if (!res.isSuccess) {
        throw new ApiError(
          res.message ?? '회원 탈퇴에 실패했어요.',
          res.code ?? ''
        );
      }
      return res;
    },
  });
}