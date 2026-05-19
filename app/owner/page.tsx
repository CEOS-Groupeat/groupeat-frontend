import Link from "next/link";

{/* 사업자용 랜딩 페이지입니다. */}
export default function OwnerLandingPage() {
    return (
        <div className="">
        <h1>단체주문, 이제 찾아오는 고객을 받아보세요</h1>
        <Link href="/common/login">서비스 이용하러 가기</Link>
        </div>
    );
}