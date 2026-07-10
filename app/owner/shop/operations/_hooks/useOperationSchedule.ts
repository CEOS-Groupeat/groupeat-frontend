import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import type { OperationScheduleResponse } from '../_types/operation.type';

export function useOperationSchedule() {
  return useQuery({
    queryKey: ['operationSchedule'],
    queryFn: async () => {
      const res = await fetchClient<OperationScheduleResponse>(
        '/api/owner/store/order-schedule'
      );
      if (!res.isSuccess) {
        throw new Error(res.message ?? '운영 정보를 불러오지 못했어요.');
      }
      return res.data;
    },
  });
}