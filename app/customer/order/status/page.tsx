{
  /* 주문 내역 페이지입니다. */
}
import CustomerNavbar from '@/components/ui/CustomerNavbar';
import CustomerOrderStatusHeader from './_components/CustomerOrderStatusHeader';
import OrderStatusList from './_components/OrderStatusContent';

export default function CustomerOrderStatusPage() {
  return (
    <div className="w-full min-h-screen flex flex-col font-['Pretendard']">
      <CustomerOrderStatusHeader />
      <OrderStatusList />
      <CustomerNavbar />
    </div>
  );
}
