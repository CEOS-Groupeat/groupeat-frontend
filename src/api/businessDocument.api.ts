// lib/businessDocument.api.ts
import { fetchClient } from '@/lib/fetchClient';
import { components } from '@/src/types/schema';

export type ImagePresignedUrlRequest = components['schemas']['ImagePresignedUrlRequest'];
export type ApiResponseImagePresignedUrlResponse = components['schemas']['ApiResponseImagePresignedUrlResponse'];

export const businessDocumentAPI = {
  getBusinessPresignedUrl: async (fileName: string, contentType: string) => {
    const requestBody: ImagePresignedUrlRequest = {
      fileName,
      contentType,
    };

    const res = await fetchClient<ApiResponseImagePresignedUrlResponse>(
      '/api/uploads/business-document/presigned-url',
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.isSuccess) {
      throw new Error(res.message || '사업자 문서용 Presigned URL 발급에 실패했습니다.');
    }

    return res.data;
  },

  /**
   * 사업자등록증 파일을 S3에 직접 업로드하고 증명서 S3 URL을 반환합니다.
   */
  uploadBusinessRegistrationToS3: async (file: File): Promise<string> => {
    const data = await businessDocumentAPI.getBusinessPresignedUrl(file.name, file.type);

    if (!data?.uploadUrl || !data?.imageUrl) {
      throw new Error('사업자 서류 업로드 인프라 정보를 신뢰할 수 없습니다.');
    }

    const s3Response = await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!s3Response.ok) {
      throw new Error('S3 사업자등록증 파일 전송에 실패했습니다.');
    }

    return data.imageUrl;
  },
};