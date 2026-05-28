// proxy.ts (또는 src/proxy.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // 쿠키에서 토큰 확인
  const token = request.cookies.get('ACCESS_TOKEN')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/mypage') || 
                           request.nextUrl.pathname.startsWith('/order');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/mypage/:path*', '/order/:path*', '/signup/:path*'],
};