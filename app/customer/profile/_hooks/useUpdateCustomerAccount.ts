import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  UpdateCustomerAccountRequest,
  UpdateCustomerAccountResponse,
} from '../_types/profile.type';

export function useUpdateCustomerAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCustomerAccountRequest) => {
      const res = await fetchClient<UpdateCustomerAccountResponse>(
        '/api/customer/mypage/account',
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '계정 정보 수정에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerAccount'] });
    },
  });
}