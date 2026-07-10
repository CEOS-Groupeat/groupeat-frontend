export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  imageUrl: string;
  objectKey: string;
}

export type ImageDomain = 'STORE' | 'MENU' | 'PROFILE' | 'REVIEW';
