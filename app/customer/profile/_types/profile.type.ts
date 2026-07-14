import { GetResponse, PatchRequest, PatchResponse } from '@/src/types/api'; 

export type CustomerAccountResponse = GetResponse<'/api/customer/mypage/account'>;
export type CustomerAccountData = NonNullable<CustomerAccountResponse['data']>;

export type UpdateCustomerAccountRequest = PatchRequest<'/api/customer/mypage/account'>;
export type UpdateCustomerAccountResponse = PatchResponse<'/api/customer/mypage/account'>;

// DELETE는 자동생성 헬퍼와 매칭 안 되어(content 타입 unknown) 수동 정의
export interface WithdrawCustomerResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: { message: string };
}