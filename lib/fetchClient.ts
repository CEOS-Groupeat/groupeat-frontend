// lib/fetchClient.ts
export async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Proxy(rewrites)를 사용하므로, 별도의 외부 백엔드 도메인이 아닌 자체 경로(/api)를 사용합니다.
  const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // 브라우저의 HttpOnly 쿠키를 Next.js Proxy로 실어 보내기 위한 필수 옵션
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const text = await response.text();
  
  if (!text) {
    return {} as T; 
  }

  return JSON.parse(text) as T;
}