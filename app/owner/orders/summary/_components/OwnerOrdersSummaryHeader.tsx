import BackIcon from '@/public/icons/icon_arrow_Left.svg';

export default function OwnerOrdersSummaryHeader() {
  return (
    <div className="flex w-full mt-10 mb-4 p-4 relative">
      <BackIcon className="size-5 text-icon-default" />
      <span className="absolute left-1/2 -translate-x-1/2 text-text-default text-headline3 font-semibold">
        매출 리포트
      </span>
    </div>
  );
}
