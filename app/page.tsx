import Link from "next/link";

{/* 랜딩 페이지입니다. 해당 페이지에서는 비로그인 둘러보기 페이지, 로그인/회원가입 페이지, 사업자용 랜딩 페이지로 이동합니다. */}
export default function CustomerLandingPage() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <Link href='/common/login'>Login</Link>
      <Link href='/common/signup'>Signup</Link>
      <Link href='/browse'>둘러보기</Link>
      <Link href='/owner'>사장님이신가요?</Link>
    </div>
  );
}
