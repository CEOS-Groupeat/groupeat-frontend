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

interface DashboardSummaryData {
  storeName: string;
  waitingCount: number;
  confirmedCount: number;
  completedCount: number;
}

interface ApiResponseDashboard {
  isSuccess: boolean;
  code: string;
  message: string;
  data: DashboardSummaryData;
}

interface OrderSummaryDTO {
  orderId: number;
  isReorder: boolean;
  eventName: string;
  customerName: string;
  pickupTime: string;
  menu: string;
  quantity: string;
}

interface ApiResponseOrderList {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    orders: OrderSummaryDTO[];
  };
}

export default function OwnerHomePage() {
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useQuery<DashboardSummaryData>({
      queryKey: ['ownerDashboardSummary'],
      queryFn: async () => {
        const res = await fetchClient<ApiResponseDashboard>(
          '/api/owner/dashboard/summary'
        );
        if (!res.isSuccess)
          throw new Error(
            res.message || '대시보드 요약을 불러오지 못했습니다.'
          );
        return res.data;
      },
    });

  const { data: todaysOrders, isLoading: isOrdersLoading } = useQuery<
    OrderSummaryDTO[]
  >({
    queryKey: ['ownerOrders', 'today'],
    queryFn: async () => {
      const res = await fetchClient<ApiResponseOrderList>(
        '/api/owner/orders?filter=today'
      );
      if (!res.isSuccess)
        throw new Error(res.message || '주문 목록을 불러오지 못했습니다.');
      return res.data?.orders || [];
    },
  });

  if (isDashboardLoading || isOrdersLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background-default text-text-subtlest">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  const storeName = dashboardData?.storeName ?? '';
  const waitingCount = dashboardData?.waitingCount ?? 0;
  const confirmedCount = dashboardData?.confirmedCount ?? 0;
  const completedCount = dashboardData?.completedCount ?? 0;

  const weeklyOrderCount = 22;
  const weeklySalesAmount = 18;
  const increasedOrderCount = 3;
  const increasedSalesAmount = 5;

  const orderList = todaysOrders || [];

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-23 bg-background-default">
      <OwnerHeader />

      <section className="flex flex-col items-start w-full gap-2.5 px-4 mt-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[20px] font-bold text-headline2 text-text-default">
              {storeName} 사장님
            </h2>
            <p className="text-label2 font-normal text-text-default">
              오늘의 단체주문 현황을 확인하세요
            </p>
          </div>
        </div>
      </section>

      {waitingCount > 0 && (
        <section className="w-full px-4 mt-4">
          <AlertCard pendingCount={waitingCount} />
        </section>
      )}

      <section className="flex w-full gap-2 px-4 mt-2">
        <DashboardCardA text="픽업 예정 건" icon="box" count={confirmedCount} />
        <DashboardCardA
          text="픽업 완료"
          icon="terminated"
          count={completedCount}
        />
      </section>

      <section className="flex flex-col w-full px-4 mt-7">
        <div className="flex items-center justify-between w-full px-1">
          <h2 className="font-semibold text-headline3 text-text-default">
            오늘 픽업 건
          </h2>
          <Link href="/owner/orders">
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
              <div className="flex pb-2 flex-col items-center gap-2.5">
                <NoOrderIllust className="w-15 h-15" />
                <p className="text-text-placeholder text-caption2 font-medium">
                  대기 중인 픽업 주문이 없습니다
                </p>
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
        <div className="flex w-full gap-2 mt-2">
          <DashBoardCardB
            text="이번 주 주문 수"
            icon="people"
            count={weeklyOrderCount}
            increasedCount={increasedOrderCount}
          />
          <DashBoardCardB
            text="이번 주 매출"
            icon="statistics"
            count={weeklySalesAmount}
            increasedCount={increasedSalesAmount}
          />
        </div>

        <OwnerNavbar />
      </section>
    </div>
  );
}
