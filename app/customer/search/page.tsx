{
  /* 검색 결과 페이지입니다. */
}
import Link from "next/link";

export default function CustomerSearchPage() {
  return (
    <div className="">
      <h1>2.0.0 검색 결과 페이지</h1>
      <Link href="/customer/store/detail">상세 보기</Link>
      {/*가게 별 카드에서 상세보기 버튼 */}
    </div>
  );
}
