import { useMutation } from '@tanstack/react-query';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';

export function useShopImageUpload() {
  const { mutateAsync: getPresignedUrl } = usePresignedUrl();

  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const { uploadUrl, imageUrl } = await getPresignedUrl({
        fileName: file.name,
        contentType: file.type,
        domain: 'STORE',
      });

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

      return imageUrl;
    },
  });
}
