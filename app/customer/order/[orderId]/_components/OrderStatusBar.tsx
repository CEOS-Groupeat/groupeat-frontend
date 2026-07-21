import StatusBar from '@/app/customer/order/[orderId]/_components/StatusBar';
import Ellipse from '@/public/icons/icon_ellipse.svg';

interface OrderStatusBarProps {
  storeName: string;
  currentStep: number;
  pickupDate: string;
  pickupTime: string;
  paymentMethod: string;
}

export default function OrderStatusBar({
  storeName,
  currentStep,
  pickupDate,
  pickupTime,
  paymentMethod,
}: OrderStatusBarProps) {
  const getHeadlineMessage = () => {
    switch (currentStep) {
      case 0:
        return '사장님이 주문을 확인하고 있어요.';
      case 1:
        return paymentMethod === '현장 결제'
          ? '현장 결제를 진행해 주세요.'
          : '픽업을 진행해 주세요.';
      case 2:
        return '음식 픽업이 완료되었습니다.';
      default:
        return '';
    }
  };

  const getFormattedTime = (time: string) => {
    if (!time) return '';

    // "14:30" 형태의 문자열 분해
    const [hourStr, minStr] = time.split(':');
    if (!hourStr || !minStr) return time;

    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const minuteText = minute > 0 ? ` ${minute}분` : '';

    return `${period} ${displayHour}시${minuteText}`;
  };

  return (
    <div className="flex flex-col items-start w-full gap-3">
      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-text-subtle text-body">
            {storeName}
          </p>
          <p className="font-semibold text-headline1 text-text-default">
            {getHeadlineMessage()}
          </p>
        </div>

        <div className="flex items-center gap-1 mt-0.5">
          <p className="text-text-subtlest text-label1">{pickupDate}</p>

          <Ellipse className="size-0.5 text-text-subtlest shrink-0" />

          <p className="text-text-subtlest text-label1">
            {getFormattedTime(pickupTime)}
          </p>
        </div>
      </div>

      <StatusBar currentStep={currentStep} />
    </div>
  );
}
