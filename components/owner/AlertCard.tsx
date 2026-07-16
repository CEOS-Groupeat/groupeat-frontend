import ArrowRight from '@/public/icons/icon_arrow_right.svg';
import Link from 'next/link';

interface AlertCardProps {
  pendingCount: number;
}
export default function AlertCard({ pendingCount }: AlertCardProps) {
  return (
    <div className="w-full flex h-18.5 p-4 items-center gap-2 self-stretch border border-px rounded-lg border-brand-default bg-brand-background shadow-[0_0_6.4px_0_rgba(244,92,51,0.2)]">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex flex-col items-start gap-0.5">
          <p className="text-body text-brand-default font-bold">
            승인 대기 주문 {pendingCount}건
          </p>
          <p className="text-caption1 text-text-subtlest">
            확인 후 승인해주세요
          </p>
        </div>
      </div>
      <div className="flex h-9.5 pl-4 pr-3 py-3 justify-center gap-2 rounded-lg bg-brand-default">
        <div className="flex pb-px justify-center items-center">
          <Link href='/owner/orders' className="text-label2 font-semibold text-text-inverse text-center">
            승인하기
          </Link>
          <ArrowRight className="text-white w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
