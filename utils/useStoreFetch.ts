export const checkServerHealth = async (): Promise<string> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/api/test/health`);

  if (!response.ok) {
    throw new Error('서버 응답 에러');
  }

  return response.text(); 
};