import OrderNum from '@/public/icons/icon-shopping-bag.svg';
import Rating from '@/public/icons/icon-gift-rating.svg';
import SuitCase from '@/public/icons/icon-bag-suitcase.svg';
import Coupon from '@/public/icons/icon-discount-coupon.svg';

interface OrderSummaryCardProps {
  title: string;
  icon: string;
  text1: string;
  text2: string;
  text3: string;
}

export default function OrderSummaryCard({
  title,
  icon,
  text1,
  text2,
  text3,
}: OrderSummaryCardProps) {
  return (
    <div className="flex w-full pt-3.5 px-3 pb-3 flex-col items-start gap-4 rounded-lg border border-px border-border-subtle bg-static-white shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-1 self-stretch">
        {icon === 'orderNum' ? (
          <OrderNum className="size-[13px]" />
        ) : icon === 'rating' ? (
          <Rating className="size-[13px]" />
        ) : icon === 'income' ? (
          <SuitCase className="size-[13px]" />
        ) : icon === 'average' ? (
          <Coupon className="size-[13px]" />
        ) : null}
        <p className="text-text-subtlest text-label2 font-semibold">{title}</p>
      </div>
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col items-start">
          <p className="text-brand-default text-caption1 font-medium">
            {text1}
          </p>
          <div className="flex justify-center items-start gap-0.5">
            <p className="text-text-default text-headline3 font-bold leading-6.5">
              {text2}
            </p>
            <p className="text-text-default leading-6">{text3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
