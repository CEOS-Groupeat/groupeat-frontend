// lib/fetchClient.ts
export async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  // response body 내부 에러메시지 처리 로직 변경하였습니다. 다른 곳에서 문제 발생 시 해당 주석으로 다시 돌려주면 됩니다.
  // if (!response.ok) {
  //   throw new Error(`API Error: ${response.status}`);
  // }

  if (!response.ok) {
    try {
      const errorText = await response.text();
      
      if (errorText.trim()) {
        const errorJson = JSON.parse(errorText);
        
        const serverMessage = 
          errorJson.message || 
          (typeof errorJson.data === 'string' ? errorJson.data : null) || 
          errorJson.code;

        if (serverMessage) {
          throw new Error(serverMessage);
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e instanceof SyntaxError || !e.message) {
        throw new Error(`API Error: ${response.status}`);
      }
      throw e;
    }

    // 텍스트 바디가 아예 없는 빈 에러 응답일 때의 Legacy Fallback
    throw new Error(`API Error: ${response.status}`);
  }

  const text = await response.text();
  
  if (!text) {
    return {} as T; 
  }

  return JSON.parse(text) as T;
}