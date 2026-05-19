{
  /* 고객 메인 페이지입니다. */
}
import { checkServerHealth } from "@/utils/useStoreFetch";
import Link from "next/link";

export default async function CustomerHomePage() {
  const serverMessage = await checkServerHealth().catch((error) => {
    console.error("서버 상태 확인 실패:", error);
    return "서버 상태를 확인할 수 없습니다.";
  });

  return (
    <div className="">
      <p>서버 상태: {serverMessage}</p>
      <h1>1.0.0 고객 메인 페이지(홈)</h1>
      <Link href="/customer/search">조건에 맞는 가게 찾기</Link>
    </div>
  );
}
