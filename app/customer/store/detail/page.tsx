{
  /* 가게 상세 페이지입니다. */
}
import Link from "next/link";

export default function CustomerStoreDetailPage() {
  return (
    <div className="">
      <h1>3.0.0 가게 상세 페이지</h1>
      <Link href="/customer/store/review">고객 리뷰</Link>
      <Link href="/customer/order/request">주문 요청</Link>
    </div>
  );
}
