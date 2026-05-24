// app/signup/page.tsx
import OwnerSignupFunnel from '@/app/signup/owner/OwnerSignupFunnel';

export default async function SignupPage() {
  // 낚아챈 토큰을 Funnel 컨트롤러로 전달
  return <OwnerSignupFunnel />;
}
