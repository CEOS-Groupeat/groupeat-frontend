import Link from "next/link";

{
  /* 주문 요청 페이지입니다. */
}
export default function CustomerOrderRequestPage() {
  return (
    <div className="">
      <h1>4.0.0 주문 요청 페이지</h1>
      {/* 해당 페이지에서는 주문 요청을 위한 폼이 존재하며, 주문 요청 완료 시 주문 상세 페이지로 이동. 이때 결제는 카카오페이 및 토스페이로 진행 */}
      <Link href="/kakao-pay">카카오페이로 결제하기</Link>
      <Link href="/toss-pay">토스페이로 결제하기</Link>

      {/* 결제 완료되면 어디로 이동하나요? */}
    </div>
  );
}
