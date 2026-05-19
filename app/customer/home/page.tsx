{
  /* 고객 메인 페이지입니다. */
}
import Link from "next/link";

export default function CustomerHomePage() {
  return (
    <div className="">
      <h1>1.0.0 고객 메인 페이지(홈)</h1>
      <Link href="/customer/search">조건에 맞는 가게 찾기</Link>
    </div>
  );
}
