'use client';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderForm from '@/app/customer/order/request/_components/OrderForm';
import OrderInfo from '@/app/customer/order/request/_components/OrderInfo';
import OrderRequestHeader from '@/app/customer/order/request/_components/OrderRequestHeader';
import DefaultButton from '@/components/ui/ButtonDefault';
import SectionDivider from '@/components/ui/SectionDivider';

{
  /* 주문 요청 페이지입니다. */
}
export default function CustomerOrderRequestPage() {
  const handlePurchase = () => {
    return;
  };
  return (
    <main className="w-full min-h-dvh pt-10 pb-52.5">
      <OrderRequestHeader />

      <section className="w-full flex flex-col items-start gap-3 mt-4 px-4">
        <div className="flex items-center gap-3 self-stretch">
          <h2 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h2>
        </div>
        <OrderCard />
      </section>

      <SectionDivider className="my-6" />

      <section className="w-full flex flex-col items-start gap-3 mt-4 px-4">
        <OrderForm />
      </section>

      <SectionDivider className="my-6" />

      <OrderInfo />

      <SectionDivider className="my-6" />

      <div className="flex px-4 flex-col items-start gap-2.5 self-stretch">
        <h1 className='text-text-default text-headline3 font-semibold'>결제 금액</h1>
        <OrderPrice />
      </div>

      <div className="fixed w-full bottom-6 px-4">
        <DefaultButton onClick={handlePurchase} disabled={false}>
          782,040원 결제하기
        </DefaultButton>
      </div>
    </main>
  );
}
