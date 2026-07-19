import OrderSummaryCard from '@/components/owner/OrderSummaryCard';
import SalesReportFilterChip from './SalesReportFilterChip';

export default function SalesReportSection() {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-headline3 font-semibold text-text-default">
        매출 보고
      </span>
      <div className="flex items-center gap-2">
        <SalesReportFilterChip text="오늘" className="active" />
        <SalesReportFilterChip text="주간" className="" />
        <SalesReportFilterChip text="월간" className="" />
      </div>
      <div className="flex gap-2">
        <OrderSummaryCard
          title="주문 수"
          icon="orderNum"
          text1="+ 3건"
          text2="21"
          text3="건"
        />
        <OrderSummaryCard
          title="별점"
          icon="rating"
          text1="- 0.3점"
          text2="4.2"
          text3="점"
        />
      </div>
      <div className="flex gap-2">
        <OrderSummaryCard
          title="매출"
          icon="income"
          text1="↑ 전일 대비 +8%"
          text2="557,000"
          text3="원"
        />
        <OrderSummaryCard
          title="평균 단가"
          icon="average"
          text1="↑ 전일 대비 +2%"
          text2="258,000"
          text3="원"
        />
      </div>
    </div>
  );
}
