import OrderStatusBar from '@/app/customer/order/[orderId]/_components/OrderStatusBar';
import OrderCard from '@/app/customer/order/request/_components/OrderCard';
import OrderPrice from '@/app/customer/order/request/_components/OrderPrice';
import SectionDivider from '@/components/ui/SectionDivider';
import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';
import Ellipse from '@/public/icons/icon_ellipse.svg';
import Alert from '@/public/icons/icon_alert.svg';
import BackButton from '@/components/ui/BackButton';

export default function CustomerOrderDetail() {
  const cancelOrder = () => {
    // todo: 주문취소
    return;
  };

  return (
    <div className="w-full flex pb-16 flex-col items-center gap-6 bg-white">
      <header className="w-full flex pt-10 items-start gap-2.5 self-stretch">
        <div className="w-full flex p-4 items-center justify-between self-stretch">
          <BackButton />
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 상세
          </h1>
          <div />
        </div>
      </header>

      <main className="flex px-4 flex-col items-center gap-5 self-stretch">
        <OrderStatusBar
          storeName="데이브런치"
          currentStep={2}
          pickupDate="4월 23일"
          pickupTime="오후 5시"
          paymentMethod="카카오페이"
        />
      </main>

      <SectionDivider className="w-full my-5" />

      <section className="flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            주문 정보
          </h1>
          <OrderCard />
        </div>
      </section>

      <SectionDivider className="w-full my-5" />

      <section className="flex flex-col pb-1 items-start self-stretch px-4">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <h1 className="text-text-default text-headline3 font-semibold">
            결제 정보
          </h1>
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-subtlest text-label1">결제 방식</p>
              <p className="text-text-default text-label1">현장결제</p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-subtlest text-label1">결제 수단</p>
              <p className="text-text-default text-label1">카카오페이</p>
            </div>
            <div className="flex justify-between items-center self-stretch">
              <p className="text-text-subtlest text-label1">총 금액</p>
              <p className="text-text-default text-label1 font-semibold">
                372,400원
              </p>
            </div>
            <OrderPrice />
          </div>
        </div>
      </section>

      <section className="flex flex-col pb-1 items-start self-stretch px-4">
        <h1 className="text-text-default text-headline3 font-semibold pb-2">
          주문자 정보
        </h1>
        <div className="flex flex-col items-start gap-2.75 self-stretch">
          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              주문자명
            </p>
            <p className="text-text-default text-body">안세빈</p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              연락처
            </p>
            <p className="text-text-default text-body">010-2653-7513</p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              주문 일자
            </p>
            <div className="flex items-center gap-1">
              <p className="text-text-default text-body">5월 10일</p>
              <Ellipse />
              <p className="text-text-default text-body">오전 11시 30분</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              단체명
            </p>
            <p className="text-text-default text-body">CEOS 하프톤</p>
          </div>

          <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-text-subtlest text-caption1 font-medium">
              요청사항
            </p>
            <p className="text-text-default text-body">없음</p>
          </div>
        </div>
      </section>

      <SectionDivider className="w-full my-5" />

      <div className="w-full flex flex-col items-start justify-center px-4 gap-2.5">
        <button className="w-full h-12 rounded-xl flex justify-center items-center py-3 px-12 font-semibold border border-border-default">
          주문 취소하기
        </button>
        <div className="flex items-start gap-1">
          <Alert className="text-icon-disable w-4 h-4" />
          <p className="text-text-subtlest text-label2 font-medium">
            주문 정보 변경을 원하시면 취소 후 재주문해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
