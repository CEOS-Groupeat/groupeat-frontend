// hooks/useValidateBusiness.ts
import { useMutation } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { operations } from '@/src/types/schema';

// operations 인터페이스에서 특정 API 오퍼레이션의 Request/Response 타입을 직접 추출
type ValidateBusinessOp = operations['validateBusinessNumber'];
type MutationInput = ValidateBusinessOp['requestBody']['content']['application/json'];
type MutationResponse = ValidateBusinessOp['responses'][200]['content']['*/*'];

export function useValidateBusiness() {
  return useMutation({
    mutationFn: async (request: MutationInput) => {
      // fetchClient에 추출한 Response 타입 인자 주입
      const res = await fetchClient<MutationResponse>('/api/business/validate', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      
      // 스키마에 정의된 공통 응답 필드(isSuccess, message, data) 체킹
      if (!res.isSuccess) {
        throw new Error(res.message || '사업자 인증에 실패했습니다.');
      }
      
      // 스키마 구조: res.data 내부에 validationToken 존재 확인
      return res.data;
    },
  });
}