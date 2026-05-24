// hooks/useAuthQuery.ts
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

const fetchMe = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    credentials: 'include', 
  });
  
  if (!res.ok) throw new Error('인증 실패');
  return res.json();
};

export const useAuthQuery = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setUser = useAuthStore((state: any) => state.setUser);

  const query = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false, // 실패 시 재시도 안 함 (토큰 만료나 미로그인 상태일 확률이 높음)
    staleTime: 1000 * 60 * 30, // 30분 동안은 캐시된 정보 사용
  });

  // Query 결과가 바뀌면 Zustand 스토어 업데이트
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
  }, [query.isSuccess, query.data, setUser]);

  return query;
};