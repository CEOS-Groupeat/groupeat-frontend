import OrderStatusBar from '@/app/customer/order/[orderId]/_components/OrderStatusBar';
import SectionDivider from '@/components/ui/SectionDivider';
import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';
export default function CustomerOrderDetail() {
  return (
    <div className="w-full flex pb-16 flex-col items-center gap-6 bg-white">
      <header className="w-full flex pt-10 items-start gap-2.5 self-stretch">
        <div className="w-full flex p-4 items-center justify-between self-stretch">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 상세
          </h1>
          <div />
        </div>
      </header>

      <main className="flex px-4 flex-col items-center gap-5 self-stretch">
        <OrderStatusBar />
      </main>

      <SectionDivider className="w-full my-5" />
    </div>
  );
}
