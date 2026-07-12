import type { GetResponse, PutRequest, PutResponse } from '@/src/types/api';

export type ShopInfoResponse = GetResponse<'/api/owner/store'>;
export type ShopInfoData = NonNullable<ShopInfoResponse['data']>;

export type SaveShopInfoRequest = PutRequest<'/api/owner/store'>;
export type SaveShopInfoResponse = PutResponse<'/api/owner/store'>;
