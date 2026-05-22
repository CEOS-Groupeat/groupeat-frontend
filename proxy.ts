import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // 쿠키에서 토큰 확인
  const token = request.cookies.get('ACCESS_TOKEN')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/mypage') || 
                           request.nextUrl.pathname.startsWith('/order');

  // 보호된 라우트에 토큰 없이 접근 시
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 이미 로그인한 유저가 로그인 페이지에 접근 시
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 위 조건에 해당하지 않으면 그대로 통과
  return NextResponse.next();
}

// proxy가 실행될 경로 설정 (기존과 동일하게 사용 가능할 가능성이 높습니다)
export const config = {
  matcher: ['/home', '/mypage/:path*', '/order/:path*'],
};