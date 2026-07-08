'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import Link from 'next/link';

import AlertCard from '@/components/owner/AlertCard';
import DashboardCardA from '@/components/owner/DashboardCardA';
import DashBoardCardB from '@/components/owner/DashboardCardB';
import OrderList from '@/components/owner/OrderList';
import OwnerHeader from '@/components/owner/OwnerHeader';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import ArrowRight from '@/public/icons/icon_arrow_right.svg';
import NoOrderIllust from '@/public/illust/illust_NoOrder.svg';

// 아래 타입들은 임시로 작성한 것입니다.
// 실제 schema.d.ts에 있는 타입 이름으로 교체해야 합니다.
type DashboardSummaryDTO = {
  storeName: string;
  pendingOrderCount: number;
  todaysOrderCount: number;
  expiredOrderCount: number;
  weeklyOrderCount: number;
  weeklySalesAmount: number;
  increasedOrderCount: number;
  increasedSalesAmount: number;
};

type OrderSummaryDTO = {
  orderId: number;
  isReorder: boolean;
  eventName: string; // groupName
  customerName: string;
  pickupTime: string;
  menu: string; // 대표 메뉴명
  quantity: string; // 총 수량
};

type ApiResponseDashboard = {
  isSuccess: boolean;
  message: string;
  data: DashboardSummaryDTO;
};
type ApiResponseOrderList = {
  isSuccess: boolean;
  message: string;
  data: { orders: OrderSummaryDTO[] };
};

export default function OwnerHomePage() {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['ownerDashboard'],
    queryFn: async () => {
      // API 엔드포인트 수정 필요
      const res = await fetchClient<ApiResponseDashboard>(
        '/api/owner/store/dashboard'
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
  });

  const { data: todaysOrders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['ownerOrders', 'today'],
    queryFn: async () => {
      const res = await fetchClient<ApiResponseOrderList>(
        '/api/owner/orders?filter=today'
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data.orders || [];
    },
  });

  if (isDashboardLoading || isOrdersLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background-default">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  const storeInfo = dashboardData || {
    storeName: '가게',
    pendingOrderCount: 0,
    todaysOrderCount: 0,
    expiredOrderCount: 0,
    weeklyOrderCount: 0,
    weeklySalesAmount: 0,
    increasedOrderCount: 0,
    increasedSalesAmount: 0,
  };

  const orderList = todaysOrders || [];

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
        </div>
      </section>

      {storeInfo.pendingOrderCount > 0 && (
        <section className="w-full px-4 mt-4">
          <AlertCard pendingCount={storeInfo.pendingOrderCount} />
        </section>
      )}

      <section className="flex w-full gap-2 px-4 mt-2">
        <DashboardCardA
          text="픽업 예정 건"
          icon="box"
          count={storeInfo.todaysOrderCount}
        />
        <DashboardCardA
          text="픽업 완료"
          icon="terminated"
          count={storeInfo.expiredOrderCount}
        />
      </section>

      <section className="flex flex-col w-full px-4 mt-7">
        <div className="flex items-center justify-between w-full px-1">
          <h2 className="font-semibold text-headline3 text-text-default">
            오늘 픽업 건
          </h2>
          <Link href="/owner/order">
            <ArrowRight className="w-5 h-5 text-icon-subtlest" />
          </Link>
        </div>
        <div className="flex flex-col w-full gap-2 mt-2">
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <OrderList key={order.orderId} {...order} />
            ))
          ) : (
            <div className="w-full h-32 flex p-3 flex-col justify-center items-center gap-5 rounded-lg border border-border-subtle bg-static-white shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
              <div className='flex pb-2 flex-col items-center gap-0.5'>
                <NoOrderIllust className="w-15 h-15"/>
                <p className='text-text-placeholder text-caption2 font-medium'>대기 중인 픽업 주문이 없습니다</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col w-full px-4 mt-7">
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
            count={storeInfo.weeklyOrderCount}
            increasedCount={storeInfo.increasedOrderCount}
          />
          <DashBoardCardB
            text="이번 주 매출"
            icon="statistics"
            count={storeInfo.weeklySalesAmount}
            increasedCount={storeInfo.increasedSalesAmount}
          />
        </div>

        <OwnerNavbar />
      </section>
    </div>
  );
}
