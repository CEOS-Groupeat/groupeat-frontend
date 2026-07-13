import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type {
  SaveOperationScheduleRequest,
  SaveOperationScheduleResponse,
} from '../_types/operation.type';

export function useSaveOperationSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveOperationScheduleRequest) => {
      const res = await fetchClient<SaveOperationScheduleResponse>(
        '/api/owner/store/order-schedule',
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '운영 정보 저장에 실패했어요.');
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operationSchedule'] });
    },
  });
}
