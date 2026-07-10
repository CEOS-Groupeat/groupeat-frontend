import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { WithdrawCustomerResponse } from '../_types/profile.type';

export function useWithdrawCustomer() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetchClient<WithdrawCustomerResponse>(
        '/api/customer/mypage/account',
        { method: 'DELETE' }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '회원 탈퇴에 실패했어요.');
      }
      return res.data;
    },
  });
}
