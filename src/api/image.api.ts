import { fetchClient } from '@/lib/fetchClient';
import { components } from '@/src/types/schema';
import { ApiResponse } from '@/types/store';

export type ImageUploadDomain = components['schemas']['ImageUploadDomain'];
export type PresignedUrlRequest =
  components['schemas']['ImagePresignedUrlRequest'];
export type PresignedUrlResponse =
  components['schemas']['ImagePresignedUrlResponse'];

export const imageAPI = {
  getPresignedUrl: async (
    fileName: string,
    contentType: string,
    domain: ImageUploadDomain
  ) => {
    const requestBody: PresignedUrlRequest = {
      fileName,
      contentType,
    };

    // const res = await fetchClient<PresignedUrlResponse>( <- 백엔드 수정후 코드 수정예정
    const res = await fetchClient<ApiResponse<PresignedUrlResponse>>(
      `/api/uploads/images/presigned-url?domain=${domain}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.isSuccess) throw new Error(res.message);
    return res.data;
  },

  uploadToS3: async (
    file: File,
    domain: ImageUploadDomain
  ): Promise<string> => {
    const { uploadUrl, imageUrl } = await imageAPI.getPresignedUrl(
      file.name,
      file.type,
      domain
    );

    if (!uploadUrl) {
      throw new Error('업로드 주소를 받아오지 못했습니다.');
    }

    if (!imageUrl) {
      throw new Error('이미지 주소를 받아오지 못했습니다.');
    }

    const s3Response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!s3Response.ok) {
      throw new Error('S3 이미지 업로드에 실패했습니다.');
    }

    return imageUrl;
  },
};
