import { redirect } from 'next/navigation';
import SignupForm from './SignupForm';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ signupToken?: string }>;
}) {
  const { signupToken } = await searchParams;

  // 토큰이 없으면 비정상 접근이므로 로그인 페이지로 강제 이동
  if (!signupToken) {
    redirect('/login');
  }

  return <SignupForm initialToken={signupToken} />;
}