import type { GetResponse } from '@/src/types/api';
import type { components } from '@/src/types/schema';

export type OwnerProfileResponse = GetResponse<'/api/owner/mypage/profile'>;
export type OwnerProfileData = NonNullable<OwnerProfileResponse['data']>;
export type OwnerProfileUpdateRequest =
  components['schemas']['OwnerProfileUpdateRequest'];