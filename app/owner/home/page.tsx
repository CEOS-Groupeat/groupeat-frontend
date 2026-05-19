import Link from "next/link";

{/* 사업자 메인 페이지입니다. */}
export default function OwnerHomePage() {
  return (
    <div className="">
      <h1>사업자 홈 페이지: 안녕하세요, 사장님</h1>
      <Link href='/owner/calendar'>캘린더</Link>
      <Link href='/owner/orders'>주문 요약</Link>
    </div>
  );
}
