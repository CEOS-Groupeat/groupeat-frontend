{
  /* 즐겨찾기 페이지입니다. */
}
import Link from "next/link";

export default function CustomerFavoritePage() {
  return (
    <div className="">
      <h1>3.0.0 즐겨찾기 페이지</h1>
      {/* 해당 페이지에서는 즐겨찾기한 가게들을 조회하고, 상세 보기를 통해 가게 상세로 이동 */}
      <Link href="/customer/store/detail">상세 보기</Link>
      {/*가게 별 카드에서 상세보기 버튼 */}
    </div>
  );
}