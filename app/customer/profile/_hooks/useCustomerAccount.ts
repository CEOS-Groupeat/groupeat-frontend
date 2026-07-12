import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { CustomerAccountResponse } from '../_types/profile.type';

export function useCustomerAccount() {
  return useQuery({
    queryKey: ['customerAccount'],
    queryFn: async () => {
      const res = await fetchClient<CustomerAccountResponse>(
        '/api/customer/mypage/account'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '계정 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}
