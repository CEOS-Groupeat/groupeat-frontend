import StatusBar from '@/app/customer/order/[orderId]/_components/StatusBar';
import Ellipse from '@/public/icons/icon_ellipse.svg';

interface OrderStatusBarProps {
  storeName: string;
  currentStep: number;
  pickupDate: string;
  pickupTime: string;
}

export default function OrderStatusBar() {
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <div className="flex flex-col items-start gap-0.75">
        <div className="flex flex-col items-start">
          <p className="text-text-subtle text-body font-semibold">데이브런치</p>
          <p className="text-headline1 font-semibold">
            현장 결제를 진행해 주세요.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-text-subtlest text-label1">4월 23일</p>
          <Ellipse />
          <p className="text-text-subtlest text-label1">오후 5시</p>
        </div>
      </div>

      <StatusBar currentStep={2}/>
    </div>
  );
}
