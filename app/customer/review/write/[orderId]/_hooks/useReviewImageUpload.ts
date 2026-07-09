import { useMutation } from '@tanstack/react-query';
import { usePresignedUrl } from './usePresignedUrl';

export function useReviewImageUpload() {
  const { mutateAsync: getPresignedUrl } = usePresignedUrl();

  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      // 1. presigned URL 발급
      const { uploadUrl, imageUrl } = await getPresignedUrl({
        fileName: file.name,
        contentType: file.type,
      });

      // 2. 발급받은 URL로 S3에 직접 업로드
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('이미지 업로드에 실패했어요.');
      }

      // 3. 리뷰 작성 시 사용할 imageUrl 반환
      return imageUrl;
    },
  });
}
