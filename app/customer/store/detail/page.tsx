{
  /* 가게 상세 페이지입니다. */
}
import Link from "next/link";

export default function CustomerStoreDetailPage() {
  return (
    <div className="">
      <h1>3.0.0 가게 상세 페이지</h1>
      {/* 리뷰 페이지로 이동시키는 인터랙션이 안 보여요. 확인 부탁드립니다. */}
      <Link href="/customer/store/review">고객 리뷰</Link>
      {/* 장바구니로 이동해야 합니다. */}
      <Link href="/customer/order/request">주문 요청</Link>

      {/* 결제 완료 후 페이지 이동은 기능명세서에 명시되어 있습니다. */}
    </div>
  );
}