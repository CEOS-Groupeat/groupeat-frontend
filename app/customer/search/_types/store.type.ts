import type { GetResponse } from '@/src/types/api';
import type { components } from '@/src/types/schema';

export type StoreListResponse = GetResponse<'/api/search/stores'>;
export type StoreListData = NonNullable<StoreListResponse['data']>;
export type Store = NonNullable<StoreListData['storeList']>[number];

// 검색 조건 타입 (condition 안에 실제로 들어가는 내용)
export type StoreSearchParams = components['schemas']['StoreSearchCondition'];

