import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { DeleteCartItem } from '@/src/types/api';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: number) => {
      const res = await fetchClient<DeleteCartItem>(
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
