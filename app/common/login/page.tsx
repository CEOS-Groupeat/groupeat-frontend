import Link from "next/link";

{/* 로그인 페이지입니다. */}
export default function LoginPage() {
  return (
    <div className="">
      <h1>로그인</h1>
      {/* 로그인 폼은 고객 / 사업자를 선택한 뒤 소셜 로그인을 진행합니다. 이때 소셜 로그인은 카카오 / 네이버 / 구글이 가능합니다. */}

      {/* 
      <KakaoLoginButton />
      <NaverLoginButton />
      <GoogleLoginButton /> 
      */}

      <h1>회원가입</h1>
      {/* 회원가입 페이지로 이동하는 버튼입니다. */}
      <Link href='/common/signup'>회원가입</Link>
    </div>
  );
}
