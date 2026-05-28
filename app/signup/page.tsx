// app/signup/page.tsx
import { redirect } from 'next/navigation';
import SignupFunnel from './SignupFunnel';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ signupToken?: string }>;
}) {
  const { signupToken } = await searchParams;

  if (!signupToken) {
    redirect('/login');
  }

  // 낚아챈 토큰을 Funnel 컨트롤러로 전달
  return <SignupFunnel initialToken={signupToken} />; 
}