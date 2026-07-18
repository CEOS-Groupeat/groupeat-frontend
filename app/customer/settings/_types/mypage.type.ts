import type { GetResponse } from '@/src/types/api';

export type MyPageSummaryResponse = GetResponse<'/api/customer/mypage'>;
export type MyPageSummaryData = NonNullable<MyPageSummaryResponse['data']>;