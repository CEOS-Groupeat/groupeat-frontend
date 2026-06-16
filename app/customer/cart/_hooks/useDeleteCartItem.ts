import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { ApiResponse } from '@/types/store';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: number) => {
      const res = await fetchClient<ApiResponse<string>>(
        `/api/carts/items/${cartItemId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.isSuccess) throw new Error(res.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
