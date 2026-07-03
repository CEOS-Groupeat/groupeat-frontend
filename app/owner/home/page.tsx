import AlertCard from '@/components/owner/AlertCard';
import DashboardCardA from '@/components/owner/DashboardCardA';
import DashBoardCardB from '@/components/owner/DashboardCardB';
import OpenChip from '@/components/owner/OpenChip';
import OrderList from '@/components/owner/OrderList';
import OwnerHeader from '@/components/owner/OwnerHeader';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import ArrowRight from '@/public/icons/icon_arrow_right.svg';
import Link from 'next/link';

const storeInfo = {
  storeName: '데이브런치',
  isOpen: true,
  pendingOrderCount: 3,
  todaysOrderCount: 4,
  expiredOrderCount: 7,
};

const orderMock = [
  {
    orderId: 12321, //임시
    isReorder: true,
    eventName: 'CEOS 데모데이',
    customerName: '안세빈',
    pickupTime: '오전 10:00',
    menu: '반반 세트',
    quantity: '55',
  },
  {
    orderId: 12124321,
    isReorder: false,
    eventName: '학생회 간식 사업',
    customerName: '안서연',
    pickupTime: '오전 10:00',
    menu: '모닝 세트',
    quantity: '100',
  },
];

{
  /* 사업자 메인 페이지입니다. */
}
export default function OwnerHomePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-23 bg-background-default">
      <OwnerHeader />

      <section className="flex flex-col items-start w-full gap-2.5 px-4 mt-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[20px] font-bold text-headline2 text-text-default">
              {storeInfo.storeName} 사장님
            </h2>
            <p className="text-label2 text-text-subtlest">
              오늘의 단체주문 현황을 확인하세요
            </p>
          </div>
          {/* 3. 단일 Chip 컴포넌트로 분기 처리 */}
          <OpenChip isOpen={storeInfo.isOpen} />
        </div>
      </section>

      {storeInfo.pendingOrderCount > 0 && (
        <section className="w-full px-4 mt-4">
          <AlertCard pendingCount={storeInfo.pendingOrderCount} />
        </section>
      )}

      <section className="flex w-full gap-2 px-4 mt-6">
        <DashboardCardA
          text="오늘 픽업 건"
          icon="box"
          count={storeInfo.todaysOrderCount}
        />
        <DashboardCardA
          text="픽업 완료"
          icon="terminated"
          count={storeInfo.expiredOrderCount}
        />
      </section>

      <section className="flex flex-col w-full px-4 mt-8">
        <div className="flex items-center justify-between w-full px-1">
          <h2 className="font-semibold text-headline3 text-text-default">
            오늘 픽업 건
          </h2>
          <Link href="/owner/order">
            <ArrowRight className="w-5 h-5 text-icon-subtlest" />
          </Link>
        </div>
        <div className="flex flex-col w-full gap-2 mt-4">
          {orderMock.map((order) => (
            <OrderList key={order.orderId} {...order} />
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full px-4 mt-8">
        <div className="flex items-center justify-between w-full px-1">
          <h2 className="font-semibold text-headline3 text-text-default">
            매출 요약
          </h2>
          <Link href="/owner/order/summary">
            <ArrowRight className="w-5 h-5 text-icon-subtlest" />
          </Link>
        </div>
        <div className="flex w-full gap-2 mt-4">
          <DashBoardCardB
            text="이번 주 주문 수"
            icon="people"
            count={22}
            increasedCount={3}
          />
          <DashBoardCardB
            text="이번 주 매출"
            icon="statistics"
            count={18}
            increasedCount={5}
          />
        </div>

        <OwnerNavbar />
      </section>
    </div>
  );
}
