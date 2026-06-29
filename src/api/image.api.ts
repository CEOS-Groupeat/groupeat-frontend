// lib/image.api.ts
import { fetchClient } from '@/lib/fetchClient';
import { components } from '@/src/types/schema';

export type PublicImageUploadDomain = components['schemas']['PublicImageUploadDomain'];
export type ImagePresignedUrlRequest = components['schemas']['ImagePresignedUrlRequest'];
export type ApiResponseImagePresignedUrlResponse = components['schemas']['ApiResponseImagePresignedUrlResponse'];

export const imageAPI = {
  getPresignedUrl: async (
    fileName: string,
    contentType: string,
    domain: PublicImageUploadDomain
  ) => {
    const requestBody: ImagePresignedUrlRequest = {
      fileName,
      contentType,
    };

    const res = await fetchClient<ApiResponseImagePresignedUrlResponse>(
      `/api/uploads/images/presigned-url?domain=${domain}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.isSuccess) {
      throw new Error(res.message || 'Presigned URL 발급에 실패했습니다.');
    }

    return res.data;
  },

  uploadToS3: async (file: File, domain: PublicImageUploadDomain): Promise<string> => {
    const data = await imageAPI.getPresignedUrl(file.name, file.type, domain);

    if (!data?.uploadUrl || !data?.imageUrl) {
      throw new Error('S3 업로드 정보 혹은 이미지 접근 주소를 받아오지 못했습니다.');
    }

    const s3Response = await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!s3Response.ok) {
      throw new Error('S3 이미지 업로드에 실패했습니다.');
    }

    return data.imageUrl;
  },
};