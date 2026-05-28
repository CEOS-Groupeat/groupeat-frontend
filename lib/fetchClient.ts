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

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const text = await response.text();
  
  if (!text) {
    return {} as T; 
  }

  return JSON.parse(text) as T;
}