{
  /* 검색 결과 페이지입니다. */
}
import Link from "next/link";

export default function CustomerSearchPage() {
  return (
    <div className="">
      <h1>2.0.0 검색 결과 페이지</h1>
      {/* 해당 페이지에서는 드롭다운으로 구현된 필터 기능으로 가게들을 조회하고, 상세 보기를 통해 가게 상세로 이동 */}
      <Link href="/customer/store/detail">상세 보기</Link>
      {/*가게 별 카드에서 상세보기 버튼 */}
    </div>
  );
}
