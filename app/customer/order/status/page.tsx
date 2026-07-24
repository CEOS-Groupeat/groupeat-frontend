'use client';
{
  /* 주문 내역 페이지입니다. */
}
import { useRouter } from 'next/navigation';
import CustomerNavbar from '@/components/ui/CustomerNavbar';
import CustomerOrderStatusHeader from './_components/CustomerOrderStatusHeader';
import OrderStatusList from './_components/OrderStatusContent';

import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import CustomerInfoModal from '@/app/login/_components/CustomerInfoModal';

export default function CustomerOrderStatusPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: isAuthLoading } = useIsLoggedIn();
  const showLoginModal = !isAuthLoading && !isLoggedIn;

  return (
    <>
      <div className="w-full min-h-screen bg-background-default flex flex-col px-4 pb-27 font-['Pretendard']">
        <CustomerOrderStatusHeader />
        <OrderStatusList />
        <CustomerNavbar />
      </div>
      {showLoginModal && (
        <CustomerInfoModal onClose={() => router.replace('/customer/home')} />
      )}
    </>
  );
}
